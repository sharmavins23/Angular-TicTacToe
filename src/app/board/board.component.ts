import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-board",
    templateUrl: "./board.component.html",
    styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
    squares: any[];
    xIsNext: boolean;
    winner: string;

    constructor() {}

    ngOnInit() {
        this.newGame();
    }

    // Create a new board and clean it up
    newGame() {
        this.squares = Array(9).fill(null);
        this.winner = null;
        this.xIsNext = true;
    }

    // Get which player is currently up to run
    get player() {
        return this.xIsNext ? "X" : "O";
    }

    // OnEvent click for making a move
    makeMove(idx: number) {
        if (!this.squares[idx]) {
            // If the board location is empty, splice in value
            this.squares.splice(idx, 1, this.player);
            this.xIsNext = !this.xIsNext;
        }

        // Recalc winner on every move
        this.winner = this.calculateWinner();
    }

    // Win condition algorithm
    calculateWinner() {
        // List of all possible win condition lines
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        // Iterate through all lines and if any have the same value, win
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]
            ) {
                return this.squares[a];
            }
        }
        return null; // No player has been found
    }
}
