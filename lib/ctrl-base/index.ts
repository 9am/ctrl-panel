import { Value } from '../input-base';

export class CtrlBase extends HTMLElement {
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
        return `<div class="ctrl-base">ctrl-base</div>`;
    }

    get value(): Value {
        return '';
    }
    get name(): string {
        return this.getAttribute('name') ?? this.constructor.name;
    }
}
