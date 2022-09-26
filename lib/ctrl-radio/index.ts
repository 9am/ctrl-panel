import { CtrlSwitch } from '../ctrl-switch';
import { CtrlGroup } from '../ctrl-group';
import style from './style.css?inline';

export class CtrlRadio extends CtrlGroup {
    protected _ctrls: CtrlSwitch[];

    constructor() {
        super();
        const slot = <HTMLSlotElement>this.root.querySelector('fieldset > slot');
        this._ctrls = <CtrlSwitch[]>(
            slot
                .assignedElements()
                .filter((element) => CtrlSwitch.prototype.isPrototypeOf(element))
        );
        this.onChange = this.onChange.bind(this);
    }

    protected override getTemplate() {
        return `
            ${super.getTemplate()}
            <style>${style}</style>
        `;
    }
    connectedCallback() {
        this.dataset['type'] = 'map';
        this.addEventListener('CHANGE', this.onChange);
    }

    disconnectedCallback() {
        this.removeEventListener('CHANGE', this.onChange);
    }

    protected onChange(evt: Event) {
        const target = evt.composedPath()[0];
        if (target === this) {
            return;
        }
        evt.stopPropagation();
        if (!this.multiple) {
            this._ctrls.forEach((ctrl) => {
                if (ctrl.name !== (evt as CustomEvent).detail.name) {
                    ctrl.input.value = false;
                }
            });
            if (!(evt as CustomEvent).detail.value) {
                (target as CtrlSwitch).input.value = true;
                return;
            }
        }
        this.dispatchEvent(
            new CustomEvent('CHANGE', {
                detail: { name: this.name, value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }

    override get value(): string[] | string {
        const checked = Object.entries(super.value).filter(([, value]) => value);
        if (this.multiple) {
            return checked.map(([name]) => name);
        }
        return checked?.[0]?.[0] ?? '';
    }

    get multiple(): boolean {
        return this.hasAttribute('multiple');
    }
}

window.customElements.define('ctrl-radio', CtrlRadio);

declare global {
    interface HTMLElementTagNameMap {
        'ctrl-radio': CtrlRadio;
    }
}
