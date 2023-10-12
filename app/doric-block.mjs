import {CELL_SIZE} from "./constants.mjs";

export class DoricBlock extends HTMLElement {
    constructor(kind, row, column) {
        super();
        this.attachShadow({ mode: 'open' });
        this.kind = kind;
        this.row = row;
        this.column = column;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: ${CELL_SIZE * .8}px;
                    height: ${CELL_SIZE * .8}px;
                    cursor: pointer;
                    position: absolute;
                    top: ${this.row * CELL_SIZE}px;
                    left: ${this.column * CELL_SIZE}px;
                    user-select: none;
                }
                div {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all .5s cubic-bezier(0.1, 0.8, 0.1, 1.5);
                }
            </style>
            <div></div>
        `;
        this.block = this.shadowRoot.querySelector('div');
        this.block.onmouseover = () => {
            this.block.style.scale = '1.3';
        }
        this.block.onmouseout = () => {
            this.block.style.scale = '1';
        }
        this.render();
    }

    render() {
        if (this.kind === 0) {
            this.block.style.background = '#eee';
        } else if (this.kind === 1) {
            this.block.style.background = '#aaa';
        }
    }
}
customElements.define('doric-block', DoricBlock);