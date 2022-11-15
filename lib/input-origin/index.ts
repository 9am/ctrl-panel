import { InputBase, Value } from '../input-base';
import style from './style.css?inline';

export const InputEmitAttr = new Map([
    ['id', 1],
    ['class', 1],
    ['part', 1],
]);

export class InputOrigin extends InputBase {
    protected declare _value: Value;
    protected _origin: HTMLInputElement;

    constructor() {
        super();
        this._origin = this.root.querySelector('.origin') as HTMLInputElement;
        this.onInput = this.onInput.bind(this);
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <input class="origin" part="origin" />
        `;
    }

    connectedCallback() {
        for (const attr of this.attributes) {
            if (!InputEmitAttr.has(attr.name)) {
                this._origin.setAttribute(attr.name, attr.value);
            }
        }
        this._origin.addEventListener('input', this.onInput);
    }

    disconnectedCallback() {
        this._origin.removeEventListener('input', this.onInput);
    }

    private onInput(evt: Event) {
        evt.stopImmediatePropagation();
        this.dispatchEvent(
            new CustomEvent('INPUT', {
                detail: { value: this._origin.value },
                bubbles: true,
                composed: true,
            })
        );
    }

    override set value(val: Value) {
        this._origin.value = `${val}`;
    }

    override get value(): Value {
        return this._origin.value;
    }
}

window.customElements.define('input-origin', InputOrigin);

declare global {
    interface HTMLElementTagNameMap {
        'input-origin': InputOrigin;
    }
}
