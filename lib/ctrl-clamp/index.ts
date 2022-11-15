import { CtrlSlider, SliderType, SliderInput, SliderEmitAttr } from '../ctrl-slider';
import { InputKnob } from '../input-knob';
import { InputRange } from '../input-range';
import { MeterMarker } from '../meter-marker';
import style from './style.css?inline';

export class CtrlClamp extends CtrlSlider {
    protected declare _value: number[];
    protected _detailLow: HTMLElement;
    protected _detailHigh: HTMLElement;
    protected _trigger: HTMLElement;
    protected _meter: MeterMarker;

    constructor() {
        super();
        this._detailLow = this.root.querySelector('.low') as HTMLElement;
        this._detailHigh = this.root.querySelector('.high') as HTMLElement;
        this._trigger = this.root.querySelector('.trigger') as HTMLElement;
        this._meter = this.root.querySelector('.meter') as MeterMarker;
        this.onStart = this.onStart.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    protected override getTemplate() {
        const tagName = this.type === SliderType.Range ? 'input-range' : 'input-knob';
        const offset = this.type === SliderType.Range ? 0 : 0.1;
        const [low, high] = this.default;
        return `
            <style>${style}</style>
            <label class="label" part="label"><slot></slot></label>
            <em class="detail low" part="detail detail-low"></em>
            <div class="inputs" part="inputs">
                <div class="trigger" part="trigger"></div>
                <meter-marker
                    class="meter" part="meter"
                    orientation="${this.getAttribute('orientation')}"
                    type="${this.type}"
                    min="${offset}" max="${1 - offset}"></meter-marker>
                <${tagName}
                    class="input input-1"
                    part="input input-1"
                    exportparts="track:i-track,track:i-track-1,thumb:i-thumb,thumb:i-thumb-1"
                    value="${low}"
                >
                </${tagName}>
                <${tagName}
                    class="input input-2"
                    part="input input-2"
                    exportparts="track:i-track,track:i-track-2,thumb:i-thumb,thumb:i-thumb-2"
                    value="${high}"
                >
                </${tagName}>
            </div>
            <em class="detail high" part="detail detail-high"></em>
        `;
    }
    override connectedCallback() {
        super.connectedCallback();
        this._trigger.addEventListener('mousedown', this.onStart);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        this._trigger.removeEventListener('mousedown', this.onStart);
    }

    protected onStart(evt: MouseEvent) {
        const input = this.getClosestInput(evt);
        input.root
            .querySelector('[part=track]')!
            .dispatchEvent(new MouseEvent('mousedown', evt));
        this._trigger.classList.add('hidden');
        window.addEventListener('mouseup', this.onEnd);
        window.addEventListener('mouseleave', this.onEnd);
    }

    protected getClosestInput(evt: MouseEvent): SliderInput {
        const { offsetX, offsetY } = evt;
        const { x, y, width, height } = (
            evt.target as HTMLElement
        ).getBoundingClientRect();
        let hit =
            this.getAttribute('orientation') === 'v'
                ? 1 - offsetY / height
                : offsetX / width;
        const [input1, input2] = this._inputs;
        let output = input1;
        if (Math.abs(hit - input1!.percent) > Math.abs(hit - input2!.percent)) {
            output = input2;
        }
        return output!;
    }

    protected onEnd(evt: MouseEvent) {
        this._trigger.classList.remove('hidden');
        window.removeEventListener('mouseup', this.onEnd);
        window.removeEventListener('mouseleave', this.onEnd);
    }

    protected override onInput(evt: Event) {
        const value = this.value;
        const [low, high] = value;
        this._detailLow.textContent = `${low}`;
        this._detailHigh.textContent = `${high}`;
        this.dispatchEvent(
            new CustomEvent('CHANGE', {
                detail: { name: this.name, value: value },
                bubbles: true,
                composed: true,
            })
        );
        const [lowPercent, highPercent] = this.percent;
        this._meter.setAttribute('start', `${lowPercent}`);
        this._meter.setAttribute('end', `${highPercent}`);
    }

    override get value(): number[] {
        return this._inputs.map((input) => input.value).sort((a, b) => a - b);
    }
    get percent(): number[] {
        return this._inputs.map((input) => input.percent).sort((a, b) => a - b);
    }
    override get default(): number[] {
        let val = [this.min, this.max];
        try {
            val = JSON.parse(this.getAttribute('default')!) ?? val;
        } catch (err) {
            return val;
        }
        return val;
    }
}

window.customElements.define('ctrl-clamp', CtrlClamp);

declare global {
    interface HTMLElementTagNameMap {
        'ctrl-clamp': CtrlClamp;
    }
}
