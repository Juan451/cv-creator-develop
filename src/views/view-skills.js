/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
import { html } from 'lit';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../redux/redux.js';
import { addSkills } from '../redux/reducers/skillsSlice.js';
import { navigate } from '../redux/reducers/routingSlice.js';

import { PageViewElement } from './page-view-element.js';
import { styles } from '../styles/global-styles.js';
import { stylesView } from '../styles/view-skills-styles.js';

export class ViewSkills extends connect(store)(PageViewElement) {
  static get styles() {
    return [styles, stylesView];
  }

  static get properties() {
    return {
      skill: { type: Object },
      nextDisabled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.skill = this.skill || {
      short: '',
      strong: '',
      passions: '',
      years: '',
      roles: '',
    };
    this.nextDisabled = true;
  }

  render() {
    return html` <div class="screen__layout">
      <div class="screen__title--row">
        <h1>Please Add Your Skills and Hobbies</h1>
        <h4>Please, let us help you build your resume.</h4>
      </div>
      <form action="#" method="POST">
        <fieldset>
          <div class="input__row--second">
            <kor-textarea
              @input="${this.shortDesc}"
              label="Skill Short Description"
              name="short"
              rows="5"
              max-length="200"
            ></kor-textarea>
          </div>
          <div class="input__row--second">
            <kor-textarea
              @input="${this.strongDesc}"
              label="Experience Strong Skills"
              name="strong"
              rows="5"
              max-length="200"
            ></kor-textarea>
            <kor-textarea
              @input="${this.passionSkill}"
              label="Passions"
              name="passions"
              rows="5"
              max-length="200"
            ></kor-textarea>
          </div>
          <div class="input__row--second">
            <kor-textarea
              @input="${this.yearsExp}"
              label="Hobbies"
              name="years"
              rows="5"
              max-length="200"
            ></kor-textarea>
            <kor-textarea
              @input="${this.rolesAdq}"
              label="Roles Acquired"
              name="roles"
              rows="5"
              max-length="200"
            ></kor-textarea>
          </div>
        </fieldset>
      </form>

      <div class="screen_button--row">
        <kor-button
          @click="${this.backPage}"
          type="submit"
          label="Back"
          slot="footer"
        ></kor-button>
        <kor-button
          @click="${this.nextPage}"
          type="submit"
          label="Next"
          slot="footer"
          ?disabled="null"
        ></kor-button>
      </div>
    </div>`;
  }

  shortDesc(e) {
    this.skill.short = e.target.value;
    this.checkFields();
  }

  strongDesc(e) {
    this.skill.strong = e.target.value;
    this.checkFields();
  }

  passionSkill(e) {
    this.skill.passions = e.target.value;
    this.checkFields();
  }

  yearsExp(e) {
    this.skill.years = e.target.value;
    this.checkFields();
  }

  rolesAdq(e) {
    this.skill.roles = e.target.value;
    this.checkFields();
  }

  checkFields() {
    if (
      this.skill.short.length >= 10 &&
      this.skill.strong.length >= 10 &&
      this.skill.passions.length >= 10 &&
      this.skill.years.length >= 4 &&
      this.skill.roles.length >= 4
    ) {
      this.nextDisabled = false;
    } else {
      this.nextDisabled = true;
    }
  }

  backPage() {
    store.dispatch(navigate(`/info`));
  }

  nextPage() {
    store.dispatch(addSkills(this.skill));
    this.checkFields();
    store.dispatch(navigate(`/experience`));
  }
}
customElements.define('view-skills', ViewSkills);
