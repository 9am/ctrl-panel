import { InputRange } from '../input-range';
import style from './style.css?inline';

export class InputKnob extends InputRange {
    constructor() {
        super();
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <div class="track" part="track">
                <i class="thumb" part="thumb"></i>
            </div>
        `;
    }
}

window.customElements.define('input-knob', InputKnob);

declare global {
    interface HTMLElementTagNameMap {
        'input-knob': InputKnob;
    }
}
