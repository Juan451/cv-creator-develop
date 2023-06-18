import { html } from 'lit';
import { PageViewElement } from './page-view-element.js';
import { styles } from '../styles/global-styles.js';

export class View404 extends PageViewElement {
  static get styles() {
    return styles;
  }

  render() {
    return html` <h2>Error 404 - Not Found</h2> `;
  }
}
customElements.define('view-404', View404);
