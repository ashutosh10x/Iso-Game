import styled from "styled-components";

const BlocklyStyles = styled.div`
    .pagination-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 2px solid #888;
        padding: 20px;

        .part-marker {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            border: 1px solid #ddd;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 20px;
            font-weight: 600;
            color: #888;

            &:hover {
                background-color: #ddd;
            }
        }
        .selected-marker {
            height: 50px;
            width: 50px;
            color: #000;
            background-color: #ddd;
        }
    }

    .users-marker {
        background-image: url("https://i.ibb.co/GRWZb4n/pegman.png");
        background-repeat: no-repeat;
        background-size: 1000px;
        width: 50px;
        height: 50px;
        z-index: 100;
        position: absolute;
    }

    .green-bg {
        background-image: url("https://i.ibb.co/D5qF4wJ/greenery.jpg");
        background-size: 100%;
        background-repeat: no-repeat;
    }

    .button {
        width: max-content;
        cursor: pointer;
        color: white;
        font-weight: 600;
        font-size: 15px;
        padding: 10px 60px;
        border-radius: 35px;
        box-sizing: border-box;
        position: absolute;

        &:hover {
            box-shadow: 2px 2px 5px #888;
        }
    }

    .how-it-works {
        background-color: red;
    }
`;

export default BlocklyStyles;
