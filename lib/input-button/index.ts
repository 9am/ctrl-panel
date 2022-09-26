import { InputBase, Value } from '../input-base';
import style from './style.css?inline';

export class InputButton extends InputBase {
    protected override _value: Value = 'button';
    protected _button: HTMLElement;
    protected _label: HTMLElement;

    constructor() {
        super();
        this._button = this.root.querySelector('.button') as HTMLElement;
        this._label = this.root.querySelector('.label') as HTMLElement;
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <div class="button" part="button">
                <span class="label" part="label"><slot></slot></span>
            </div>
        `;
    }

    connectedCallback() {
        this._button.addEventListener('click', this.onButtonClick);
    }

    disconnectedCallback() {
        this._button.removeEventListener('click', this.onButtonClick);
    }

    protected onButtonClick(evt: MouseEvent) {
        this.dispatchEvent(
            new CustomEvent('INPUT', {
                detail: { value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }
}

window.customElements.define('input-button', InputButton);

declare global {
    interface HTMLElementTagNameMap {
        'input-button': InputButton;
    }
}
