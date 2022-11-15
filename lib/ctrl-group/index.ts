import { ValueGroup, ValueArr, ValueMap } from '../input-base';
import { CtrlBase } from '../ctrl-base';
import style from './style.css?inline';

export class CtrlGroup extends CtrlBase {
    constructor() {
        super();
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <fieldset class="group" part="group">
                <legend class="label" part="label g-label"><slot name="label"></slot></legend>
                <slot></slot>
            </fieldset>
        `;
    }

    override get value(): ValueGroup {
        const slot = <HTMLSlotElement>this.root.querySelector('fieldset > slot');
        const children = <CtrlBase[]>(
            slot
                .assignedElements()
                .filter((element) => CtrlBase.prototype.isPrototypeOf(element))
        );
        if (this.dataset['type'] === 'array') {
            return children.reduce(
                (memo: ValueArr, child: CtrlBase): ValueArr => [...memo, child.value],
                []
            );
        }
        return children.reduce(
            (memo: ValueMap, child: CtrlBase): ValueMap => ({
                ...memo,
                [child.name]: child.value,
            }),
            {}
        );
    }
}

window.customElements.define('ctrl-group', CtrlGroup);

declare global {
    interface HTMLElementTagNameMap {
        'ctrl-group': CtrlGroup;
    }
}
