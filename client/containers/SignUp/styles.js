import styled from 'styled-components'

const ModalContainer = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  .backend-error-container {
    padding: 20px;
    margin: 30px auto;
    color: red;
    background-color: #f9e6e6;
    width: max-content !important;
    border: 1px solid red;
  }
  .modal-logicode {
    display: flex;
    background-color: white;
    position: absolute;
    font-family: Poppins;
    height: 100%;
    width: 100%;
    flex-direction: row-reverse;

    a:link {
      text-decoration: inherit;
      color: inherit;
    }

    a:visited {
      text-decoration: inherit;
      color: inherit;
    }

    .left-section {
      width: 47%;
      /* background-image: url("https://i.ibb.co/sK6bBqy/popup-1.png"); */
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      padding: 0 5%;

      .data {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .formimg {
        width: 350px;
        margin-bottom: 50px;
      }

      .para {
        font-size: 12px;
        font-weight: 300;
        text-align: center;
        color: #4b4b4b;
      }

      .first-line {
        font-size: 20px;
        font-weight: 600;
        color: #263238;
        text-align: center;
      }

      .second-line {
        font-size: 25px;
        font-weight: 600;
      }
    }

    .right-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .input-container {
        margin-bottom: 0 !important;
      }

      .backend-error-container {
        padding: 15px;
        font-size: 13px;
        margin: 0 auto 20px;
        color: red;
        background-color: #f9e6e6;
        width: max-content;
        border: 1px solid red;
      }

      .city-class {
        display: flex;
        justify-content: space-between;
        width: 100%;

        & > div {
          width: 45%;
        }
      }

      .with-code {
        position: relative;
        width: 100%;

        .country-code {
          position: absolute;
          color: #000;
          font-size: 17px;
          font-weight: 500;
          background-color: rgba(143, 164, 184, 0.38);
          padding: 5px 20px;
          width: max-content;
          top: 19px;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
          z-index: 10;
        }

        input {
          padding-left: 80px !important;
        }
      }

      .cross-icon {
        margin-left: auto;
        display: block;
        cursor: pointer;
      }

      .error-msg {
        font-size: 10px;
        color: red;
        height: 20px;
        font-weight: 500;
      }

      .already-member {
        font-size: 15px;
        font-weight: normal;
        color: #4b4b4b;
        width: max-content !important;
        margin-bottom: 2.2%;
      }

      .congratulations-body {
        div {
          &:first-child {
            width: 80% !important;
            height: 80% !important;
            display: flex !important;
            justify-content: center !important;

            svg {
              width: 80% !important;
              height: 80% !important;
            }
          }
        }
        .title {
          margin-bottom: 10px;
          width: max-content;
          margin: 0 auto 10px auto;
          text-align: center;
        }

        .para {
          font-weight: normal;
          font-size: 12px;
          text-align: center;
        }
      }

      .signup-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 70%;

        & > div {
          width: 100%;
        }

        .title {
          margin-bottom: 4.7%;
          width: 80%;
          font-size: 29px;
          font-weight: 500;
          color: #4b4b4b;
          text-align: center;
        }

        .subtitle {
          font-size: 12px;
          color: #4b4b4b;
          margin-bottom: 2%;
        }

        .signup-options {
          display: flex;
          margin-bottom: 2.7%;
          align-items: center;
        }

        .logiqids {
          background-color: #363636;
          display: flex;
          margin-right: 19px;
          padding: 0 10px;
          border-radius: 4px;
          width: max-content;

          .name {
            height: max-content;
            margin: auto 0;
            font-size: 10px;
            color: white;
          }

          .logo {
            width: 30px;
            object-fit: contain;
            margin-right: 10px;
          }
        }

        .google {
          background-color: #f4f6f8;
          padding: 2.5px 10px;
          .logo {
            height: 14px;
            object-fit: contain;
          }
        }

        .hr {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2.35%;
          width: 100%;

          .line {
            height: 2px;
            background-color: #e4e4e4;
            width: 45%;
          }

          .or {
            margin: 0 19px;
          }
        }

        .terms-and-conditions {
          padding-top: 2.5%;
          margin-bottom: 1%;
          font-size: 9px;
          font-weight: 300;
          display: flex;

          div:first-child {
            width: max-content;
          }

          .link {
            color: #4385f5;
          }

          .content {
            margin-left: 7px;
          }
        }
      }
    }
  }
`

export default ModalContainer
