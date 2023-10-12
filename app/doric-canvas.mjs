import {DoricBlock} from './doric-block.mjs';
import {CELL_SIZE} from "./constants.mjs";

export class DoricCanvas extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.map = [
            [1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1]
        ]
        this.blockMap = [];
        this.map.forEach((row, rowIndex) => {
            this.blockMap[rowIndex] = [];
            row.forEach((kind, columnIndex) => {
                this.blockMap[rowIndex][columnIndex] = null;
            });
        });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: relative;
                    width: ${this.map.length * CELL_SIZE}px;
                    height: ${this.map.length * CELL_SIZE}px;
                }
            </style>
            <div></div>
        `;
        this.canvas = this.shadowRoot.querySelector('div');
        this.render();
    }

    render() {
        this.canvas.innerHTML = '';
        this.map.forEach((row, rowIndex) => {
            row.forEach((kind, columnIndex) => {
                const block = new DoricBlock(kind, rowIndex, columnIndex);

                this.blockMap[rowIndex][columnIndex] = block;

                block.addEventListener('click', this.handleBlockClick.bind(this, rowIndex, columnIndex));

                this.canvas.appendChild(block);
            });
        });
    }

    handleBlockClick(rowIndex, columnIndex) {
        this.flipBlock(rowIndex, columnIndex);

        if (this.map[rowIndex][columnIndex - 1] !== undefined) {
            this.flipBlock(rowIndex, columnIndex - 1)
        }
        if (this.map[rowIndex][columnIndex + 1] !== undefined) {
            this.flipBlock(rowIndex, columnIndex + 1)
        }
        if (this.map[rowIndex - 1] !== undefined) {
            this.flipBlock(rowIndex - 1, columnIndex)
        }
        if (this.map[rowIndex + 1] !== undefined) {
            this.flipBlock(rowIndex + 1, columnIndex)
        }
    }

    flipBlock(rowIndex, columnIndex) {
        if (this.map[rowIndex][columnIndex] === 0) {
            this.map[rowIndex][columnIndex] = 1;
        } else if (this.map[rowIndex][columnIndex] === 1) {
            this.map[rowIndex][columnIndex] = 0;
        }

        if (this.blockMap[rowIndex][columnIndex]) {
            this.blockMap[rowIndex][columnIndex].kind = this.map[rowIndex][columnIndex];
            this.blockMap[rowIndex][columnIndex].render();
        }
    }
}
customElements.define('doric-canvas', DoricCanvas);