import styled from "styled-components";

const BlocklyStyles = styled.div`
    .modal-container {
        padding: 30px;

        .code {
            background-color: #eee;
            margin-bottom: 10px;
            max-height: 200px;
            overflow: auto;
        }

        .text {
            margin-bottom: 18px;
            font-size: large;
            font-weight: 600;
        }

        .modal-buttons-container {
            display: flex;
            justify-content: space-evenly;

            .cancel {
                border: 1px solid #ddd;
                background-color: #eee;

                &:hover {
                    box-shadow: 2px 2px 5px #888;
                }
            }

            .ok {
                border: 1px solid #4d90fe;
                background-color: #4d90fe;
                color: white;

                &:hover {
                    box-shadow: 2px 2px 5px #888;
                }
            }

            .modal-button {
                margin: 5px;
                padding: 10px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
                min-width: 70px;
                text-align: center;
                font-size: large;
            }
        }
    }

    .buttons-container {
        display: flex;
        justify-content: space-evenly;
        margin: 30px;

        .button {
            width: max-content;
            cursor: pointer;
            color: white;
            font-weight: 600;
            font-size: 15px;
            padding: 10px 60px;
            border-radius: 35px;
            box-sizing: border-box;

            &:hover {
                box-shadow: 2px 2px 5px #888;
            }
        }

        .run {
            background-color: red;
        }

        .reset {
            background-color: blue;
        }

        .deploy {
            background-color: green;
        }
    }
`;

export default BlocklyStyles;
