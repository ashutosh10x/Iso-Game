import styled from 'styled-components'

const InputBoxContainer = styled.div`
  width: 100%;
  .input-container {
    margin-bottom: 2.35%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    svg {
      position: absolute;
      right: 13px;
    }

    .error-msg {
      font-size: 9px;
      color: #fd1616;
      height: 20px;
      font-weight: 300;
    }

    .success-msg {
      font-size: 9px;
      color: green;
      height: 20px;
      font-weight: 300;
    }

    .eye-open-close {
      position: absolute;
      width: 20px;
      left: 550px;
      object-fit: contain;
    }

    .label-container {
      display: flex;
      width: 100%;
    }

    .altLabel {
      margin-left: auto;
      font-weight: normal;
      font-size: 12px;
      color: #27debf;
    }

    .label {
      font-weight: normal;
      font-size: 12px;
      margin-right: auto;
      color: #8fa4b8;
    }

    .error-label {
      color: #fd1616;
    }

    .error-msg {
      margin-right: auto;
    }
  }
`

export default InputBoxContainer
