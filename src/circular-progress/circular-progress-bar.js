import { LitElement, html } from 'lit';
import { styles } from './circular-progress-barStyles.js';

class CircularProgress extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      name: { type: String },
      lastName: { type: String },
      city: { type: String },
      cp: { type: Number },
      phone: { type: Number },
      email: { type: String },
    };
  }

  constructor() {
    super();
    this.circleText = 'hola';
  }

  render() {
    return html`
      <h2>CV Creation Progress</h2>
      <div class="circle-wrap">
        <div class="circle">
          <div class="mask full">
            <div class="fill"></div>
          </div>
          <div class="mask half">
            <div class="fill"></div>
          </div>
          <div class="inside-circle">25%</div>
        </div>
      </div>
      <h5>PERSONAL INFORMATION</h5>
    `;
  }
}
customElements.define('circular-progress-bar', CircularProgress);
