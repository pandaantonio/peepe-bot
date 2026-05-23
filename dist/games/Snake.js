"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
class SnakeGame {
    boardSize;
    snake;
    direction;
    food;
    gameOver;
    score;
    constructor(save) {
        // Se não houver estado salvo, começa um novo jogo
        if (save) {
            this.loadGame(save); // Inicializa o jogo com o estado salvo
        }
        else {
            this.startNewGame(); // Começa um jogo novo
        }
    }
    loadGame(save) {
        this.boardSize = save.boardSize ?? 13;
        this.snake = save.snake.length > 0 ? save.snake : [{ x: Math.floor(this.boardSize / 2), y: Math.floor(this.boardSize / 2) }];
        this.direction = save.direction ?? { x: 0, y: 0 };
        this.food = save.food ?? this.generateFood();
        this.score = save.score ?? 0;
        this.gameOver = save.gameOver ?? false;
    }
    startNewGame() {
        this.boardSize = 13;
        this.snake = [{ x: Math.floor(this.boardSize / 2), y: Math.floor(this.boardSize / 2) }];
        this.direction = { x: 0, y: 0 };
        this.food = this.generateFood();
        this.score = 0;
        this.gameOver = false;
    }
    generateFood() {
        let x, y;
        do {
            x = Math.floor(Math.random() * this.boardSize);
            y = Math.floor(Math.random() * this.boardSize);
        } while (this.isSnake(x, y));
        return { x, y };
    }
    isSnake(x, y) {
        return this.snake.some(segment => segment.x === x && segment.y === y);
    }
    // Impede a direção oposta
    setDirection(newDirection) {
        if (this.gameOver)
            return;
        let newX = this.direction.x;
        let newY = this.direction.y;
        switch (newDirection) {
            case 'up':
                if (this.direction.y !== 1) { // Não pode ir para baixo se já estiver indo para cima
                    newX = 0;
                    newY = -1;
                }
                break;
            case 'down':
                if (this.direction.y !== -1) { // Não pode ir para cima se já estiver indo para baixo
                    newX = 0;
                    newY = 1;
                }
                break;
            case 'left':
                if (this.direction.x !== 1) { // Não pode ir para a direita se já estiver indo para a esquerda
                    newX = -1;
                    newY = 0;
                }
                break;
            case 'right':
                if (this.direction.x !== -1) { // Não pode ir para a esquerda se já estiver indo para a direita
                    newX = 1;
                    newY = 0;
                }
                break;
        }
        // Atualiza a direção e chama a movimentação imediatamente
        this.direction = { x: newX, y: newY };
        this.move(); // Aciona o movimento sempre que a direção mudar
    }
    // Atualiza a movimentação da cobra
    move() {
        if (this.gameOver)
            return;
        const head = { ...this.snake[0] }; // Cria uma cópia da cabeça da cobra
        head.x += this.direction.x;
        head.y += this.direction.y;
        // Verifica se a cobra bateu nas bordas ou se colidiu com o próprio corpo
        if (head.x < 0 || head.x >= this.boardSize || head.y < 0 || head.y >= this.boardSize || this.isSnake(head.x, head.y)) {
            this.gameOver = true; // Se bater, o jogo acaba
            return;
        }
        // Adiciona a nova cabeça na frente da cobra
        this.snake.unshift(head);
        // Verifica se a cobra comeu a comida
        if (head.x === this.food.x && head.y === this.food.y) {
            this.food = this.generateFood(); // Nova comida gerada
            this.score += 10; // Aumenta a pontuação
        }
        else {
            // Caso contrário, remove o último segmento da cobra
            this.snake.pop();
        }
    }
    // Função para salvar o estado do jogo
    save() {
        return {
            snake: this.snake,
            food: this.food,
            score: this.score,
            gameOver: this.gameOver,
            boardSize: this.boardSize,
            direction: this.direction,
        };
    }
    isGameOver() {
        return this.gameOver;
    }
    getScore() {
        return this.score;
    }
    // Reseta o jogo
    reset() {
        this.startNewGame();
    }
    // Gera a imagem do tabuleiro
    generate() {
        const canvasSize = this.boardSize * 20; // Cada célula de 20x20 pixels
        const canvas = (0, canvas_1.createCanvas)(canvasSize, canvasSize);
        const ctx = canvas.getContext('2d');
        // Limpa o canvas antes de desenhar
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        // Desenha a cobra (verde)
        ctx.fillStyle = '#00FF00';
        for (const segment of this.snake) {
            ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        }
        // Desenha a comida (vermelha)
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.food.x * 20, this.food.y * 20, 20, 20);
        // Desenha as linhas do tabuleiro (brancas)
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        for (let i = 0; i <= this.boardSize; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 20, 0);
            ctx.lineTo(i * 20, canvasSize);
            ctx.moveTo(0, i * 20);
            ctx.lineTo(canvasSize, i * 20);
            ctx.stroke();
        }
        return canvas.toBuffer('image/png');
    }
}
exports.default = SnakeGame;
