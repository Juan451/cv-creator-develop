/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import { html } from 'lit';
// Redux
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../redux/redux.js';
import { postUser } from '../redux/reducers/userSlice.js';
import { navigate } from '../redux/reducers/routingSlice.js';

import { stylesView } from '../styles/view-experience-styles.js';

import { PageViewElement } from './page-view-element.js';
import { styles } from '../styles/global-styles.js';
import { emailRegex } from '../utils/utils.js';

class ViewInformation extends connect(store)(PageViewElement) {
  static get styles() {
    return [styles, stylesView];
  }

  static get properties() {
    return {
      userData: { type: Object },
      isDisabled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.userData = {
      firstName: '',
      lastName: '',
      city: '',
      postalCode: '',
      phone: '',
      email: '',
    };
    this.isDisabled = true;
  }

  updated(changedProperties) {
    if (changedProperties.has('userData')) {
      this.isDisabled = !this.isValid(this.userData);
    }
    return true;
  }

  isValid(userData) {
    const { firstName, lastName, city, postalCode, phone, email } = userData;
    return (
      firstName &&
      firstName.length >= 4 &&
      lastName &&
      lastName.length >= 3 &&
      city &&
      city.length >= 4 &&
      phone &&
      phone.length === 9 &&
      postalCode &&
      postalCode.length === 5 &&
      email &&
      emailRegex.test(email)
    );
  }

  handleChange(event) {
    const { name, value } = event.target;
    if (
      (value.length > 3 && name === 'firstName') ||
      (value.length > 3 && name === 'lastName') ||
      (value.length > 3 && name === 'city') ||
      (value.length === 5 && name === 'postalCode') ||
      (value.length === 9 && name === 'phone') ||
      (name === 'email' && emailRegex.test(value))
    ) {
      this.returnStatusSuccess(name);
    } else if (value.length === 0 || value === '') {
      this.returnStatusEmpty(name);
    } else {
      this.returnStatusError(name);
    }
    this.userData = { ...this.userData, [name]: value };
  }

  render() {
    return html`
      <div class="screen__layout">
        <div class="screen__title--row">
          <h1>Welcome to Cognizant's CV Creator</h1>
          <h4>Please, let us help you build your resume.</h4>
        </div>
        <form action="#" method="POST">
          <fieldset>
            <div class="input__row">
              <kor-input
                name="firstName"
                no-clear
                value="${this.userData.firstName}"
                id="name"
                label="First Name"
                @input="${this.handleChange}"
              >
              </kor-input>
              <kor-input
                type="text"
                no-clear
                name="lastName"
                value="${this.userData.lastName}"
                label="Last Name"
                @input="${this.handleChange}"
              ></kor-input>
            </div>
            <div class="input__row">
              <kor-input
                name="city"
                value=${this.userData.city}
                no-clear
                label="City"
                @input="${this.handleChange}"
              ></kor-input>
              <kor-input
                name="postalCode"
                value="${this.userData.postalCode}"
                no-clear
                type="text"
                label="Postal Code"
                @input="${this.handleChange}"
              ></kor-input>
            </div>
            <div class="input__row">
              <kor-input
                no-clear
                name="phone"
                value="${this.userData.phone}"
                type="text"
                label="Phone"
                @input="${this.handleChange}"
              ></kor-input>
              <kor-input
                value="${this.userData.email}"
                name="email"
                no-clear
                type="email"
                label="Email"
                @input="${this.handleChange}"
              ></kor-input>
            </div>
          </fieldset>
        </form>
        <div class="screen_button--row">
          <kor-button
            type="submit"
            @click="${this.backStep}"
            label="Back"
            slot="footer"
          ></kor-button>
          <kor-button
            type="submit"
            @click="${this.enviarFormulario}"
            label="Next"
            slot="footer"
            ?disabled="null"
          ></kor-button>
        </div>
      </div>
    `;
  }

  returnStatusError(name) {
    return this.shadowRoot
      .querySelector(`[name=${name}]`)
      .setAttribute('status', 'error');
  }

  returnStatusSuccess(name) {
    return this.shadowRoot
      .querySelector(`[name=${name}]`)
      .setAttribute('status', 'success');
  }

  returnStatusEmpty(name) {
    return this.shadowRoot
      .querySelector(`[name=${name}]`)
      .setAttribute('status', '');
  }

  stateChanged(state) {
    if (state.login.loggedIn === false) {
      this.userData = {};
      const korInputs = this.shadowRoot.querySelectorAll('kor-input');
      korInputs.forEach(input => {
        input.setAttribute('status', '');
      });
    }
  }

  enviarFormulario(e) {
    e.preventDefault();
    store.dispatch(postUser(this.userData)).then(() => {
      store.dispatch(navigate(`/skills`));
    });
  }
}

customElements.define('view-information', ViewInformation);
