import React from 'react'
import InputBox from '../InputBox'
import Button from '../Button'
import { Validations } from '../../validations'
import axiosInstance from '../../config/axios'
import OtpContainer from './styles'

export default class SendOtpForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.validations = new Validations()
    this.state = {
      fields: ['emailPhone'],
      emailPhone: this.props.phone,
      errors: this.validations.errors,
      api_loader: false,
    }
    this.getOtp = this.getOtp.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  changeHandler(e) {
    e.stopPropagation()
    let errors = Object.assign({}, this.state.errors, { emailPhone: null })
    this.setState({
      emailPhone: e.target.value,
      backendError: null,
      errors,
    })
  }

  handleBlur(e) {
    e.stopPropagation()
    const errors = this.validations.validate(e.target.name, e.target.value)
    this.setState({
      errors,
    })
  }

  getOtp() {
    axiosInstance
      .post('/api/signup/send-otp', {
        identifier: this.state.emailPhone,
        activity: this.props.activity,
      })
      .then((res) => {
        if (res.status == 200) {
          this.props.otpSent()
          this.props.setPhone(this.state.emailPhone)
          this.setState({ backendError: null })
        }
      })
      .catch((err) => {
        this.setState({
          backendError:
            (err.response && err.response.data && err.response.data.error) ||
            'Something Went Wrong',
        })
      })
      .finally(() => {
        this.setState({ api_loader: false })
      })
  }

  clickHandler() {
    let errors = null
    this.state.fields.forEach((field) => {
      const fieldValue = this.state[field]
      errors = this.validations.validate(field, fieldValue)
    })
    this.setState(
      {
        errors,
      },
      () => {
        if (!errors.emailPhone) {
          this.getOtp()
        } else {
          this.setState({ api_loader: false })
        }
      },
    )
  }

  render() {
    return (
      <OtpContainer>
        <div className="send-otp-body">
          <div className="title">{this.props.data.title}</div>
          <div className="para">{this.props.data.para}</div>
          <InputBox
            label="Phone Number / Email"
            placeholder="Enter Your Phone Number or Registered Email Address"
            onChange={this.changeHandler}
            onBlur={this.handleBlur}
            error={this.state.errors && this.state.errors.emailPhone}
            value={this.state.emailPhone}
            className="noMarginBottom"
            onKeyPress={(e) => {
              if (e.key == 'Enter') {
                this.setState({ api_loader: true }, this.clickHandler)
              }
            }}
          />
          {this.state.backendError && (
            <div className="backend-error-container" style={{ marginTop: 0 }}>
              {this.state.backendError}
            </div>
          )}
          <Button
            label={this.props.data.button}
            onClick={() => {
              this.setState({ api_loader: true }, this.clickHandler)
            }}
            type={this.state.api_loader ? 'circle-loader' : ''}
            width="212px"
            className="send-otp-btn"
          />
          <div className="go-back">
            Go back to{' '}
            <span
              onClick={this.props.resetLoginWithOtp}
              style={{ cursor: 'pointer', color: '#27debf' }}
            >
              CodeLQ/login
            </span>
          </div>
        </div>
      </OtpContainer>
    )
  }
}
