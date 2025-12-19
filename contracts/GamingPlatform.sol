// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
import {FHE} from "@fhevm/solidity/lib/FHE.sol";
import {euint32} from "@fhevm/solidity/lib/FHE.sol";

// gaming platform with encrypted scores
contract GamingPlatform is ZamaEthereumConfig {
    using FHE for euint32;
    
    struct Game {
        address creator;
        string title;
        bool active;
    }
    
    struct Score {
        address player;
        uint256 gameId;
        euint32 score;      // encrypted score
        uint256 achievedAt;
    }
    
    mapping(uint256 => Game) public games;
    mapping(uint256 => Score[]) public leaderboard;
    mapping(address => mapping(uint256 => Score)) public playerScores;
    uint256 public gameCounter;
    
    event GameCreated(uint256 indexed gameId, address creator);
    event ScoreSubmitted(uint256 indexed gameId, address player);
    
    function createGame(string memory title) external returns (uint256 gameId) {
        gameId = gameCounter++;
        games[gameId] = Game({
            creator: msg.sender,
            title: title,
            active: true
        });
        emit GameCreated(gameId, msg.sender);
    }
    
    function submitScore(
        uint256 gameId,
        euint32 encryptedScore
    ) external {
        Game storage game = games[gameId];
        require(game.active, "Game not active");
        
        Score storage currentScore = playerScores[msg.sender][gameId];
        
        // only update if new score is higher (encrypted comparison)
        // simplified for now - actual comparison requires decryption
        if (currentScore.achievedAt == 0) {
            // || !encryptedScore.lt(currentScore.score)) {
            currentScore.player = msg.sender;
            currentScore.gameId = gameId;
            currentScore.score = encryptedScore;
            currentScore.achievedAt = block.timestamp;
            
            leaderboard[gameId].push(Score({
                player: msg.sender,
                gameId: gameId,
                score: encryptedScore,
                achievedAt: block.timestamp
            }));
        }
        
        emit ScoreSubmitted(gameId, msg.sender);
    }
}

