/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import { html } from 'lit';
import { connect } from 'pwa-helpers';
import { PageViewElement } from './page-view-element.js';
import { navigate } from '../redux/reducers/routingSlice.js';

// redux
import { store } from '../redux/redux.js';

import { styles } from '../styles/global-styles.js';
import { stylesView } from '../styles/view-summary-styles.js';

class ViewSummary extends connect(store)(PageViewElement) {
  static get styles() {
    return [styles, stylesView];
  }

  render() {
    return html`<div class="screen__layout">
      <div class="screen__title--row">
        <h1>Thank You for submitting your CV</h1>
      </div>

      <div class="screen__login-row">
        <kor-button
          @click=${this.backHome}
          label="Back Home"
          slot="footer"
        ></kor-button>
        <form action="#" method="POST">
          <fieldset>
            <kor-button
              @click="null"
              type="submit"
              label="Download CV"
              slot="footer"
            ></kor-button>
          </fieldset>
        </form>
      </div>
    </div>`;
  }

  backHome() {
    store.dispatch(navigate(`/login`));
  }
}

customElements.define('view-summary', ViewSummary);
