export type ValueMap = {};
export type ValueArr = any[];
export type ValuePrime = number | string | boolean;
export type ValueGroup = ValueMap | ValueArr;
export type Value = ValueGroup | ValuePrime;

export class InputBase extends HTMLElement {
    readonly root: ShadowRoot;
    protected _value: Value;

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
        return `<input part="wrapper" class="wrapper" type="text" />`;
    }

    set value(val: Value) {
        this._value = val;
    }
    get value(): Value {
        return this._value;
    }
}
