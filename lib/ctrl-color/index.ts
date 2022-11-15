import { CtrlBase } from '../ctrl-base';
import { Value } from '../input-base';
import '../input-origin';
import style from './style.css?inline';

export class CtrlColor extends CtrlBase {
    protected _detail: HTMLElement;
    protected _input: HTMLInputElement;

    constructor() {
        super();
        this._detail = this.root.querySelector('.detail') as HTMLElement;
        this._input = this.root.querySelector('.input') as HTMLInputElement;
        this.onInput = this.onInput.bind(this);
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <label class="label" part="label"><slot></slot></label>
            <div class="inputs" part="inputs">
                <div class="trigger" part="trigger"></div>
                <input-origin type="color" class="input" part="input" value="${this.default}"></input-origin>
            </div>
            <em class="detail" part="detail"></em>
        `;
    }

    connectedCallback() {
        this._input.addEventListener('input', this.onInput);
        this.style.setProperty('--color', this._input.value);
        this._detail.textContent = `${this._input.value}`;
    }

    disconnectedCallback() {
        this._input.removeEventListener('input', this.onInput);
    }

    protected onInput(evt: Event) {
        this.style.setProperty('--color', this._input.value);
        this._detail.textContent = `${this._input.value}`;
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

window.customElements.define('ctrl-color', CtrlColor);

declare global {
    interface HTMLElementTagNameMap {
        'ctrl-color': CtrlColor;
    }
}
