import styled from 'styled-components'

const ModalContainer = styled.div`
  .backend-error-container {
    padding: 10px !important;
    margin: 0 auto 20px auto !important;
    color: red;
    background-color: #f9e6e6;
    width: max-content;
    border: 1px solid red;
  }
  .otp-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    .title {
      font-size: 29px;
      font-weight: 500;
      color: #4b4b4b;
      margin-bottom: 11.21%;
      text-align: left !important;
    }

    .label {
      font-weight: 500;
    }

    .resend-otp {
      font-size: 12px;
      font-weight: 300;
      color: #4385f5;
      margin-bottom: 5%;
      cursor: pointer;
    }
    .otp-verified {
      color: #0fde0f !important;
    }

    .validate-otp {
      width: 72.35%;
      margin-right: auto;
    }

    .input-container {
      margin-bottom: unset !important;
    }

    .start-change {
      display: flex;
      align-items: center;

      .change-number {
        font-size: 12px;
        font-weight: 600;
        color: #27debf;
        margin-left: 5%;
        cursor: pointer;
      }
    }
  }

  .send-otp-body {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      color: #27debf !important;
      font-size: 23px !important;
      font-weight: 600 !important;
      margin-bottom: unset !important;
      margin-right: auto;
    }
    .para {
      font-weight: 300;
      font-size: 12px;
      color: #4b4b4b;
      margin-bottom: 7%;
    }

    .input-container {
      margin-bottom: 7%;
    }

    .noMarginBottom {
      margin-bottom: 0 !important;
    }

    .send-otp-btn {
      margin-bottom: 2%;
    }

    .go-back {
      font-size: 12px;
      font-weight: 300;
      color: #4b4b4b;
    }
  }
`

export default ModalContainer
