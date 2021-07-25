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
`;

export default BlocklyStyles;
