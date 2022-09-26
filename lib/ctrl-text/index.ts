import { CtrlBase } from '../ctrl-base';
import { Value } from '../input-base';
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
            <input type="text" class="input" part="input" value="${this.default}" />
        `;
    }

    connectedCallback() {
        this._input.addEventListener('input', this.onInput);
    }

    disconnectedCallback() {
        this._input.removeEventListener('input', this.onInput);
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
