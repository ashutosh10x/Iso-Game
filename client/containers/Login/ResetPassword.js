import React from "react";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import { Validations } from "../../validations";
import axiosInstance from "../../config/axios";
import LoginContainer from "./styles";

export default class SendOtpForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.validations = new Validations();
        this.state = {
            fields: ["password", "confirmPassword"],
            password: "",
            confirmPassword: "",
            errors: this.validations.errors,
            passwordMatch: true
        };
        this.resetPassword = this.resetPassword.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handlePasswordMatch = this.handlePasswordMatch.bind(this);
    }

    handlePasswordMatch() {
        let value;
        if (this.state.password == this.state.confirmPassword) value = true;
        else value = false;
        this.setState({ passwordMatch: value });
    }

    changeHandler(e, key) {
        e.stopPropagation();
        this.setState({
            [key]: e.target.value
        });
    }

    handleBlur(e) {
        e.stopPropagation();
        const errors = this.validations.validate(e.target.name, e.target.value);
        this.setState({
            errors
        });
    }

    resetPassword() {
        axiosInstance
            .post("/api/submit-otp", { password: this.state.password })
            .then(res => {
                if (res.status == 200) {
                }
            });
    }

    clickHandler() {
        let errors = null;
        this.state.fields.forEach(field => {
            const fieldValue = this.state[field];
            errors = this.validations.validate(
                field,
                fieldValue,
                this.state.password
            );
        });
        this.setState(
            {
                errors
            },
            () => {
                if (!errors.password && !errors.confirmPassword) {
                    //this.resetPassword();
                    this.props.passwordChangeSuccessful();
                }
            }
        );
    }

    render() {
        return (
            <LoginContainer>
                <div className="reset-password-body">
                    <div className="title">Reset Password</div>
                    <div className="para">
                        Wohoo! your OTP has been verified successfully. Your
                        Registered Phone is {this.props.phone}.
                    </div>
                    <InputBox
                        label="New Password"
                        placeholder="Set your new password"
                        onChange={e => {
                            this.changeHandler(e, "password");
                        }}
                        type="password"
                        onBlur={this.handleBlur}
                        error={this.state.errors && this.state.errors.password}
                        value={this.state.password}
                    />
                    <InputBox
                        label="Confirm Password"
                        placeholder="Confirm your new password"
                        onChange={e => {
                            this.changeHandler(e, "confirmPassword");
                        }}
                        type="password"
                        onBlur={this.handlePasswordMatch}
                        error={
                            this.state.errors &&
                            this.state.errors.confirmPassword
                        }
                        value={this.state.confirmPassword}
                    />
                    <Button
                        label="Reset My Password"
                        onClick={this.clickHandler}
                        width="212px"
                        className="reset-password-btn"
                    />
                </div>
            </LoginContainer>
        );
    }
}
