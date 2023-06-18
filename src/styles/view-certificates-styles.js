import { css } from 'lit';

export const stylesView = css`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: auto;
    margin-top: 2rem;
  }

  fieldset {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    column-gap: 2rem;
  }

  kor-input {
    width: 100%;
    height: 3rem;
    margin-bottom: 20px;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    background-color: white;
  }

  kor-button {
    width: 90%;
    padding: 0.6rem;
    margin-bottom: 20px;
  }
  kor-table {
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
    background-color: white;
  }

  .table__button,
  .table__button--delete {
    margin: 0;
    padding: 0;
    width: 5rem;
  }

  .table__button--delete {
    background-color: #ff0000;
  }
  .screen_button--row {
    margin-top: 2rem;
  }
`;
