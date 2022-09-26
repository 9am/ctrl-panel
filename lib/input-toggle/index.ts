import { InputButton } from '../input-button';
import style from './style.css?inline';

export class InputToggle extends InputButton {
    protected override _value: boolean = false;

    constructor() {
        super();
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <div class="button" part="button">
                <span class="label" part="label"><slot></slot></span>
            </div>
        `;
    }

    override connectedCallback() {
        super.connectedCallback();
        this.value = !!this.getAttribute('value') || false;
    }

    protected override onButtonClick(evt: MouseEvent) {
        this.toggle();
        super.onButtonClick(evt);
    }

    override set value(val: boolean) {
        this._value = val;
        this._button.classList.toggle('checked', val);
        this._button.setAttribute('part', val ? 'button checked' : 'button');
    }
    override get value(): boolean {
        return this._value;
    }

    toggle() {
        this.value = !this.value;
    }
}

window.customElements.define('input-toggle', InputToggle);

declare global {
    interface HTMLElementTagNameMap {
        'input-toggle': InputToggle;
    }
}
