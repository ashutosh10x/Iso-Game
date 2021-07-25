import React from "react";
import ButtonContainer from "./styles";

export default class Button extends React.Component {
    render() {
        let style = { width: this.props.width, height: this.props.height };
        let buttonType = this.props.type;
        let content;
        let circleLoaderColor;
        if (this.props.type == "circle-loader") circleLoaderColor = "#FFFFFF";
        if (this.props.type == "circle-loader-color-switch")
            circleLoaderColor = "#27debf";

        let svg = (
            <svg
                style={{
                    margin: "auto",
                    background: "none",
                    display: "block",
                    shapeRendering: "auto"
                }}
                width="33px"
                height="33px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <g transform="rotate(0 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="-0.5360623781676412s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
                <g transform="rotate(30 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="-0.48732943469785567s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
                <g transform="rotate(60 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="-0.4385964912280701s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
                <g transform="rotate(90 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="-0.3898635477582845s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
                <g transform="rotate(120 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="-0.34113060428849895s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
                <g transform="rotate(150 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="-0.2923976608187134s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
                <g transform="rotate(180 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="-0.24366471734892783s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
                <g transform="rotate(210 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="-0.19493177387914226s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
                <g transform="rotate(240 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="-0.1461988304093567s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
                <g transform="rotate(270 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="-0.09746588693957113s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
                <g transform="rotate(300 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="-0.048732943469785565s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
                <g transform="rotate(330 50 50)">
                    <rect
                        x="47"
                        y="24"
                        rx="3"
                        ry="3"
                        width="6"
                        height="12"
                        fill={circleLoaderColor}
                    >
                        <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur="0.5847953216374269s"
                            begin="0s"
                            repeatCount="indefinite"
                        ></animate>
                    </rect>
                </g>
            </svg>
        );

        switch (this.props.type) {
            case "color-switch":
                content = this.props.label;
                break;
            case "disable":
                content = this.props.label;
                break;
            case "error":
                content = (
                    <div className="icon-container">
                        <img
                            className="icon"
                            src="https://i.ibb.co/7kTmm6Z/close-1.png"
                        />
                    </div>
                );
                break;
            case "circle-loader":
                content = svg;
                break;
            case "range-loader":
                break;
            case "success":
                content = (
                    <img
                        className="icon"
                        src="https://i.ibb.co/HtVFr5c/success.png"
                    />
                );
                break;
            case "circle-loader-color-switch":
                content = svg;
                break;
            case "refresh":
                content = (
                    <img
                        className="icon"
                        src="https://i.ibb.co/0KwcGPf/refresh.png"
                    />
                );
                break;
            case "reload":
                content = (
                    <img
                        className="icon"
                        src="https://i.ibb.co/P4fWGt5/reload.png"
                    />
                );
                break;
            case "success-color-switch":
                content = (
                    <img
                        className="icon"
                        src="https://i.ibb.co/Z6dR9nG/success-1.png"
                    />
                );
                break;
            default:
                content = this.props.label;
        }
        return (
            <ButtonContainer>
                <div
                    onClick={this.props.onClick}
                    style={style}
                    className={`button ${buttonType} ${this.props.className}`}
                >
                    {content}
                </div>
            </ButtonContainer>
        );
    }
}
