import styled from 'styled-components'

const ButtonContainer = styled.div`
  .button {
    background-color: #27debf;
    font-family: Poppins;
    color: white;
    font-size: 12px;
    font-weight: 600;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 25px;
    width: max-content;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .color-switch,
  .circle-loader-color-switch {
    color: #27debf;
    background-color: white;
    border: 1px solid #27debf;
  }
  .circle-loader-color-switch,
  .circle-loader {
    padding: 4px 25px;
  }

  .disable {
    color: white;
    background-color: #aaaaaa;
  }

  .icon {
    width: 21px;
    object-fit: contain;
  }

  .icon-container {
    border-radius: 50%;
    object-fit: contain;
    width: max-content;
    height: max-content;
  }

  .error {
    border: 2px solid #fd1616;
    background-color: white;

    .icon {
      width: 9px;
      object-fit: contain;
    }

    .icon-container {
      background-color: #fd1616;
      height: 21px;
      width: 21px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .success,
  .reload,
  .refresh {
    background-color: #27debf;
  }

  .success-color-switch {
    border: 2px solid #04f489;
    background-color: #ffffff;
  }
`

export default ButtonContainer
