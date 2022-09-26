import { InputBase, Value } from '../input-base';
import { getDecimals, clamp, attr2num } from '../util';
import style from './style.css?inline';

export class InputVector extends InputBase {
    protected override _value: Value = [0, 0];
    protected _track: HTMLElement;
    protected _thumb: HTMLElement;
    protected _rect: DOMRect;
    protected _x: number = 0;
    protected _y: number = 0;
    protected _angle: number = 0;
    protected _len: number = 0;

    constructor() {
        super();
        this._track = this.root.querySelector('.track') as HTMLElement;
        this._thumb = this.root.querySelector('.thumb') as HTMLElement;
        this.onDragStart = this.onDragStart.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    protected override getTemplate() {
        return `
            <style>${style}</style>
            <div class="track" part="track">
                <svg class="crosshair" part="crosshair" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50" y1="0" x2="50" y2="100" />
                    <line x1="0" y1="50" x2="100" y2="50" />
                </svg>
                <i class="thumb" part="thumb"></i>
            </div>
        `;
    }

    connectedCallback() {
        try {
            this.value = JSON.parse(this.getAttribute('value')!) || this._value;
        } catch (err) {}
        this.style.setProperty('--inner', `${this.min / this.max}`);
        this._track.addEventListener('mousedown', this.onDragStart);
        this.dispatchEvent(
            new CustomEvent('INPUT', {
                detail: { value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }

    disconnectedCallback() {
        this._track.removeEventListener('mousedown', this.onDragStart);
    }

    protected onDragStart(evt: MouseEvent) {
        this._rect = this._track.getBoundingClientRect();
        this.onDrag(evt);
        window.addEventListener('mousemove', this.onDrag);
        window.addEventListener('mouseup', this.onDragEnd);
        window.addEventListener('mouseleave', this.onDragEnd);
    }

    protected onDrag(evt: MouseEvent) {
        const { clientX, clientY } = evt;
        const { x, y, width, height } = this._rect;
        const [ox, oy] = [
            clamp(0, clientX - x, width),
            clamp(0, height - clientY + y, height),
        ];
        this._x = (ox / width - 0.5) * 2;
        this._y = (oy / height - 0.5) * 2;
        this.value = [this.max * this._x, this.max * this._y];
        this.dispatchEvent(
            new CustomEvent('INPUT', {
                detail: { value: this.value },
                bubbles: true,
                composed: true,
            })
        );
    }

    protected onDragEnd() {
        window.removeEventListener('mousemove', this.onDrag);
        window.removeEventListener('mouseup', this.onDragEnd);
        window.removeEventListener('mouseleave', this.onDragEnd);
    }

    private clampPosition(x: number, y: number) {
        const [bottom, top] = [this.min / this.max, 1];
        this._len = clamp(bottom, Math.hypot(x, y), top);
        this._angle = Math.atan2(y, x);
        this._x = Math.cos(this._angle) * this._len;
        this._y = Math.sin(this._angle) * this._len;
    }

    override set value(val: Value) {
        const [x, y] = val as [number, number];
        const [percentX, percentY] = [x / this.max, y / this.max];
        this.clampPosition(percentX, percentY);
        this._value = [this._x * this.max, this._y * this.max];
        this.style.setProperty('--percent-x', `${this._x}`);
        this.style.setProperty('--percent-y', `${this._y}`);
    }
    override get value(): Value {
        return this._value;
    }
    get min(): number {
        return attr2num(this.getAttribute('min'), 0);
    }
    get max(): number {
        return attr2num(this.getAttribute('max'), 1);
    }
}

window.customElements.define('input-vector', InputVector);

declare global {
    interface HTMLElementTagNameMap {
        'input-vector': InputVector;
    }
}
