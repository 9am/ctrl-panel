import { InputRange } from '../input-range';
import style from './style.css?inline';

export class InputKnob extends InputRange {
    constructor() {
        super();
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <meter-marker
                class="meter" part="meter"
                type="knob" min=".1" max=".9" start="0">
            </meter-marker>
            <div class="track" part="track">
                <i class="thumb" part="thumb"></i>
            </div>
        `;
    }

    /* update percent with angle */
    // protected override clampPosition(clientX: number, clientY: number) {
    //     const { x, y, width, height } = this._rect;
    //     const [mx, my] = [x + width / 2, y + height / 2];
    //     let angle = Math.atan2(my - clientY, mx - clientX) + Math.PI / 2;
    //     if (angle < 0) {
    //         angle += Math.PI * 2;
    //     }
    //     this._percent = angle / (Math.PI * 2);
    // }
}

window.customElements.define('input-knob', InputKnob);

declare global {
    interface HTMLElementTagNameMap {
        'input-knob': InputKnob;
    }
}
