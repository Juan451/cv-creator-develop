/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
/* eslint-disable import/order */
import { html, css } from 'lit';
import { styles } from '../styles/global-styles.js';
import { stylesView } from '../styles/view-strong-points-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../redux/redux.js';
import {
  addStrongPoint,
  removeStrongPoint,
} from '../redux/reducers/strongPointsSlice.js';

import { PageViewElement } from './page-view-element.js';
import { navigate } from '../redux/reducers/routingSlice.js';

export class ViewStrongPoints extends connect(store)(PageViewElement) {
  static styles = [
    styles,
    stylesView,
    css`
      kor-input {
        margin-right: 1rem;
      }
    `,
  ];

  static properties = {
    strongPoints: { type: Array },
    strongPointInput: { type: String },
    isButtonDisabled: { type: Boolean },
  };

  constructor() {
    super();
    this.strongPoints = [];
    this.strongPointInput = '';
    this.isButtonDisabled = false;
  }

  render() {
    return html`
      <div class="screen__layout">
        <div class="screen__title--row">
          <h1>Please add no more than 6 strong points</h1>
          <h4>Please, let us help you build your resume.</h4>
        </div>

        <div class="input__row">
          <kor-input
            no-clear
            id="strong-point-input"
            label="Strong Points"
            type="text"
            .value="${this.strongPointInput}"
            @input="${this.handleStrongPointInput}"
          ></kor-input>

          <kor-button
            type="button"
            @click="${this.addStrongPoint}"
            label="Add Strong Point"
            slot="footer"
            ?disabled="${this.isButtonDisabled}"
          ></kor-button>
        </div>

        <div class="tags__container">
          <div class="single-tag_container">${this.createTags()}</div>
        </div>

        <div class="screen_button--row">
          <kor-button
            type="button"
            @click="${this.backStep}"
            label="Back"
            slot="footer"
          ></kor-button>
          <kor-button
            type="button"
            @click="${this.nextView}"
            label="Submit CV"
            slot="footer"
          ></kor-button>
        </div>
      </div>
    `;
  }

  handleStrongPointInput(event) {
    this.strongPointInput = event.target.value;
  }

  addStrongPoint() {
    const strongPoint = this.strongPointInput.trim();
    if (strongPoint && this.strongPoints.length < 6) {
      store.dispatch(addStrongPoint(strongPoint));
      this.strongPoints = [...this.strongPoints, strongPoint];
      this.strongPointInput = '';
      this.updateButtonState();
    }
  }

  updateButtonState() {
    this.isButtonDisabled = this.strongPoints.length >= 6;
  }

  createTags() {
    return this.strongPoints.map(
      (strongPoint, index) => html`
        <div class="strong-point__card" label="${strongPoint}">
          <span>${strongPoint}</span>
          <button
            class="icon-close"
            @click="${() => this.removeStrongPoint(index)}"
          ></button>
        </div>
      `
    );
  }

  removeStrongPoint(index) {
    const strongPoint = this.strongPoints[index];
    this.strongPoints = this.strongPoints.filter((_, i) => i !== index);
    store.dispatch(removeStrongPoint(strongPoint));
    this.updateButtonState();
  }

  nextView() {
    store.dispatch(navigate(`/summary`));
  }

  backStep() {
    store.dispatch(navigate(`/certificates`));
  }

  updated(changedProperties) {
    if (changedProperties.has('strongPoints')) {
      this.updateButtonState();
    }
  }
}

customElements.define('view-strong-points', ViewStrongPoints);
