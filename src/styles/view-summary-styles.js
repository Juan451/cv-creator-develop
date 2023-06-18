import { css } from 'lit';

export const stylesView = css`
  .screen__login-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
    column-gap: 3rem;
    width: 50%;
    background-color: #fce8bc;
  }

  kor-button,
  .button-download {
    width: 100%;
    padding: 0.6rem;
  }

  form {
    margin-top: 0;
  }

  fieldset {
    padding: 0;
  }
`;
