import { InputRange } from '../input-range';
import style from './style.css?inline';

const quarter = 0.25;
const trackPercent = 0.75;

export class InputKnob extends InputRange {
    constructor() {
        super();
        this.onInput = this.onInput.bind(this);
        this.addEventListener('INPUT', this.onInput);
        this.style.setProperty('--track-percent', `${trackPercent}`);
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <div class="track" part="track">
                <ul class="meter" part="meter">
                    <li class="quarter q1"></li>
                    <li class="quarter q2"></li>
                    <li class="quarter q3"></li>
                    <li class="quarter q4"></li>
                </ul>
                <i class="thumb" part="thumb"></i>
            </div>
        `;
    }

    protected onInput(evt: Event) {
        const output = [0, 0, 0, 0];
        let percent = (evt as CustomEvent).detail.percent;
        let finalP = percent * trackPercent;
        let s = Math.floor(finalP / quarter);
        const extra = finalP % quarter;
        output[Math.min(3, s)] = extra;
        while (--s > -1) {
            output[s] = quarter;
        }
        const [q1, q2, q3, q4] = output;
        this.style.setProperty('--q-1', `${q1}turn`);
        this.style.setProperty('--q-2', `${q2}turn`);
        this.style.setProperty('--q-3', `${q3}turn`);
        this.style.setProperty('--q-4', `${q4}turn`);
    }
}

window.customElements.define('input-knob', InputKnob);

declare global {
    interface HTMLElementTagNameMap {
        'input-knob': InputKnob;
    }
}
