import { CtrlBase } from '../ctrl-base';
import { Value } from '../input-base';
import { InputVector } from '../input-vector';
import style from './style.css?inline';

export const VectorEmitAttr = new Map([
    ['id', 1],
    ['class', 1],
    ['part', 1],
    ['value', 1],
]);

export enum VectorType {
    Range = 'range',
    Toggle = 'toggle',
}

export class CtrlVector extends CtrlBase {
    protected _value: Value;
    protected _input: InputVector;
    protected _detail: HTMLElement;

    constructor() {
        super();
        this._detail = this.root.querySelector('.detail') as HTMLElement;
        this._input = this.root.querySelector('.input') as InputVector;
        this.onInput = this.onInput.bind(this);
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <label class="label" part="label"><slot></slot></label>
            <input-vector
                class="input"
                part="input"
                exportparts="track:i-track,thumb:i-thumb,crosshair:i-crosshair"
                value="${this.default}"
            ></input-vector>
            <em class="detail" part="detail"></em>
        `;
    }

    connectedCallback() {
        for (const attr of this.attributes) {
            if (!VectorEmitAttr.has(attr.name)) {
                this._input.setAttribute(attr.name, attr.value);
            }
        }
        this.addEventListener('INPUT', this.onInput);
    }

    disconnectedCallback() {
        this.removeEventListener('INPUT', this.onInput);
    }

    private onInput(evt: Event) {
        this._detail.innerHTML = `${this.value}`.split(',').join('</br>');
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
    get default(): string {
        return this.getAttribute('default')!;
    }
}

window.customElements.define('ctrl-vector', CtrlVector);

declare global {
    interface HTMLElementTagNameMap {
        'ctrl-vector': CtrlVector;
    }
}
