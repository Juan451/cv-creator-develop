/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
/* eslint-disable import/order */
import { html } from 'lit';
import { styles } from '../styles/global-styles.js';
import { stylesView } from '../styles/view-tech-tools-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../redux/redux.js';
import { addTechTool } from '../redux/reducers/techToolSlice.js';

import { PageViewElement } from './page-view-element.js';
import { navigate } from '../redux/reducers/routingSlice.js';

export class ViewTechTools extends connect(store)(PageViewElement) {
  static get styles() {
    return [styles, stylesView];
  }

  static get properties() {
    return {
      buttons: { type: Array },
      selectedButton: { type: null },
      tech: { type: String },
      techTools: { type: Array },
      currentPage: { type: Number },
      selectedTool: { type: Object },
    };
  }

  constructor() {
    super();
    this.buttons = [
      'Scrum',
      'Git',
      'Azure',
      'Bitbucket',
      'GitHub',
      'AWS',
      'Spring',
      'VSCode',
    ];
    this.selectedButton = null;
    this.techTools = [];
    this.selectedTool = null;
    this.currentPage = 1;
  }

  render() {
    const techToolsPerPage = 3;
    const startIndex = (this.currentPage - 1) * techToolsPerPage;
    const endIndex = startIndex + techToolsPerPage;

    const currentTools = this.techTools.slice(startIndex, endIndex);
    return html` <div class="screen__layout">
      <div class="screen__title--row">
        <h1>Please add the tools and technologies</h1>
        <h4>Please, let us help you build your resume.</h4>
      </div>

      <form action="#" method="post" @submit="${this.addTechTool}">
        <fieldset>
          <div class="input__row">
            <kor-input
              label="Tech and Tools"
              type="text"
              no-clear
              name="tech"
            ></kor-input>
            <kor-button
              @click="${this.addTechTool}"
              type="submit"
              label="Add"
              slot="footer"
            ></kor-button>
          </div>
        </fieldset>
      </form>

      <div class="screen__techtools--row">
        <kor-card label="Tech and Tools" style="width: 97%">
          <kor-table>
            <kor-table-row slot="header">
              <kor-table-cell head grid-cols="16">Tech</kor-table-cell>
              <kor-table-cell head grid-cols="8">Tools</kor-table-cell>
            </kor-table-row>
            ${currentTools.map(
              item => html`
                <kor-table-row
                  slot="header"
                  @click="${() => this.openModal(item)}"
                >
                  <kor-table-cell grid-cols="16">${item.tech}</kor-table-cell>
                  <kor-table-cell grid-cols="8">${item.tool}</kor-table-cell>
                </kor-table-row>
              `
            )}
          </kor-table>
        </kor-card>
        ${this.selectedTool
          ? html`
              <kor-modal id="modal" visible sticky>
                <p>${this.selectedTool.tool}</p>
                <p>${this.selectedTool.tech}</p>
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

      <div class="tags__container">
        <div class="single-tag_container">${this.createTags()}</div>
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

  createTags() {
    return this.buttons.map(
      button => html`
        <kor-tag
          style="background-color: ${button === this.selectedButton
            ? '#e0e0e0'
            : 'white'}"
          @click="${() => this.toggleColor(button)}"
          label="${button}"
        >
        </kor-tag>
      `
    );
  }

  toggleColor(button) {
    this.selectedButton = button;
    this.requestUpdate();
  }

  async addTechTool(e) {
    e.preventDefault();
    const techInput = this.shadowRoot.querySelector('kor-input[name="tech"]');
    const techValue = techInput.value;
    if (techValue && this.selectedButton) {
      this.techTools = [
        ...this.techTools,
        { tech: techValue, tool: this.selectedButton },
      ];
      techInput.value = '';
      this.selectedButton = null;
      await this.requestUpdate();
      store.dispatch(addTechTool({ tech: techInput, competency: techValue }));
    }
  }

  openModal(tools) {
    this.selectedTool = tools;
  }

  closeModal() {
    this.selectedTool = null;
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
    store.dispatch(navigate(`/certificates`));
  }

  backView() {
    store.dispatch(navigate(`/studies`));
  }
}
customElements.define('view-tech-tools', ViewTechTools);
