import styled from "styled-components";

const LoginContainer = styled.div`
    .backend-error-container {
        padding: 15px;
        margin: 20px auto;
        font-size: 12px;
        color: red;
        background-color: #f9e6e6;
        width: max-content;
        border: 1px solid red;
    }

    .login-container {
        display: flex;
        width: 100%;
        height: 100%;
        background-color: white;
        font-family: Poppins;
        position: absolute;

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
            object-fit: contain;
            /* background-image: url("https://i.ibb.co/ZLdj4vT/popup-2.png"); */
            background-size: 100% 100%;
            background-repeat: no-repeat;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            padding: 0 5%;

            .para {
                font-size: 15px;
                font-style: italic;
                font-weight: normal;
                text-align: center;
                color: rgba(0, 0, 0, 0.5);
            }

            .computer-screen {
                margin-bottom: 40px;
                position: relative;
            }

            .title {
                font-size: 32px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 30px;
                color: #000000;
            }
        }

        .right-section {
            width: 53%;
            padding: 4% 10%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;

            .flying-rocket {
                position: relative;
                margin-bottom: 12%;

                .dots {
                    position: absolute;
                    right: -122px;
                    top: -50px;
                }

                .rocket {
                    position: absolute;
                    left: 122px;
                    top: -40px;
                }
            }

            .new-to-logicode {
                margin: 0 auto;
                font-size: 15px;
                font-weight: normal;
                margin-bottom: 2.2%;
                color: #4b4b4b;
            }

            .title {
                font-size: 29px;
                font-weight: 500;
                margin-bottom: 3.5%;
                color: #4b4b4b;
            }

            .login-options {
                display: flex;
                margin-bottom: 4.7%;
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

            .login {
                margin-bottom: 10%;
            }

            .something-wrong {
                margin-bottom: 2.35%;
                width: 100%;
                border: 1px solid #fd1616;
                background-color: rgba(253, 22, 22, 0.03);
                padding: 8px 16px;

                .title {
                    color: #000000;
                    font-size: 12px;
                    font-weight: normal;
                }

                .para {
                    color: #8fa4b8;
                    font-size: 10px;
                    font-weight: normal;
                }
            }
        }
    }
`;

export default LoginContainer;
