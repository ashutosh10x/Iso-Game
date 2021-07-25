import React from 'react'
import InputBox from '../InputBox'
import Button from '../Button'
import axiosInstance from '../../config/axios'
import OtpContainer from './styles'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { Validations } from '../../validations'

class Otp extends React.Component {
  constructor(props) {
    super(props)
    this.validations = new Validations()
    this.state = {
      retry: false,
      otp: '',
      timer: null,
      otpResent: false,
      error: null,
      api_loader: false,
      askPassword: false,
      password: '',
    }
    this.verifyOtp = this.verifyOtp.bind(this)
    this.resendOtp = this.resendOtp.bind(this)
    this.changeNumber = this.changeNumber.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.timerId
  }

  tick = () => {
    this.setState({ timer: this.state.timer - 1 })
  }

  resendOtp() {
    this.setState({
      otp: '',
    })
    axiosInstance
      .post('/api/signup/send-otp', {
        identifier: this.props.phone,
      })
      .then((res) => {
        if (res.data && res.data.data && res.status == 200) {
          if (res.data.data.message) {
            this.setState({
              otpResent: true,
              timer: null,
              backendErrorSendOtp: null,
            })
          } else {
            this.setState(
              {
                otpResent: false,
                timer: res.data.data.timer,
                backendErrorSendOtp: null,
              },
              () => {
                this.timerId = setInterval(() => {
                  if (this.state.timer > 0) this.tick()
                  else clearInterval(this.timerId)
                }, 1000)
              },
            )
          }
        }
      })
      .catch((err) => {
        this.setState({
          backendErrorSendOtp:
            (err.response && err.response.data && err.response.data.error) ||
            'Something went wrong. Please try again',
        })
      })
      .finally(() => {
        this.setState({ api_loader: false })
      })
  }

  changeNumber() {
    this.props.resetOtpSent()
  }

  verifyOtp() {
    if (this.state.otp) {
      if (this.props.verifyAndLogin) {
        this.props
          .login({
            identifier: this.props.phone,
            otp: this.state.otp,
          })
          .finally(() => {
            this.setState({ api_loader: false })
          })
      } else {
        axiosInstance
          .post('/api/signup/verify-otp', {
            identifier: this.props.phone,
            otp: this.state.otp,
          })
          .then((res) => {
            if (res.status == 200) {
              this.setState({ backendErrorSendOtp: null })
              if (this.props.askPassword) {
                this.setState({ askPassword: true })
              } else {
                this.props.otpVerification()
              }
            }
          })
          .catch((err) => {
            this.setState({
              backendErrorSendOtp:
                (err.response &&
                  err.response.data &&
                  err.response.data.error) ||
                'Something went wrong. Please try again.',
            })
          })
          .finally(() => {
            this.setState({ api_loader: false })
          })
      }
    } else {
      this.setState({ error: 'Please enter your OTP', api_loader: false })
    }
  }

  changeHandler(e) {
    //this.props.resetErrors()
    let error_type = this.state.askPassword ? 'password_error' : 'error'
    this.setState({
      [e.target.name]: e.target.value,
      [error_type]: null,
    })
  }

  savePassword = () => {
    let password_error = this.validations.validate(
      'password',
      this.state.password,
    )
    this.setState({ password_error: password_error.password }, () => {
      if (!this.state.password_error) {
        this.props.updatePassword(this.state.password)
        this.props.otpVerification()
      }
    })
  }

  handleBlur = () => {
    let password_error = this.validations.validate(
      'password',
      this.state.password,
    )
    this.setState({ password_error: password_error.password })
  }

  render() {
    let retry = this.state.askPassword
      ? 'OTP verified'
      : this.state.timer
      ? `Retry sending OTP in ${this.state.timer} seconds`
      : 'Resend OTP?'
    let title = this.state.askPassword
      ? 'Set a password for your account'
      : this.state.otpResent
      ? `OTP resent to ${this.props.phone}`
      : `Please enter the OTP sent to ${this.props.phone}`
    return (
      <OtpContainer>
        <div className="otp-body">
          <div className="title">{title}</div>
          <InputBox
            className="validate-otp"
            value={this.state.otp}
            onChange={this.changeHandler}
            label="Validate OTP"
            error={this.state.error}
            red={this.state.error}
            onKeyPress={(e) => {
              if (e.key == 'Enter') {
                this.setState({ api_loader: true }, this.verifyOtp)
              }
            }}
            disabled={this.state.askPassword}
            name="otp"
          />
          <div
            className={`resend-otp ${
              this.state.askPassword ? 'otp-verified' : ''
            }`}
            onClick={() => {
              if (!this.state.timer && !this.state.askPassword) {
                this.setState({ api_loader: true }, this.resendOtp)
              }
            }}
          >
            {retry}
          </div>

          {this.props.otpError ? (
            <div className="backend-error-container">
              {this.props.otpError}
            </div>
          ) : this.state.backendErrorSendOtp ? (
            <div className="backend-error-container">
              {this.state.backendErrorSendOtp}
            </div>
          ) : null}

          {this.state.askPassword ? (
            <>
              <InputBox
                value={this.state.password}
                name="password"
                type="password"
                onChange={this.changeHandler}
                label="Password"
                error={this.state.password_error}
                red={this.state.password_error}
                onBlur={this.handleBlur}
              />
              <Button
                width="212px"
                label="Save"
                onClick={this.savePassword}
                type={this.state.api_loader ? 'circle-loader' : ''}
              />
            </>
          ) : (
            <div className="start-change">
              <Button
                width="212px"
                label="Verify"
                onClick={() => {
                  this.setState({ api_loader: true }, this.verifyOtp)
                }}
                type={this.state.api_loader ? 'circle-loader' : ''}
              />
              <div className="change-number" onClick={this.changeNumber}>
                Change Number?
              </div>
            </div>
          )}
        </div>
      </OtpContainer>
    )
  }

  componentDidMount() {
    this.props.resetErrors()
    if (this.props.directVerify) {
      this.props.getOtp()
    }
  }
}

const mapStateToProps = (state) => {
  return { otpError: state.error }
}

export default connect(mapStateToProps, actions)(Otp)
