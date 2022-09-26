import { CtrlBase } from '../ctrl-base';
import { InputKnob } from '../input-knob';
import { InputRange } from '../input-range';
import { Value } from '../input-base';
import { attr2num } from '../util';
import style from './style.css?inline';

export type SliderInput = InputRange | InputKnob;

export const SliderEmitAttr = new Map([
    ['id', 1],
    ['class', 1],
    ['part', 1],
    ['value', 1],
]);

export enum SliderType {
    Range = 'range',
    Knob = 'knob',
}

export class CtrlSlider extends CtrlBase {
    protected _value: Value;
    protected _detail: HTMLElement;
    protected _input: SliderInput;
    protected _inputs: SliderInput[];

    constructor() {
        super();
        this._detail = this.root.querySelector('.detail') as HTMLElement;
        this._input = this.root.querySelector('.input') as SliderInput;
        this._inputs = [...this.root.querySelectorAll('.input')] as SliderInput[];
        this.onInput = this.onInput.bind(this);
    }

    protected override getTemplate() {
        const tagName = this.type === SliderType.Range ? 'input-range' : 'input-knob';
        return `
            <style>${style}</style>
            <label class="label" part="label"><slot></slot></label>
            <${tagName}
                class="input"
                part="input"
                exportparts="track:i-track,thumb:i-thumb"
                value="${this.default}"
            >
            </${tagName}>
            <em class="detail" part="detail"></em>
        `;
    }

    connectedCallback() {
        for (const attr of this.attributes) {
            if (!SliderEmitAttr.has(attr.name)) {
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

    protected onInput(evt: Event) {
        this._detail.textContent = `${this.value}`;
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
    get min(): number {
        return attr2num(this.getAttribute('min'), 0);
    }
    get max(): number {
        return attr2num(this.getAttribute('max'), 10);
    }
    get step(): number | string {
        return parseFloat(this.getAttribute('step')!) || 1;
    }
    get default(): Value {
        return attr2num(this.getAttribute('default'), (this.max - this.min) / 2);
    }
    get type(): SliderType {
        return <SliderType>this.getAttribute('type') || SliderType.Range;
    }
}

window.customElements.define('ctrl-slider', CtrlSlider);

declare global {
    interface HTMLElementTagNameMap {
        'ctrl-slider': CtrlSlider;
    }
}
