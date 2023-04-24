import { InputBase, Value } from '../input-base';
import { MeterMarker } from '../meter-marker';
import { getDecimals, clamp, attr2num } from '../util';
import style from './style.css?inline';

export enum Orientation {
    Horizontal = 'h',
    Vertical = 'v',
}

export class InputRange extends InputBase {
    protected override _value: number = 5;
    protected _track: HTMLElement;
    protected _thumb: HTMLElement;
    protected _meter: MeterMarker;
    protected _rect: DOMRect;
    protected _percent: number = 0.5;

    constructor() {
        super();
        this._track = this.root.querySelector('.track') as HTMLElement;
        this._thumb = this.root.querySelector('.thumb') as HTMLElement;
        this._meter = this.root.querySelector('.meter') as MeterMarker;
        this.onDragStart = this.onDragStart.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <meter-marker
                class="meter" part="meter"
                orientation="${this.orientation}" type="range"
                min="0" max="1" start="0"></meter-marker>
            <div class="track" part="track">
                <i class="thumb" part="thumb"></i>
            </div>
        `;
    }

    connectedCallback() {
        this.value = attr2num(this.getAttribute('value'), (this.max + this.min) / 2);
        this.addEventListener('mousedown', this.onDragStart);
        this.dispatchEvent(
            new CustomEvent('INPUT', {
                detail: { value: this.value, percent: this._percent },
                bubbles: true,
                composed: true,
            })
        );
    }

    disconnectedCallback() {
        this.removeEventListener('mousedown', this.onDragStart);
    }

    protected onDragStart(evt: MouseEvent) {
        this._rect = this._track.getBoundingClientRect();
        this.onDrag(evt);
        window.addEventListener('mousemove', this.onDrag, true);
        window.addEventListener('mouseup', this.onDragEnd, true);
        window.addEventListener('mouseleave', this.onDragEnd, true);
    }

    protected onDrag(evt: MouseEvent) {
        this.clampPosition(evt.clientX, evt.clientY);
        this.value = this.min + (this.max - this.min) * this._percent;
        this.dispatchEvent(
            new CustomEvent('INPUT', {
                detail: { value: this.value, percent: this._percent },
                bubbles: true,
                composed: true,
            })
        );
    }

    protected onDragEnd() {
        window.removeEventListener('mousemove', this.onDrag, true);
        window.removeEventListener('mouseup', this.onDragEnd, true);
        window.removeEventListener('mouseleave', this.onDragEnd, true);
    }

    protected clampPosition(clientX: number, clientY: number) {
        const { x, y, width, height } = this._rect;
        const isHorizontal = this.orientation === Orientation.Horizontal;
        const total = isHorizontal ? width : height;
        const offset = isHorizontal ? clientX - x : height - (clientY - y);
        this._percent = clamp(0, offset, total) / total;
    }

    override set value(val: number) {
        const clampedVal = clamp(this.min, val, this.max);
        if (this.step === 'any') {
            this._percent = (clampedVal - this.min) / (this.max - this.min);
            this._value = clampedVal;
        } else {
            const closestIndex = Math.round((clampedVal - this.min) / <number>this.step);
            let closestValue = this.min + closestIndex * <number>this.step;
            if (closestValue > this.max) {
                closestValue -= <number>this.step;
            }
            const decimals = getDecimals(<number>this.step);
            closestValue = +closestValue.toFixed(decimals);
            this._percent = (closestValue - this.min) / (this.max - this.min);
            this._value = closestValue;
        }
        this._thumb.style.setProperty('--percent', `${this._percent}`);
        this._meter.setAttribute('end', `${this._percent}`);
    }
    override get value(): number {
        return this._value;
    }
    get percent(): number {
        return this._percent;
    }
    get min(): number {
        return attr2num(this.getAttribute('min'), 0);
    }
    get max(): number {
        return attr2num(this.getAttribute('max'), 10);
    }
    get step(): number | string {
        return parseFloat(this.getAttribute('step')!) || 'any';
    }
    get orientation(): Orientation {
        return (
            (this.getAttribute('orientation')! as Orientation) || Orientation.Horizontal
        );
    }
}

window.customElements.define('input-range', InputRange);

declare global {
    interface HTMLElementTagNameMap {
        'input-range': InputRange;
    }
}
