"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
;
class TicTacToe {
    board;
    currentPlayer;
    winner;
    isDraw;
    constructor(board, currentPlayer, winner, isDraw) {
        this.board = board
            ? board.map(row => [...row])
            : Array(3).fill('').map(() => Array(3).fill(''));
        this.currentPlayer = currentPlayer ?? 'X';
        this.winner = winner;
        this.isDraw = isDraw ?? false;
    }
    save() {
        const saveData = {
            board: this.board.map(row => [...row]),
            currentPlayer: this.currentPlayer,
            isDraw: this.isDraw,
        };
        // Só inclui winner se ele existir (não for undefined)
        if (this.winner !== undefined) {
            saveData.winner = this.winner;
        }
        return saveData;
    }
    play(row, col) {
        if (this.winner || this.board[row][col] !== '') {
            return;
        }
        this.board[row][col] = this.currentPlayer;
        if (this.checkVictory(this.currentPlayer)) {
            this.winner = this.currentPlayer;
        }
        else if (this.getEmptyCells().length === 0) {
            this.isDraw = true;
            this.winner = undefined; // undefined é aceitável internamente
        }
        else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
    }
    generate(ai) {
        const components = [];
        for (let row = 0; row < this.board.length; row++) {
            const actionRow = {
                components: [],
                type: oceanic_js_1.ComponentTypes.ACTION_ROW,
            };
            for (let col = 0; col < this.board[row].length; col++) {
                const cell = this.board[row][col];
                actionRow.components.push({
                    type: oceanic_js_1.ComponentTypes.BUTTON,
                    style: cell === 'X' ? oceanic_js_1.ButtonStyles.SUCCESS : cell === 'O' ? oceanic_js_1.ButtonStyles.DANGER : oceanic_js_1.ButtonStyles.SECONDARY,
                    label: cell || '​',
                    customID: `${ai ? "ai." : ""}ttt_${row}_${col}`,
                    disabled: !!this.winner || cell !== '',
                });
            }
            components.push(actionRow);
        }
        return components;
    }
    playAI() {
        if (this.winner || this.currentPlayer !== 'O') {
            return;
        }
        const randomFactor = Math.random();
        const move = randomFactor < 0.3 ? this.findSimplerBestMoveMedium() : this.findBestMove();
        if (move) {
            this.play(move.row, move.col);
        }
    }
    findSimplerBestMoveMedium() {
        const emptyCells = this.getEmptyCells();
        return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : null;
    }
    getEmptyCells() {
        const emptyCells = [];
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === '') {
                    emptyCells.push({ row, col });
                }
            }
        }
        return emptyCells;
    }
    findWinningMove(player) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === '') {
                    this.board[row][col] = player;
                    const isWinningMove = this.checkWinner(row, col);
                    this.board[row][col] = '';
                    if (isWinningMove) {
                        return { row, col };
                    }
                }
            }
        }
        return null;
    }
    findBestMove() {
        let bestScore = -Infinity;
        let bestMove = null;
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === '') {
                    this.board[row][col] = 'O';
                    const score = this.minimax(false, 0);
                    this.board[row][col] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { row, col };
                    }
                }
            }
        }
        return bestMove;
    }
    minimax(isMaximizing, depth) {
        if (this.checkVictory('O'))
            return 10 - depth;
        if (this.checkVictory('X'))
            return depth - 10;
        if (this.getEmptyCells().length === 0)
            return 0;
        let bestScore = isMaximizing ? -Infinity : Infinity;
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === '') {
                    this.board[row][col] = isMaximizing ? 'O' : 'X';
                    const score = this.minimax(!isMaximizing, depth + 1);
                    this.board[row][col] = '';
                    bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
    checkVictory(player) {
        if (this.board.some(row => row.every(cell => cell === player)))
            return true;
        for (let col = 0; col < 3; col++) {
            if (this.board.every(row => row[col] === player))
                return true;
        }
        if (this.board.every((row, idx) => row[idx] === player))
            return true;
        if (this.board.every((row, idx) => row[2 - idx] === player))
            return true;
        return false;
    }
    checkWinner(row, col) {
        if (this.board[row].every(cell => cell === this.currentPlayer))
            return true;
        if (this.board.every(r => r[col] === this.currentPlayer))
            return true;
        if (row === col && this.board.every((r, idx) => r[idx] === this.currentPlayer))
            return true;
        if (row + col === 2 && this.board.every((r, idx) => r[2 - idx] === this.currentPlayer))
            return true;
        return false;
    }
}
exports.default = TicTacToe;
