import { CtrlGroup } from '../ctrl-group';
import { InputToggle } from '../input-toggle';
import style from './style.css?inline';

export enum PanelPlacement {
    Auto = '',
    TopLeft = 'top-left',
    TopRight = 'top-right',
    BottomLeft = 'bottom-left',
    BottomRight = 'bottom-right',
}

export class CtrlPanel extends CtrlGroup {
    static get observedAttributes() {
        return ['width', 'height'];
    }

    protected _toggleBtn: InputToggle;

    constructor() {
        super();
        this._toggleBtn = this.root.querySelector('.toggle') as InputToggle;
        this.onToggleInput = this.onToggleInput.bind(this);
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <input-toggle class="toggle" part="toggle">CLOSE</input-toggle>
            <fieldset class="group" part="group">
                <legend class="label" part="label g-label"><slot name="label"></slot></legend>
                <slot></slot>
            </fieldset>
        `;
    }

    connectedCallback() {
        this._toggleBtn.addEventListener('INPUT', this.onToggleInput);
    }

    disconnectedCallback() {
        this._toggleBtn.removeEventListener('INPUT', this.onToggleInput);
    }

    protected onToggleInput(evt: Event) {
        evt.stopImmediatePropagation();
        const val = (evt as CustomEvent).detail.value;
        this.classList.toggle('close', val);
        this._toggleBtn.textContent = !!val ? 'OPEN' : 'CLOSE';
    }

    attributeChangedCallback(name: string, prev: string, next: string) {
        if (prev === next) {
            return;
        }
        switch (name) {
            case 'width':
            case 'height':
                this.style.setProperty(`--panel-${name}`, next);
                break;
            default:
                break;
        }
    }

    get placement(): PanelPlacement {
        return <PanelPlacement>this.getAttribute('placement') ?? PanelPlacement.Auto;
    }

    get width(): string {
        return this.getAttribute('width') ?? 'auto';
    }

    get height(): string {
        return this.getAttribute('height') ?? 'auto';
    }
}

window.customElements.define('ctrl-panel', CtrlPanel);

declare global {
    interface HTMLElementTagNameMap {
        'ctrl-panel': CtrlPanel;
    }
}
