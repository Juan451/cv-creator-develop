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
  kor-input {
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

  .screen__studies--row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    width: 82%;
    height: auto;
    gap: 2rem;
  }

  .screen__studies--li {
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
