/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import { html } from 'lit';
import { connect } from 'pwa-helpers';
import { PageViewElement } from './page-view-element.js';
import { emailRegex, passwordRegex } from '../utils/utils.js';
import './view-tech-tools.js';

// redux
import { store } from '../redux/redux.js';
import {
  userLogin,
  logout,
  userRegister,
} from '../redux/reducers/loginSlice.js';
import { navigate } from '../redux/reducers/routingSlice.js';

import { styles } from '../styles/global-styles.js';
import { stylesView } from '../styles/view-login-styles.js';

class ViewLogin extends connect(store)(PageViewElement) {
  static get styles() {
    return [styles, stylesView];
  }

  static get properties() {
    return {
      showRegister: { type: Boolean },
      loggedIn: { type: Boolean },
      isDisabled: { type: Boolean },
      userData: { type: Object },
      repeatPassword: { type: String },
    };
  }

  constructor() {
    super();
    this.showRegister = true;
    this.isDisabled = true;
    this.userData = {
      email: '',
      pass: '',
      passSecond: '',
    };
    this.repeatPassword = '';
  }

  stateChanged({ login: { loggedIn, error } }) {
    this.loggedIn = loggedIn;
    this.error = error;
  }

  updated(changedProperties) {
    if (changedProperties.has('userData')) {
      this.isDisabled = !this.isValid(this.userData);
    }
  }

  isValid({ email, pass, passSecond }) {
    return (
      passwordRegex.test(pass) &&
      emailRegex.test(email) &&
      email.endsWith('@cognizant.com') &&
      pass === passSecond
    );
  }

  handleInput({ target: { name, value } }) {
    const isValid =
      name === 'email'
        ? emailRegex.test(value) && value.endsWith('@cognizant.com')
        : passwordRegex.test(value);
    if (isValid) {
      this.returnStatusSuccess(name);
    } else if (!value) {
      this.returnStatusEmpty(name);
    } else {
      this.returnStatusError(name);
    }

    this.userData = { ...this.userData, [name]: value };
  }

  render() {
    return html`${this.loggedIn ? this.logoutTemplate : this.loginTemplate}`;
  }

  get loginTemplate() {
    return html`
      <div class="screen__main--element">
        <h1>Please Login or Register</h1>
        <h4>Please, register or login to create or edit your CV</h4>
        ${this.showRegister ? this.loginView : this.registerView}
      </div>
    `;
  }

  get loginView() {
    return html`
      <form action="#" method="POST">
        <fieldset>
          <div class="input__row">
            <kor-input
              @input="${this.handleInput}"
              name="email"
              no-clear
              type="email"
              label="Email"
            >
            </kor-input>
            <kor-input
              @input="${this.handleInput}"
              type="password"
              no-clear
              name="pass"
              label="Password"
            ></kor-input>
          </div>
        </fieldset>
      </form>
      <div class="screen__login-row">
        <kor-button
          @click="${this.login}"
          type="submit"
          label="Login"
          slot="footer"
        ></kor-button>
        <kor-button
          @click="${this.changeForm}"
          type="submit"
          label="Register"
          slot="footer"
        ></kor-button>
      </div>
    `;
  }

  get registerView() {
    return html`
      <form action="#" method="POST">
        <fieldset>
          <div class="input__row">
            <kor-input
              @input="${this.handleInput}"
              name="email"
              no-clear
              type="email"
              label="Email"
            >
            </kor-input>
            <kor-input
              @input="${this.handleInput}"
              type="password"
              no-clear
              name="pass"
              label="Password"
            ></kor-input>
            <kor-input
              @input="${this.handleInput}"
              type="password"
              no-clear
              name="passSecond"
              label="Repeat Password"
            ></kor-input>
          </div>
        </fieldset>
      </form>
      <div class="screen0_button--row">
        <kor-button
          @click="${this.register}"
          type="submit"
          label="Register"
          slot="footer"
        ></kor-button>
        <kor-button
          @click="${this.changeForm}"
          type="submit"
          label="Login"
          slot="footer"
        ></kor-button>
      </div>
    `;
  }

  get logoutTemplate() {
    return html`
      <div class="screen__main--element">
        <div class="screen__title--row">
          <h1>Welcome back Denzel Washington</h1>
          <h4>Please, let us help you build your resume.</h4>
        </div>

        <div style="width:100%">
          <kor-card label="List of CVs" style="width: 100%">
            <kor-table>
              <kor-table-row slot="header">
                <kor-table-cell head grid-cols="15">Resume</kor-table-cell>
                <kor-table-cell head grid-cols="9">Actions</kor-table-cell>
              </kor-table-row>
              <kor-table-row>
                <kor-table-cell grid-cols="15"
                  >CV Frontend Developer Lit</kor-table-cell
                >

                <kor-table-cell class="table_button-cell" grid-cols="3"
                  ><kor-button class="table__button"
                    >Edit</kor-button
                  ></kor-table-cell
                >
                <kor-table-cell grid-cols="3"
                  ><kor-button class="table__button--delete"
                    >Delete</kor-button
                  ></kor-table-cell
                >
                <kor-table-cell grid-cols="3"
                  ><kor-button class="table__button--download"
                    >Download</kor-button
                  ></kor-table-cell
                >
              </kor-table-row>
              <kor-table-row>
                <kor-table-cell grid-cols="15"
                  >CV Frontend Developer Lit</kor-table-cell
                >

                <kor-table-cell class="table_button-cell" grid-cols="3"
                  ><kor-button class="table__button"
                    >Edit</kor-button
                  ></kor-table-cell
                >
                <kor-table-cell grid-cols="3"
                  ><kor-button class="table__button--delete"
                    >Delete</kor-button
                  ></kor-table-cell
                >
                <kor-table-cell grid-cols="3"
                  ><kor-button class="table__button--download"
                    >Download</kor-button
                  ></kor-table-cell
                >
              </kor-table-row>
            </kor-table>
          </kor-card>
        </div>
        <kor-button style="width:80%" @click="${this.goCV}"
          >Create New CV</kor-button
        >
      </div>
    `;
  }

  setStatus(name, status) {
    return this.shadowRoot
      .querySelector(`[name=${name}]`)
      .setAttribute('status', status);
  }

  returnStatusError(name) {
    this.setStatus(name, 'error');
  }

  returnStatusSuccess(name) {
    this.setStatus(name, 'success');
  }

  returnStatusEmpty(name) {
    this.setStatus(name, '');
  }

  changeForm() {
    this.showRegister = !this.showRegister;
  }

  dispatchUserAction(action) {
    const { email, pass: password } = this.userData;
    store.dispatch(action({ email, password }));
  }

  login() {
    this.dispatchUserAction(userLogin);
  }

  goCV() {
    store.dispatch(navigate('/info'));
  }

  register() {
    if (this.userData.pass === this.userData.passSecond) {
      this.dispatchUserAction(userRegister);
    }
  }

  logout() {
    this.userData = {};
    store.dispatch(logout());
  }
}

customElements.define('view-login', ViewLogin);
