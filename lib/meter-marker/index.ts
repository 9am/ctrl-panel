import { attr2num } from '../util';
import style from './style.css?inline';

const quarter = 0.25;

export class MeterMarker extends HTMLElement {
    static get observedAttributes() {
        return ['start', 'end', 'min', 'max'];
    }
    protected _start: number = 0;
    protected _end: number = 0.5;
    protected _min: number = 0;
    protected _max: number = 1;
    readonly root: ShadowRoot;

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(this.initTemplate());
    }

    private initTemplate(): Node {
        const template = document.createElement('template');
        template.innerHTML = this.getTemplate();
        return template.content.cloneNode(true);
    }

    protected getTemplate(): string {
        return `
            <style>${style}</style>
            <ul class="meter" part="meter">
                <li class="quarter q1"></li>
                <li class="quarter q2"></li>
                <li class="quarter q3"></li>
                <li class="quarter q4"></li>
            </ul>
            <ul class="meter marker" part="meter marker">
                <li class="quarter q1"></li>
                <li class="quarter q2"></li>
                <li class="quarter q3"></li>
                <li class="quarter q4"></li>
            </ul>
        `;
    }

    attributeChangedCallback(name: string, prev: any, next: any) {
        if (prev === next) {
            return;
        }
        switch (name) {
            case 'start':
            case 'end':
                this._updateMarker();
                break;
            case 'min':
            case 'max':
                this._updateMeter();
                break;
            default:
                break;
        }
    }

    set start(val: number) {
        this.setAttribute('start', `${val}`);
    }
    get start(): number {
        return attr2num(this.getAttribute('start'), 0);
    }

    set end(val: number) {
        this.setAttribute('end', `${val}`);
    }
    get end(): number {
        return attr2num(this.getAttribute('end'), 0.5);
    }

    set min(val: number) {
        this.setAttribute('min', `${val}`);
    }
    get min(): number {
        return attr2num(this.getAttribute('min'), 0);
    }

    set max(val: number) {
        this.setAttribute('max', `${val}`);
    }
    get max(): number {
        return attr2num(this.getAttribute('max'), 1);
    }

    get type(): number {
        return 0;
    }

    private _updateMarker() {
        const total = this.max - this.min;
        const [q1, q2, q3, q4] = this._getQ(this.start, this.end, total);
        this.style.setProperty('--q-1', `${q1}`);
        this.style.setProperty('--q-2', `${q2}`);
        this.style.setProperty('--q-3', `${q3}`);
        this.style.setProperty('--q-4', `${q4}`);
        this.style.setProperty('--offset', `${this.min + this.start * total}`);
    }

    private _updateMeter() {
        const [q1, q2, q3, q4] = this._getQ(0, 1, this.max - this.min);
        this.style.setProperty('--q-bg-1', `${q1}`);
        this.style.setProperty('--q-bg-2', `${q2}`);
        this.style.setProperty('--q-bg-3', `${q3}`);
        this.style.setProperty('--q-bg-4', `${q4}`);
        this.style.setProperty('--offset-bg', `${this.min}`);
    }

    private _getQ(start: number, end: number, scale: number): number[] {
        const output = [0, 0, 0, 0];
        const percent = end - start;
        let finalP = percent * scale;
        let s = Math.floor(finalP / quarter);
        const extra = finalP % quarter;
        output[Math.min(3, s)] = extra;
        while (--s > -1) {
            output[s] = quarter;
        }
        return output;
    }
}

window.customElements.define('meter-marker', MeterMarker);

declare global {
    interface HTMLElementTagNameMap {
        'meter-marker': MeterMarker;
    }
}
