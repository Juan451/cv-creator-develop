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
    justify-content: center;
    flex-wrap: wrap;
  }

  .strong-point__card {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: white;
    height: 5rem;
    width: 15rem;
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

  .icon-close {
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    display: block;
    border: none;
    background: none;
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,0,0, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M8 8 L24 24 M8 24 L24 8'/%3E%3C/svg%3E");
  }
`;
