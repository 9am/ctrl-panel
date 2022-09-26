import { CtrlGroup } from '../ctrl-group';
import style from './style.css?inline';

export class CtrlPanel extends CtrlGroup {
    constructor() {
        super();
    }

    protected override getTemplate() {
        return `
            ${super.getTemplate()}
            <style>${style}</style>
        `;
    }
}

window.customElements.define('ctrl-panel', CtrlPanel);

declare global {
    interface HTMLElementTagNameMap {
        'ctrl-panel': CtrlPanel;
    }
}
