import {DoricCanvas} from './doric-canvas.mjs';

export class DoricApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style> 
                :host {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            </style>
        `;
        this.shadowRoot.appendChild(new DoricCanvas());
    }
}
customElements.define('doric-app', DoricApp);