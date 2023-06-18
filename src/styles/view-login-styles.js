import { css } from 'lit';

export const stylesView = css`
  .screen__login-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 3rem;
    width: 50%;
    background-color: #fce8bc;
  }

  .form__input {
    width: 100%;
    margin-bottom: 20px;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 12px 0;
    width: 100%;
    border: none;
  }

  .input__row {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    width: 70%;
    margin-bottom: 20px;
    gap: 2rem;
  }

  .input__row2 {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 70%;
    margin-bottom: 20px;
    gap: 1rem;
  }

  .screen0_button--row {
    display: flex;
    flex-direction: row;
    justify-content: inherit;
    align-items: flex-start;
    width: 60%;
    height: 25%;
    margin-bottom: 20px;
  }

  kor-input {
    width: 100%;
    height: 3rem;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    background-color: white;
    margin-bottom: 1rem;
  }

  kor-button {
    width: 100%;
    padding: 0.6rem;
    margin-bottom: 20px;
  }

  kor-button[label='Register'] {
    width: 100%;
    padding: 0.6rem;
    margin-bottom: 20px;
    color: #466efa;
    background: white;
  }

  .table__button,
  .table__button--delete,
  .table__button--download {
    margin: 0;
    width: 5rem;
  }

  .table__button--delete {
    background-color: #ff0000;
  }
  .table__button--download {
    background-color: #00a53a;
  }
`;
