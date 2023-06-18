/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
/* eslint-disable import/order */
import { html } from 'lit';
import { styles } from '../styles/global-styles.js';
import { stylesView } from '../styles/view-certificates-styles.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../redux/redux.js';
import {
  updateLanguage,
  addLanguage,
  deleteLanguage,
  updateCertificate,
  addCertificate,
  deleteCertificate,
} from '../redux/reducers/languageSlice.js';

import { PageViewElement } from './page-view-element.js';
import { navigate } from '../redux/reducers/routingSlice.js';

export class ViewCertificates extends connect(store)(PageViewElement) {
  static get styles() {
    return [styles, stylesView];
  }

  static get properties() {
    return {
      lenguaje: { type: String },
      nivel: { type: String },
      datos: { type: Array },
      editIndex: { type: Number },
      certificate: { type: String },
      issuedBy: { type: String },
      editIndexCert: { type: Number },
      certData: { type: Array },
      currentPage: { type: Number },
      currentPageCert: { type: Number },
      itemsPerPage: { type: Number },
      selectedTool: { type: Object },
    };
  }

  constructor() {
    super();
    this.lenguaje = '';
    this.nivel = '';
    this.datos = [];
    this.editIndex = -1;
    this.certificate = '';
    this.issuedBy = '';
    this.editIndexCert = -1;
    this.certData = [];
    this.currentPage = 1;
    this.currentPageCert = 1;
    this.itemsPerPage = 2;
    this.selectedTool = null;
  }

  render() {
    const pageSize = 2;
    const startIndex = (this.currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = this.datos.slice(startIndex, endIndex);

    const pageCert = 2;
    const startIndexCert = (this.currentPageCert - 1) * pageCert;
    const endIndexCert = startIndexCert + pageCert;
    const currentCert = this.certData.slice(startIndexCert, endIndexCert);

    return html`
      <div class="screen__layout">
        <div class="screen__title--row">
          <h1>Please add languages and certifications</h1>
          <h4>Please, let us help you build your resume.</h4>
        </div>

        <form action="#" method="post">
          <fieldset>
            <div class="input__row">
              <kor-input
                no-clear
                type="text"
                value="${this.editIndex === -1 ? this.lenguaje : ''}"
                @input="${this.languageInput}"
                name="Lenguaje"
                label="Lenguaje"
              ></kor-input>
            </div>
            <div class="input__row">
              <kor-input
                type="select"
                .value="${this.editIndex === -1 ? this.nivel : ''}"
                label="Nivel"
              >
                <kor-menu-item
                  label="Beginer"
                  @click="${this.seleccionaNivel}"
                ></kor-menu-item>
                <kor-menu-item
                  label="Intermediate"
                  @click="${this.seleccionaNivel}"
                ></kor-menu-item>
                <kor-menu-item
                  label="Advanced"
                  @click="${this.seleccionaNivel}"
                ></kor-menu-item>
                <kor-menu-item
                  label="Native"
                  @click="${this.seleccionaNivel}"
                ></kor-menu-item>
              </kor-input>
            </div>
            <kor-button @click="${this.agregar}">Agregar</kor-button>
          </fieldset>
        </form>

        <kor-table condensed>
          <kor-table-row slot="header">
            <kor-table-cell head grid-cols="12">Language</kor-table-cell>
            <kor-table-cell head grid-cols="6">Level</kor-table-cell>
            <kor-table-cell head grid-cols="6">Actions</kor-table-cell>
          </kor-table-row>
          ${currentData.map(
            (dato, index) => html`
              <kor-table-row>
                ${this.editIndex === index
                  ? html`
                      <kor-table-cell grid-cols="12">
                        <kor-input
                          no-clear
                          type="text"
                          label="Tech and Tools"
                          value="${this.lenguaje}"
                          @input="${this.languageInput}"
                          placeholder="Lenguaje"
                        ></kor-input>
                      </kor-table-cell>
                      <kor-table-cell grid-cols="6">
                        <kor-input
                          type="select"
                          .value="${this.nivel}"
                          label="Nivel"
                        >
                          <kor-menu-item
                            label="Beginer"
                            @click="${this.seleccionaNivel}"
                          ></kor-menu-item>
                          <kor-menu-item
                            label="Intermediate"
                            @click="${this.seleccionaNivel}"
                          ></kor-menu-item>
                          <kor-menu-item
                            label="Advanced"
                            @click="${this.seleccionaNivel}"
                          ></kor-menu-item>
                          <kor-menu-item
                            label="Native"
                            @click="${this.seleccionaNivel}"
                          ></kor-menu-item>
                        </kor-input>
                      </kor-table-cell>
                      <kor-table-cell class="table_button-cell" grid-cols="3">
                        <kor-button
                          class="table__button"
                          @click="${this.actualizar}"
                          ?disabled="${!this.lenguaje || !this.nivel}"
                        >
                          Actualizar
                        </kor-button>
                      </kor-table-cell>
                      <kor-table-cell class="table_button-cell" grid-cols="3">
                        <kor-button
                          class="table__button--delete"
                          @click="${() => this.borrar(index)}"
                        >
                          Borrar
                        </kor-button>
                      </kor-table-cell>
                    `
                  : html`
                      <kor-table-cell grid-cols="12"
                        >${dato.lenguaje}</kor-table-cell
                      >
                      <kor-table-cell grid-cols="6"
                        >${dato.nivel}</kor-table-cell
                      >
                      <kor-table-cell class="table_button-cell" grid-cols="3">
                        <kor-button
                          class="table__button"
                          @click="${() => this.editar(index)}"
                        >
                          Editar
                        </kor-button>
                      </kor-table-cell>
                      <kor-table-cell class="table_button-cell" grid-cols="3">
                        <kor-button
                          class="table__button--delete"
                          @click="${() => this.borrar(index)}"
                        >
                          Borrar
                        </kor-button>
                      </kor-table-cell>
                    `}
              </kor-table-row>
            `
          )}
        </kor-table>

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

        <form action="#" method="post">
          <fieldset>
            <div class="input__row">
              <kor-input
                no-clear
                label="Certification Name"
                type="text"
                name="certificate"
                @input="${this.certificateInput}"
              ></kor-input>
            </div>
            <div class="input__row">
              <kor-input
                no-clear
                label="Issued By"
                type="text"
                @input="${this.issuedInput}"
                name="issuedBy"
              ></kor-input>
            </div>
            <kor-button
              type="submit"
              @click="${this.addCertificate}"
              label="Add Certificate"
              slot="footer"
            ></kor-button>
          </fieldset>
        </form>

        <kor-table condensed>
          <kor-table-row slot="header">
            <kor-table-cell head grid-cols="12">Certifications</kor-table-cell>
            <kor-table-cell head grid-cols="6">Issued by</kor-table-cell>
            <kor-table-cell head grid-cols="6">Actions</kor-table-cell>
          </kor-table-row>
          ${currentCert.map(
            (dato, index) => html`
              <kor-table-row>
                ${this.editIndexCert === index
                  ? html`
                      <kor-table-cell grid-cols="12">
                        <kor-input
                          no-clear
                          type="text"
                          label="Certifications"
                          name="certifications"
                          value="${this.certificate}"
                          @input="${this.certificateInput}"
                          placeholder="Certification Name"
                        ></kor-input>
                      </kor-table-cell>
                      <kor-table-cell grid-cols="6">
                        <kor-input
                          no-clear
                          type="text"
                          name="issuedBy"
                          label="Issued By"
                          value="${this.issuedBy}"
                          @input="${this.issuedInput}"
                          placeholder="Issued By"
                        ></kor-input>
                      </kor-table-cell>
                      <kor-table-cell class="table_button-cell" grid-cols="3">
                        <kor-button
                          class="table__button"
                          @click="${this.updateCerts}"
                          ?disabled="${!this.certificate || !this.issuedBy}"
                        >
                          Actualizar
                        </kor-button>
                      </kor-table-cell>
                      <kor-table-cell class="table_button-cell" grid-cols="3">
                        <kor-button
                          class="table__button--delete"
                          @click="${() => this.borrarCerts(index)}"
                        >
                          Borrar
                        </kor-button>
                      </kor-table-cell>
                    `
                  : html`
                      <kor-table-cell
                        @click="${() => this.openModal(dato)}"
                        grid-cols="12"
                        >${dato.certificate}</kor-table-cell
                      >
                      <kor-table-cell
                        @click="${() => this.openModal(dato)}"
                        grid-cols="6"
                        >${dato.issuedBy}</kor-table-cell
                      >
                      <kor-table-cell class="table_button-cell" grid-cols="3">
                        <kor-button
                          class="table__button"
                          @click="${() => this.editarCert(index)}"
                        >
                          Editar
                        </kor-button>
                      </kor-table-cell>
                      <kor-table-cell class="table_button-cell" grid-cols="3">
                        <kor-button
                          class="table__button--delete"
                          @click="${() => this.borrarCerts(index)}"
                        >
                          Borrar
                        </kor-button>
                      </kor-table-cell>
                    `}
              </kor-table-row>
            `
          )}
          ${this.selectedTool
            ? html`
                <kor-modal id="modal" visible sticky>
                  <p>${this.selectedTool.certificate}</p>
                  <p>${this.selectedTool.issuedBy}</p>
                  <kor-button
                    slot="footer"
                    color="secondary"
                    label="Close"
                    @click="${this.closeModal}"
                  ></kor-button>
                </kor-modal>
              `
            : ''}
        </kor-table>

        <div class="screen__pagination">
          <ul class="pagination">
            <li>
              <a href="#" @click="${this.prevPageCert}">«</a>
            </li>
            <li>
              <a class="active" href="#">${this.currentPageCert}</a>
            </li>
            <li>
              <a href="#" @click="${this.nextPageCert}">»</a>
            </li>
          </ul>
        </div>

        <div class="screen_button--row">
          <kor-button
            type="submit"
            @click="${this.backView}"
            label="Back"
            slot="footer"
          ></kor-button>
          <kor-button
            type="submit"
            @click="${this.nextView}"
            label="Next"
            slot="footer"
          ></kor-button>
        </div>
      </div>
    `;
  }

  agregar() {
    if (this.lenguaje && this.nivel) {
      if (this.editIndex > -1) {
        this.datos[this.editIndex] = {
          lenguaje: this.lenguaje,
          nivel: this.nivel,
        };
        const updatedLanguage = {
          lenguaje: this.lenguaje,
          nivel: this.nivel,
        };
        store.dispatch(
          updateLanguage({ index: this.editIndex, language: updatedLanguage })
        );
        this.editIndex = -1;
      } else {
        const newLanguage = {
          lenguaje: this.lenguaje,
          nivel: this.nivel,
        };
        this.datos = [
          ...this.datos,
          { lenguaje: this.lenguaje, nivel: this.nivel },
        ];
        store.dispatch(addLanguage(newLanguage));
      }
      this.lenguaje = '';
      this.nivel = '';

      this.updateComplete.then(() => {
        const lenguajeInput = this.shadowRoot.querySelector(
          'kor-input[name="Lenguaje"]'
        );
        const nivelInput = this.shadowRoot.querySelector(
          'kor-input[label="Nivel"]'
        );

        if (lenguajeInput) {
          lenguajeInput.value = '';
        }
        if (nivelInput) {
          nivelInput.value = '';
        }
      });
    }
  }

  languageInput(e) {
    this.lenguaje = e.target.value;
  }

  seleccionaNivel(e) {
    this.nivel = e.target.getAttribute('label');
  }

  editar(index) {
    this.editIndex = index;
    this.nivel = this.datos[index].nivel;
    this.lenguaje = this.datos[index].lenguaje;
  }

  actualizar() {
    if (this.nivel && this.lenguaje) {
      this.datos[this.editIndex] = {
        nivel: this.nivel,
        lenguaje: this.lenguaje,
      };
      const updatedLanguage = {
        nivel: this.nivel,
        lenguaje: this.lenguaje,
      };
      store.dispatch(
        updateLanguage({ index: this.editIndex, language: updatedLanguage })
      );
      this.editIndex = -1;
      this.lenguaje = '';
      this.nivel = '';
    }
  }

  borrar(index) {
    store.dispatch(deleteLanguage(index));
    this.datos = [
      ...this.datos.slice(0, index),
      ...this.datos.slice(index + 1),
    ];
  }

  openModal(item) {
    this.selectedTool = item;
  }

  closeModal() {
    this.selectedTool = null;
  }

  certificateInput(e) {
    this.certificate = e.target.value;
  }

  issuedInput(e) {
    this.issuedBy = e.target.value;
  }

  addCertificate() {
    if (this.certificate && this.issuedBy) {
      if (this.editIndexCert > -1) {
        this.certData[this.editIndexCert] = {
          certificate: this.certificate,
          issuedBy: this.issuedBy,
        };
        const updatedCertificate = {
          certificate: this.certificate,
          issuedBy: this.issuedBy,
        };
        store.dispatch(
          updateCertificate({
            index: this.editIndexCert,
            certificate: updatedCertificate,
          })
        );
        this.editIndexCert = -1;
      } else {
        this.certData = [
          ...this.certData,
          { certificate: this.certificate, issuedBy: this.issuedBy },
        ];
        const newCertificate = {
          certificate: this.certificate,
          issuedBy: this.issuedBy,
        };
        store.dispatch(addCertificate(newCertificate));
      }
      this.certificate = '';
      this.issuedBy = '';

      this.updateComplete.then(() => {
        const certificateInput = this.shadowRoot.querySelector(
          'kor-input[name="certificate"]'
        );
        const issuedByInput = this.shadowRoot.querySelector(
          'kor-input[name="issuedBy"]'
        );

        if (certificateInput) {
          certificateInput.value = '';
        }
        if (issuedByInput) {
          issuedByInput.value = '';
        }
      });
    }
  }

  updateCerts() {
    if (this.certificate && this.issuedBy) {
      this.certData[this.editIndexCert] = {
        certificate: this.certificate,
        issuedBy: this.issuedBy,
      };
      const updatedCertificate = {
        certificate: this.certificate,
        issuedBy: this.issuedBy,
      };
      store.dispatch(
        updateCertificate({
          index: this.editIndexCert,
          certificate: updatedCertificate,
        })
      );
      this.editIndexCert = -1;
      this.certificate = '';
      this.issuedBy = '';
    }
  }

  editarCert(index) {
    this.editIndexCert = index;
    this.certificate = this.certData[index].certificate;
    this.issuedBy = this.certData[index].issuedBy;
  }

  borrarCerts(index) {
    store.dispatch(deleteCertificate(index));
    this.certData = [
      ...this.certData.slice(0, index),
      ...this.certData.slice(index + 1),
    ];
  }

  prevPageCert(e) {
    e.preventDefault();
    this.currentPageCert = Math.max(1, this.currentPageCert - 1);
  }

  nextPageCert(e) {
    e.preventDefault();
    // eslint-disable-next-line no-plusplus
    this.currentPageCert++;
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
    store.dispatch(navigate(`/strong-points`));
  }

  backView() {
    store.dispatch(navigate(`/tech-tools`));
  }
}
customElements.define('view-certificates', ViewCertificates);
