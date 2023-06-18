/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
import { LitElement, html } from 'lit';

// redux
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from './redux/redux.js';
import { navigate } from './redux/reducers/routingSlice.js';

import { styles } from './styles/global-styles.js';
import '@dile/dile-pages/dile-pages.js';

import './index.js';

class CvCreator extends connect(store)(LitElement) {
  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      selectedPage: { type: String },
      page: { type: String },
      showProgressBar: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.selectedPage = '';
    this.loggedIn = false;
  }

  render() {
    return html`
      <dile-pages
        class="${this.page === 'login'
          ? 'screen__layout'
          : 'screen__layout--pages'}"
        selected="${this.page}"
        attrForSelected="name"
      >
        <view-login name="login" ?active=${this.page === 'login'}></view-login>
        <view-information
          name="info"
          ?active=${this.page === 'info'}
        ></view-information>
        <view-skills
          name="skills"
          ?active=${this.page === 'skills'}
        ></view-skills>
        <view-experience
          name="experience"
          ?active=${this.page === 'experience'}
        ></view-experience>
        <view-studies
          name="studies"
          ?active=${this.page === 'studies'}
        ></view-studies>
        <view-tech-tools
          name="tech-tools"
          ?active=${this.page === 'tech-tools'}
        ></view-tech-tools>
        <view-certificates
          name="certificates"
          ?active=${this.page === 'certificates'}
        ></view-certificates>
        <view-strong-points
          name="strong-points"
          ?active=${this.page === 'strong-points'}
        ></view-strong-points>
        <view-summary
          name="summary"
          ?active=${this.page === 'summary'}
        ></view-summary>

        <view-404 name="404" ?active=${this.page === '404'}></view-404>
      </dile-pages>
      ${this.showProgressBar
        ? html`<div class="progress-bar__screen1">
            <div class="avatar__container">
              <img
                src="https://e0.pxfuel.com/wallpapers/785/5/desktop-wallpaper-denzel-washington-gang-movie-training-day.jpg"
                alt="Denzel Wahington"
                class="avatar__image"
              />
              <div class="avatar__info">
                <span class="avatar__container--name">Denzel Wahington</span>
                <span class="avatar__container--email"
                  >denzel@cognizant.com</span
                ><span class="avatar__container--logout">Logout</span>
              </div>
            </div>
            <circular-progress-bar> </circular-progress-bar>
          </div>`
        : null}
    `;
  }

  selectedChanged(e) {
    this.selectedPage = e.target.getAttribute('name');
    store.dispatch(navigate(`/${this.selectedPage}`));
  }

  loginView() {
    const page = '/login';
    store.dispatch(navigate(page));
  }

  stateChanged(state) {
    const { routing, login } = state;
    this.page = routing.page;
    this.showProgressBar =
      routing.page !== 'login' && routing.page !== '404' && login.loggedIn;
  }
}

customElements.define('cv-creator', CvCreator);
