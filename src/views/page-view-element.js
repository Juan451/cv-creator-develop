import { LitElement } from 'lit';

export class PageViewElement extends LitElement {

    static get properties() {
        return {
            active: { type: Boolean },
        };
    }

    shouldUpdate() {
        return this.active;
    }
    
}
customElements.define('page-view-element', PageViewElement);
