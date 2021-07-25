import React from "react";
import AnimatedInputStyles from "./AnimatedInputStyles";
import { FormInput } from "shards-react";

export default class AnimatedInputs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            changing: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onChange();
        this.setState({ changing: true });
    }

    handleClick() {
        this.setState({ focus: true });
    }

    handleBlur() {
        this.setState({ focus: false });
    }

    render() {
        let className = this.props.type;
        let input;

        switch (this.props.type) {
            default:
                input = (
                    <FormInput
                        value={this.props.value}
                        onChange={this.handleChange}
                        className={`input-area ${className} ${
                            this.state.focus ? "focus" : ""
                        }`}
                    />
                );
        }

        return (
            <AnimatedInputStyles>
                <div
                    onClick={this.handleClick}
                    onBlur={this.handleBlur}
                    className="animated-input-container"
                >
                    <div className={`label ${this.state.focus ? "focus" : ""}`}>
                        {this.props.label}
                    </div>
                    <img
                        className={`icon ${this.state.focus ? "focus" : ""}`}
                        src={
                            this.state.changing
                                ? "https://i.ibb.co/RC3rqgx/email-icon-focus.png"
                                : "https://i.ibb.co/fSGDGMx/email-icon-blur.png"
                        }
                    />
                    {input}
                </div>
            </AnimatedInputStyles>
        );
    }
}
