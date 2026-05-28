"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
;
class Game2048 {
    grid;
    gridSize;
    score;
    gameOver;
    constructor(gridSize, score, grid, gameOver) {
        this.gridSize = gridSize ? gridSize : 4;
        this.score = score ? score : 0;
        this.grid = grid ? grid : this.initializeGrid();
        this.gameOver = gameOver ? gameOver : false; // Initialize the game as not over
        if (!grid) {
            this.addRandomTile();
            this.addRandomTile();
        }
    }
    save() {
        return {
            gridSize: this.gridSize,
            score: this.score,
            grid: this.grid,
            gameOver: this.gameOver, // Save the game over state
        };
    }
    // Initialize the grid with zeros
    initializeGrid() {
        return Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(0));
    }
    // Add a random tile (2 or 4) to an empty cell
    addRandomTile() {
        const emptyCells = [];
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === 0) {
                    emptyCells.push([row, col]);
                }
            }
        }
        if (emptyCells.length > 0) {
            const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[row][col] = Math.random() < 0.9 ? 2 : 4;
        }
    }
    // Slide and combine the tiles in one direction
    slideAndCombine(row) {
        const nonZeroTiles = row.filter(value => value !== 0);
        const newRow = [];
        let skip = false;
        for (let i = 0; i < nonZeroTiles.length; i++) {
            if (skip) {
                skip = false;
                continue;
            }
            if (i < nonZeroTiles.length - 1 && nonZeroTiles[i] === nonZeroTiles[i + 1]) {
                newRow.push(nonZeroTiles[i] * 2);
                this.score += nonZeroTiles[i] * 2;
                skip = true;
            }
            else {
                newRow.push(nonZeroTiles[i]);
            }
        }
        while (newRow.length < this.gridSize) {
            newRow.push(0);
        }
        return newRow;
    }
    // Move the grid in the specified direction
    move(direction) {
        if (this.gameOver)
            return; // Prevent moves if the game is over
        let rotated = false;
        let moved = false;
        if (direction === 'up' || direction === 'down') {
            this.grid = this.transpose(this.grid);
            rotated = true;
        }
        if (direction === 'down' || direction === 'right') {
            this.grid = this.grid.map(row => row.reverse());
        }
        this.grid = this.grid.map(row => {
            const newRow = this.slideAndCombine(row);
            if (JSON.stringify(newRow) !== JSON.stringify(row)) {
                moved = true;
            }
            return newRow;
        });
        if (direction === 'down' || direction === 'right') {
            this.grid = this.grid.map(row => row.reverse());
        }
        if (rotated) {
            this.grid = this.transpose(this.grid);
        }
        if (moved) {
            this.addRandomTile();
        }
        this.checkGameOver(); // Check if the game is over after each move
    }
    // Transpose the grid (swap rows and columns)
    transpose(grid) {
        return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
    }
    // Check if any moves are available
    isGameOver() {
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (this.grid[row][col] === 0)
                    return false;
                if ((row > 0 && this.grid[row][col] === this.grid[row - 1][col]) ||
                    (col > 0 && this.grid[row][col] === this.grid[row][col - 1])) {
                    return false;
                }
            }
        }
        return true;
    }
    // Method to check if the game is over
    checkGameOver() {
        if (this.isGameOver()) {
            this.gameOver = true; // Set the game as over if no valid moves are left
        }
    }
    // Get the current score
    getScore() {
        return this.score;
    }
    // Get the game over status
    getGameOver() {
        return this.gameOver;
    }
    getTileColor(value) {
        switch (value) {
            case 2: return '#eee4da';
            case 4: return '#ede0c8';
            case 8: return '#f2b179';
            case 16: return '#f59563';
            case 32: return '#f67c5f';
            case 64: return '#f65e3b';
            case 128: return '#edcf72';
            case 256: return '#edcc61';
            case 512: return '#edc850';
            case 1024: return '#edc53f';
            case 2048: return '#edc22e';
            default: return '#cdc1b4'; // Light beige for empty cells
        }
    }
    async generate() {
        const canvasSize = 500; // Tamanho do tabuleiro
        const spacing = 10; // Espaçamento entre as células
        const cellSize = (canvasSize - spacing * (this.gridSize + 1)) / this.gridSize;
        const canvas = (0, canvas_1.createCanvas)(canvasSize, canvasSize);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#bbada0';
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        const radius = 8;
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const value = this.grid[row][col];
                const tileColor = this.getTileColor(value);
                const x = col * (cellSize + spacing) + spacing;
                const y = row * (cellSize + spacing) + spacing;
                ctx.fillStyle = tileColor;
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.arcTo(x + cellSize, y, x + cellSize, y + cellSize, radius);
                ctx.arcTo(x + cellSize, y + cellSize, x, y + cellSize, radius);
                ctx.arcTo(x, y + cellSize, x, y, radius);
                ctx.arcTo(x, y, x + cellSize, y, radius);
                ctx.closePath();
                ctx.fill();
                if (value !== 0) {
                    ctx.fillStyle = value > 4 ? '#f9f6f2' : '#776e65';
                    ctx.font = `bold ${cellSize * 0.5}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    const text = value.toString();
                    const textWidth = ctx.measureText(text).width;
                    const fontSize = (cellSize * 0.5) * (cellSize / textWidth);
                    ctx.font = `bold ${Math.min(fontSize, cellSize * 0.5)}px Arial`;
                    ctx.fillText(text, x + cellSize / 2, y + cellSize / 2);
                }
            }
        }
        return canvas.toBuffer();
    }
}
exports.default = Game2048;
