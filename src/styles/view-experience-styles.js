import { css } from 'lit';

export const stylesView = css`
  .screen__layout--experience {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    width: 100%;
    height: 800px;
  }

  .input__row--second {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80%;
    gap: 2rem;
  }

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
    max-width: 850px !important;
  }

  kor-input,
  kor-textarea {
    width: 100%;
    height: 3rem;
    margin-bottom: 20px;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    background-color: white;
  }

  kor-textarea {
    height: auto;
    padding: 0.5rem;
  }

  kor-input[type='date'] {
    padding: 0.5rem;
  }

  kor-button {
    width: 100%;
    padding: 0.6rem;
    margin-bottom: 20px;
  }

  .screen__experiences--row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    width: 82%;
    height: auto;
    gap: 2rem;
  }

  .screen__experiences--li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    padding: 0 0 0 1.5rem;
    background-color: #fce8bc;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
  }
`;
