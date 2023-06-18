/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
/* eslint-disable import/order */
import { html } from 'lit';
import { styles } from '../styles/global-styles.js';
import { stylesView } from '../styles/view-studies-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { addStudiesAsync } from '../redux/reducers/studiesSlice.js';
import { store } from '../redux/redux.js';

import { PageViewElement } from './page-view-element.js';
import { navigate } from '../redux/reducers/routingSlice.js';

export class ViewStudies extends connect(store)(PageViewElement) {
  static get styles() {
    return [styles, stylesView];
  }

  static get properties() {
    return {
      study: { type: Object },
      studies: { type: Array },
      nextDisabled: { type: Boolean },
      currentPage: { type: Number },
      selectedStudy: { type: Object },
    };
  }

  constructor() {
    super();
    this.study = this.study || {
      school: '',
      dateFrom: '',
      toDate: '',
      degree: '',
      fieldOfStudy: '',
    };
    this.studies = this.studies || [];
    this.currentPage = 1;
    this.nextDisabled = true;
    this.selectedStudy = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('studies')) {
      this.nextDisabled = this.studies.length === 0;
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

    const currentStudies = this.studies.slice(startIndex, endIndex);

    return html` <div class="screen__layout">
      <div class="screen__title--row">
        <h1>Please Add Your Studies</h1>
        <h4>Please, let us help you build your resume.</h4>
      </div>
      <form action="#" method="post">
        <fieldset>
          <div class="input__row">
            <kor-input
              no-clear
              name="school"
              label="School"
              type="text"
              value="${this.study.school}"
              @input="${this.schoolData}"
            ></kor-input>
            <kor-input
              no-clear
              label="From"
              type="date"
              name="fromDate"
              value="${this.study.fromDate}"
              @change="${this.handleFromChange}"
            ></kor-input>
            <kor-input
              no-clear
              label="To"
              type="date"
              name="toDate"
              value="${this.study.toDate}"
              @change="${this.handleToChange}"
            ></kor-input>
          </div>
          <div class="input__row">
            <kor-input
              no-clear
              label="Degree"
              type="text"
              name="degree"
              value="${this.study.degree}"
              @input="${this.degreeData}"
            ></kor-input>
            <kor-input
              no-clear
              label="Field of Study"
              type="text"
              name="fieldOfStudy"
              value="${this.study.fieldOfStudy}"
              @input="${this.studyData}"
            ></kor-input>

            <kor-button
              type="submit"
              @click="${this.enviarFormulario}"
              label="Add Study"
              slot="footer"
              style="width: 170px;"
            ></kor-button>
          </div>
        </fieldset>
      </form>

      <div class="screen__studies--row">
        <kor-card label="Studies" style="width: 97%">
          <kor-table>
            <kor-table-row slot="header">
              <kor-table-cell head grid-cols="8">Title</kor-table-cell>
              <kor-table-cell head grid-cols="5">Start Date</kor-table-cell>
              <kor-table-cell head grid-cols="5">End Date</kor-table-cell>
              <kor-table-cell head grid-cols="6"
                >Degree & Field</kor-table-cell
              >
            </kor-table-row>
            
        </kor-table-row>
            ${currentStudies.map(
              item => html`
                <kor-table-row
                  slot="header"
                  @click="${() => this.openModal(item)}"
                >
                  <kor-table-cell grid-cols="6">${item.school}</kor-table-cell>
                  <kor-table-cell grid-cols="5"
                    >${item.fromDate}</kor-table-cell
                  >
                  <kor-table-cell grid-cols="5">${item.toDate}</kor-table-cell>
                  <kor-table-cell grid-cols="8">${item.field}</kor-table-cell>
                </kor-table-row>
              `
            )}
          </kor-table>
        </kor-card>
        ${
          this.selectedStudy
            ? html`
                <kor-modal id="modal" visible sticky>
                  <h2>${this.selectedStudy.school}</h2>
                  <p>
                    ${this.selectedStudy.fromDate} -
                    ${this.selectedStudy.toDate}
                  </p>
                  <p>${this.selectedStudy.degree}</p>
                  <p>${this.selectedStudy.fieldOfStudy}</p>
                  <kor-button
                    slot="footer"
                    color="secondary"
                    label="Close"
                    @click="${this.closeModal}"
                  ></kor-button>
                </kor-modal>
              `
            : ''
        }
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
          type="submit"
          ?disabled="null"
          @click="${this.backView}"
          label="Back"
          slot="footer"
        ></kor-button>
        <kor-button
          type="submit"
          ?disabled="null"
          @click="${this.nextView}"
          label="Next"
          slot="footer"
        ></kor-button>
      </div>
    </div>`;
  }

  schoolData(e) {
    this.study.school = e.target.value;
  }

  handleFromChange(e) {
    this.study.fromDate = e.target.value;
    if (this.study.toDate && this.study.fromDate > this.study.toDate) {
      this.study.toDate = this.study.fromDate;
    }
  }

  handleToChange(e) {
    this.study.toDate = e.target.value;
    if (this.study.fromDate && this.study.toDate < this.study.fromDate) {
      this.study.fromDate = this.study.toDate;
    }
  }

  degreeData(e) {
    this.study.degree = e.target.value;
  }

  studyData(e) {
    this.study.fieldOfStudy = e.target.value;
  }

  openModal(experience) {
    this.selectedStudy = experience;
  }

  closeModal() {
    this.selectedStudy = null;
  }

  enviarFormulario(e) {
    e.preventDefault();
    if (
      this.study.school !== '' &&
      this.study.fromDate !== '' &&
      this.study.toDate !== '' &&
      this.study.degree !== '' &&
      this.study.fieldOfStudy
    ) {
      const formattedStudy = { ...this.study };
      formattedStudy.fromDate = this.formatDate(this.study.fromDate);
      formattedStudy.toDate = this.formatDate(this.study.toDate);

      this.studies = [...this.studies, formattedStudy];
      store.dispatch(addStudiesAsync(formattedStudy));
      this.study.school = '';
      this.study.fromDate = '';
      this.study.toDate = '';
      this.study.degree = '';
      this.study.fieldOfStudy = '';
    }
    this.shadowRoot.querySelector(`[name=school]`).value = '';
    this.shadowRoot.querySelector(`[name=fromDate]`).value = '';
    this.shadowRoot.querySelector(`[name=toDate]`).value = '';
    this.shadowRoot.querySelector(`[name=degree]`).value = '';
    this.shadowRoot.querySelector(`[name=fieldOfStudy]`).value = '';
  }

  prevPage(e) {
    e.preventDefault();
    this.currentPage = Math.max(1, this.currentPage - 1);
  }

  nextPage(e) {
    e.preventDefault();
    // eslint-disable-next-line no-plusplus
    this.currentPage++;
  }

  nextView() {
    store.dispatch(navigate(`/tech-tools`));
  }

  backView() {
    store.dispatch(navigate(`/experience`));
  }
}
customElements.define('view-studies', ViewStudies);
