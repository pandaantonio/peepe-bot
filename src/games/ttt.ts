import { ButtonStyles, ComponentTypes, MessageActionRow, MessageComponent } from "oceanic.js";

type Player = 'X' | 'O';
type Cell = Player | '';

export interface TttSave {
    board: Cell[][];
    currentPlayer: Player;
    winner?: Player;  // Propriedade opcional
    isDraw: boolean;
};

export default class TicTacToe {
  private board: Cell[][];
  private currentPlayer: Player;
  private winner: Player | undefined;
  private isDraw: boolean;

  constructor(board?: Cell[][], currentPlayer?: Player, winner?: Player, isDraw?: boolean) {
    this.board = board 
      ? board.map(row => [...row]) 
      : Array(3).fill('').map(() => Array(3).fill(''));
    this.currentPlayer = currentPlayer ?? 'X';
    this.winner = winner;
    this.isDraw = isDraw ?? false;
  }

  public save() {
    const saveData: any = {
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

  public play(row: number, col: number): void {
    if (this.winner || this.board[row][col] !== '') {
      return;
    }

    this.board[row][col] = this.currentPlayer;

    if (this.checkVictory(this.currentPlayer)) {
      this.winner = this.currentPlayer;
    } else if (this.getEmptyCells().length === 0) {
      this.isDraw = true;
      this.winner = undefined;  // undefined é aceitável internamente
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  public generate(ai?: boolean): MessageComponent[] {
    const components: MessageComponent[] = [];

    for (let row = 0; row < this.board.length; row++) {
      const actionRow: MessageComponent = {
        components: [],
        type: ComponentTypes.ACTION_ROW,
      };

      for (let col = 0; col < this.board[row].length; col++) {
        const cell = this.board[row][col];
        actionRow.components.push({
          type: ComponentTypes.BUTTON,
          style: cell === 'X' ? ButtonStyles.SUCCESS : cell === 'O' ? ButtonStyles.DANGER : ButtonStyles.SECONDARY,
          label: cell || '​',
          customID: `${ai ? "ai." : ""}ttt_${row}_${col}`,
          disabled: !!this.winner || cell !== '',
        });
      }

      components.push(actionRow);
    }

    return components;
  }

  public playAI(): void {
    if (this.winner || this.currentPlayer !== 'O') {
      return;
    }

    const randomFactor = Math.random();
    const move = randomFactor < 0.3 ? this.findSimplerBestMoveMedium() : this.findBestMove();

    if (move) {
      this.play(move.row, move.col);
    }
  }

  private findSimplerBestMoveMedium(): { row: number; col: number } | null {
    const emptyCells = this.getEmptyCells();
    return emptyCells.length > 0 ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : null;
  }

  private getEmptyCells(): { row: number; col: number }[] {
    const emptyCells: { row: number; col: number }[] = [];
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === '') {
          emptyCells.push({ row, col });
        }
      }
    }
    return emptyCells;
  }

  private findWinningMove(player: Player): { row: number; col: number } | null {
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

  private findBestMove(): { row: number; col: number } | null {
    let bestScore = -Infinity;
    let bestMove: { row: number; col: number } | null = null;

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

  private minimax(isMaximizing: boolean, depth: number): number {
    if (this.checkVictory('O')) return 10 - depth;
    if (this.checkVictory('X')) return depth - 10;
    if (this.getEmptyCells().length === 0) return 0;

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

  private checkVictory(player: Player): boolean {
    if (this.board.some(row => row.every(cell => cell === player))) return true;

    for (let col = 0; col < 3; col++) {
      if (this.board.every(row => row[col] === player)) return true;
    }

    if (this.board.every((row, idx) => row[idx] === player)) return true;
    if (this.board.every((row, idx) => row[2 - idx] === player)) return true;

    return false;
  }

  private checkWinner(row: number, col: number): boolean {
    if (this.board[row].every(cell => cell === this.currentPlayer)) return true;
    if (this.board.every(r => r[col] === this.currentPlayer)) return true;
    if (row === col && this.board.every((r, idx) => r[idx] === this.currentPlayer)) return true;
    if (row + col === 2 && this.board.every((r, idx) => r[2 - idx] === this.currentPlayer)) return true;
    return false;
  }
}