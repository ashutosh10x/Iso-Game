import React from "react";
import AnimatedInput from "./AnimatedInputs";

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        return (
            <AnimatedInput
                onChange={this.handleChange}
                value={this.state.value}
                label="Email id"
            />
        );
    }
}
