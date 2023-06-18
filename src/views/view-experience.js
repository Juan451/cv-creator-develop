/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
import { html } from 'lit';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { addExperience } from '../redux/reducers/experienceSlice.js';
import { store } from '../redux/redux.js';
import { navigate } from '../redux/reducers/routingSlice.js';

import { PageViewElement } from './page-view-element.js';
import { styles } from '../styles/global-styles.js';
import { stylesView } from '../styles/view-experience-styles.js';

export class ViewExperience extends connect(store)(PageViewElement) {
  static get styles() {
    return [styles, stylesView];
  }

  static get properties() {
    return {
      experience: { type: Object },
      experiences: { type: Array },
      nextDisabled: { type: Boolean },
      currentPage: { type: Number },
      selectedExperience: { type: Object },
    };
  }

  constructor() {
    super();
    this.experience = this.experience || {
      company: '',
      from: '',
      to: '',
      description: '',
    };
    this.experiences = this.experiences || [];
    this.currentPage = 1;
    this.nextDisabled = true;
    this.selectedExperience = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('experiences')) {
      this.nextDisabled = this.experiences.length === 0;
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  render() {
    const experiencesPerPage = 3;
    const startIndex = (this.currentPage - 1) * experiencesPerPage;
    const endIndex = startIndex + experiencesPerPage;

    const currentExperiences = this.experiences.slice(startIndex, endIndex);

    return html` <div class="screen__layout">
      <div class="screen__title--row">
        <h1>Please Add Your Experience</h1>
        <h4>Please, let us help you build your resume.</h4>
      </div>
      <form action="#" method="POST">
        <fieldset>
          <div class="input__row--second">
            <kor-input
              label="Select Company Industry"
              name="company"
              type="select"
            >
              <kor-menu-item
                @click="${this.handleSelect}"
                label="Pharmaceuticals"
              ></kor-menu-item>
              <kor-menu-item
                @click="${this.handleSelect}"
                label="Medical Equipment"
              ></kor-menu-item>
              <kor-menu-item
                @click="${this.handleSelect}"
                label="Financial Services"
              ></kor-menu-item>
              <kor-menu-item
                @click="${this.handleSelect}"
                label="Other"
              ></kor-menu-item>
            </kor-input>
            <kor-input
              no-clear
              style="width: 320px;"
              label="From"
              type="date"
              name="from"
              value="${this.experience.from}"
              @change="${this.handleFromChange}"
            ></kor-input>
            <kor-input
              no-clear
              style="width: 320px;"
              label="To"
              type="date"
              name="to"
              value="${this.experience.to}"
              @change="${this.handleToChange}"
            ></kor-input>
          </div>
          <div class="input__row--second">
            <kor-textarea
              @input="${this.description}"
              style="width: 660px;"
              label="Experience Short Description"
              name="description"
              rows="3"
              max-length="200"
            ></kor-textarea>

            <kor-button
              type="submit"
              @click="${this.enviarFormulario}"
              label="Add Experience"
              slot="footer"
              style="width: 170px; margin-bottom: 50px;"
            ></kor-button>
          </div>
        </fieldset>
      </form>

      <div class="screen__experiences--row">
        <kor-card label="Work Experience Submited" style="width: 97%">
          <kor-table>
            <kor-table-row slot="header">
              <kor-table-cell head grid-cols="12">Role</kor-table-cell>
              <kor-table-cell head grid-cols="3">Start Date</kor-table-cell>
              <kor-table-cell head grid-cols="3">End Date</kor-table-cell>
              <kor-table-cell head grid-cols="6"
                >View Description</kor-table-cell
              >
            </kor-table-row>
            ${currentExperiences.map(
              item =>
                html`
                  <kor-table-row
                    slot="header"
                    @click="${() => this.openModal(item)}"
                  >
                    <kor-table-cell grid-cols="12"
                      >${item.company}</kor-table-cell
                    >
                    <kor-table-cell grid-cols="3">${item.from}</kor-table-cell>
                    <kor-table-cell grid-cols="3">${item.to}</kor-table-cell>
                    <kor-table-cell grid-cols="6"
                      >${item.description}</kor-table-cell
                    >
                  </kor-table-row>
                `
            )}
          </kor-table>
        </kor-card>
        ${this.selectedExperience
          ? html`
              <kor-modal id="modal" visible sticky>
                <h2>${this.selectedExperience.company}</h2>
                <p>
                  ${this.selectedExperience.from} -
                  ${this.selectedExperience.to}
                </p>
                <p>${this.selectedExperience.description}</p>
                <kor-button
                  slot="footer"
                  color="secondary"
                  label="Close"
                  @click="${this.closeModal}"
                ></kor-button>
              </kor-modal>
            `
          : ''}
        <div class="screen__pagination">
          <ul class="pagination">
            <li>
              <a href="#" @click="${this.prevPage}">«</a>
            </li>
            <li>
              <a class="active" href="#">${this.currentPage}</a>
            </li>
            <li>
              <a href="#" @click="${this.nextPage}">»</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="screen_button--row">
        <kor-button
          @click="${this.backView}"
          type="submit"
          label="Back"
          slot="footer"
        ></kor-button>
        <kor-button
          @click="${this.nextView}"
          type="submit"
          label="Next"
          slot="footer"
          ?disabled="null"
        ></kor-button>
      </div>
    </div>`;
  }

  description(e) {
    this.experience.description = e.target.value;
  }

  handleFromChange(e) {
    this.experience.from = e.target.value;
    if (this.experience.to && this.experience.from > this.experience.to) {
      this.experience.to = this.experience.from;
    }
  }

  handleToChange(e) {
    this.experience.to = e.target.value;
    if (this.experience.from && this.experience.to < this.experience.from) {
      this.experience.from = this.experience.to;
    }
  }

  handleSelect(e) {
    this.experience.company = e.target.getAttribute('label');
  }

  enviarFormulario(e) {
    e.preventDefault();
    if (
      this.experience.company !== '' &&
      this.experience.from !== '' &&
      this.experience.to !== '' &&
      this.experience.description !== ''
    ) {
      const experienceCopy = { ...this.experience };

      experienceCopy.from = this.formatDate(experienceCopy.from);
      experienceCopy.to = this.formatDate(experienceCopy.to);
      store.dispatch(addExperience(experienceCopy));

      this.experiences = [...this.experiences, experienceCopy];
      this.experience.company = '';
      this.experience.from = '';
      this.experience.to = '';
      this.experience.description = '';
    }
    this.shadowRoot.querySelector(`[name=company]`).value = '';
    this.shadowRoot.querySelector(`[name=from]`).value = '';
    this.shadowRoot.querySelector(`[name=to]`).value = '';
    this.shadowRoot.querySelector(`[name=description]`).value = '';
  }

  openModal(experience) {
    this.selectedExperience = experience;
  }

  closeModal() {
    this.selectedExperience = null;
  }

  nextPage(e) {
    e.preventDefault();
    // eslint-disable-next-line no-plusplus
    this.currentPage++;
  }

  prevPage(e) {
    e.preventDefault();
    this.currentPage = Math.max(1, this.currentPage - 1);
  }

  nextView() {
    store.dispatch(navigate(`/studies`));
  }

  backView() {
    store.dispatch(navigate(`/skills`));
  }
}
customElements.define('view-experience', ViewExperience);
