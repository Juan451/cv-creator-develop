import { css } from 'lit';

export const styles = css`
  h2 {
    margin: 1rem auto;
    text-align: center;
    margin-bottom: 2rem;
  }

  h5 {
    margin: 1rem auto;
    text-align: center;
    margin-top: 1.5rem;
  }

  .circle-wrap {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    background: #fefcff;
    border-radius: 50%;
    border: 1px solid #cdcbd0;
  }

  .circle-wrap .circle .mask,
  .circle-wrap .circle .fill {
    width: 200px;
    height: 200px;
    position: absolute;
    border-radius: 50%;
  }

  .circle-wrap .circle .mask {
    clip: rect(0px, 200px, 200px, 75px);
  }

  .circle-wrap .inside-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: rgb(210, 234, 241);
    line-height: 145px;
    text-align: center;
    margin-top: 25px;
    margin-left: 25px;
    color: rgb(30, 81, 220);
    position: absolute;
    z-index: 100;
    font-weight: 700;
    font-size: 2em;
  }

  /* color animation */

  /* 3rd progress bar */
  .mask .fill {
    clip: rect(0px, 75px, 200px, 0px);
    background-color: #227ded;
  }

  .mask.full,
  .circle .fill {
    animation: fill ease-in-out 2s;
    transform: rotate(45deg);
  }

  @keyframes fill {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(45deg);
    }
  }
`;
