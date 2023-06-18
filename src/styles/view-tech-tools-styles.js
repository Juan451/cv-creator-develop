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

  .tags__container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 80%;
  }

  .single-tag_container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .screen__techtools--row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    width: 82%;
    height: auto;
    gap: 2rem;
  }

  kor-tag {
    cursor: pointer;
    height: auto;
    margin: 0.5rem;
  }

  kor-tag:hover {
    background-color: #e5e5e5;
  }

  kor-input[type='date'] {
    padding: 0.5rem;
  }

  kor-button {
    width: 100%;
    padding: 0.6rem;
    margin-bottom: 20px;
  }

  .screen__techtools--row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    width: 82%;
    height: auto;
    gap: 2rem;
  }
`;
