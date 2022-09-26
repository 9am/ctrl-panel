import { CtrlBase } from '../ctrl-base';
import { Value } from '../input-base';
import { InputToggle } from '../input-toggle';
import { InputRange } from '../input-range';
import style from './style.css?inline';

export type SwitchInput = InputRange | InputToggle;

export const SwitchEmitAttr = new Map([
    ['id', 1],
    ['class', 1],
    ['part', 1],
    ['min', 1],
    ['max', 1],
    ['step', 1],
    ['value', 1],
]);

export enum SwitchType {
    Range = 'range',
    Toggle = 'toggle',
}

export class CtrlSwitch extends CtrlBase {
    protected _value: Value;
    protected _input: SwitchInput;
    protected _inputs: SwitchInput[];

    constructor() {
        super();
        this._input = this.root.querySelector('.input') as SwitchInput;
        this._inputs = [...this.root.querySelectorAll('.input')] as SwitchInput[];
        this.onInput = this.onInput.bind(this);
    }

    protected override getTemplate() {
        const input =
            this.type === SwitchType.Range
                ? `
                <label class="label" part="label"><slot></slot></label>
                <input-range
                    class="input"
                    part="input"
                    exportparts="track:i-track,thumb:i-thumb"
                    min="0"
                    max="1"
                    step="1"
                    value="${this.default ? '1' : '0'}"
                >
                </input-range>
            `
                : `
                <input-toggle
                    exportparts="button:i-button,checked:i-button-checked,label:i-label"
                    class="input"
                    part="input"
                    value="${this.default ? '1' : ''}"
                >
                    <slot></slot>
                </input-toggle>
            `;
        return `
            <style>${style}</style>
            ${input}
        `;
    }

    connectedCallback() {
        for (const attr of this.attributes) {
            if (!SwitchEmitAttr.has(attr.name)) {
                this._inputs.forEach((input) =>
                    input.setAttribute(attr.name, attr.value)
                );
            }
        }
        this.addEventListener('INPUT', this.onInput);
    }

    disconnectedCallback() {
        this.removeEventListener('INPUT', this.onInput);
    }

    private onInput(evt: Event) {
        this.dispatchEvent(
            new CustomEvent('CHANGE', {
                detail: { name: this.name, value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }

    override get value(): boolean {
        return !!this._input.value;
    }
    get default(): boolean {
        return !!this.getAttribute('default');
    }
    get type(): SwitchType {
        return <SwitchType>this.getAttribute('type') || SwitchType.Toggle;
    }
    get input(): SwitchInput {
        return this._input;
    }
}

window.customElements.define('ctrl-switch', CtrlSwitch);

declare global {
    interface HTMLElementTagNameMap {
        'ctrl-switch': CtrlSwitch;
    }
}
