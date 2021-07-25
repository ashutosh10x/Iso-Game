import styled from "styled-components";

const AnimatedInputStyles = styled.div`
    .animated-input-container {
        background: #f8811a;
        height: 100px;
        position: relative;

        .icon {
            display: none;
            transition: display 4s;
        }

        .icon.focus {
            display: block;
            position: absolute;
            top: 22.5px;
            width: 25px;
            height: 25px;
        }

        .input-area.form-control {
            height: 2px !important;
            transition: height 2s ease-in-out;
            padding: unset !important;
            background-color: white !important;
            width: 400px;
        }

        .focus.form-control {
            height: 36px !important;
        }

        .label {
            font-size: 30px;
            margin-bottom: 16px;
            color: #4b4b4b;
            font-family: Poppins;
            transition: all 2s ease-in-out;
        }
        .focus.label {
            font-size: 8px;
            margin-bottom: 6px;
        }
    }
`;

export default AnimatedInputStyles;
