import { css } from 'lit';

export const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    width: 90%;
    height: 100%;
    justify-content: center;
    font-family: 'Poppins', sans-serif;
  }

  .avatar__container {
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
  }

  .avatar__container--name {
    font-size: 0.8rem;
    font-weight: 700;
  }

  .avatar__container--email {
    font-size: 0.8rem;
  }

  .avatar__container--logout {
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
  }

  .avatar__info {
    display: flex;
    flex-direction: column;

    justify-content: center;
    row-gap: 0.5rem;
  }

  .avatar__image {
    width: 5rem;
    border-radius: 50%;
  }

  .page {
    display: none;
  }
  .page[active] {
    display: block;
  }

  .screen__layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #fce8bc;
    border-radius: 12px;
    width: 100%;
    height: 800px;
    background-color: #fce8bc;
  }

  .screen__layout--pages {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #fce8bc;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    width: 100%;
    height: 800px;
    background-color: #fce8bc;
  }

  .screen__main--element {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    row-gap: 2rem;
  }
  .screen__title--row {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1,
  h4 {
    margin-bottom: 0;
  }

  h4 {
    font-weight: normal;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 50%;
    height: auto;
    margin-top: 2rem;
  }

  .form__input {
    width: 100%;
    margin-bottom: 20px;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 100%;
    border: none;
  }

  .input__row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    gap: 2rem;
  }

  .screen_button--row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 3rem;
    align-items: center;
    width: 100%;
    height: auto;
  }

  kor-input {
    width: 100%;
    margin-bottom: 2rem;
    height: 3rem;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    background-color: white;
  }

  kor-button {
    width: 100%;
    padding: 0.6rem;
  }

  kor-stepper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 1rem;
  }

  .progress-bar__screen1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    row-gap: 6rem;
    border: 1px solid #fce8bc;
    background-color: white;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    width: 35%;
    min-width: 300px;
    height: 800px;
  }

  kor-icon.increment-icon {
    display: none;
  }

  .circle-progress {
    width: 100%;
    max-width: 300px;
    border-radius: 2px;
    margin: 0 auto;
  }

  .screen__pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  ul.pagination {
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  ul.pagination li {
    display: inline;
  }

  ul.pagination li a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 5px;
  }

  ul.pagination li a.active {
    background-color: #466efa;
    color: white;
    border-radius: 5px;
  }

  ul.pagination li a:hover:not(.active) {
    background-color: #ddd;
  }
`;
