import { CtrlBase } from '../ctrl-base';
import { Value } from '../input-base';
import '../input-origin';
import style from './style.css?inline';

export class CtrlText extends CtrlBase {
    protected _input: HTMLInputElement;

    constructor() {
        super();
        this._input = this.root.querySelector('.input') as HTMLInputElement;
        this.onInput = this.onInput.bind(this);
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <label class="label" part="label"><slot></slot></label>
            <input-origin type="text" class="input" part="input" value="${this.default}"></input-origin>
        `;
    }

    connectedCallback() {
        this._input.addEventListener('INPUT', this.onInput);
    }

    disconnectedCallback() {
        this._input.removeEventListener('INPUT', this.onInput);
    }

    protected onInput(evt: Event) {
        this.dispatchEvent(
            new CustomEvent('CHANGE', {
                detail: { name: this.name, value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }

    override get value(): Value {
        return this._input.value;
    }
    get default(): Value {
        return this.getAttribute('default') || '';
    }
}

window.customElements.define('ctrl-text', CtrlText);

declare global {
    interface HTMLElementTagNameMap {
        'ctrl-text': CtrlText;
    }
}
