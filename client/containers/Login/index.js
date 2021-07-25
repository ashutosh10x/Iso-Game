import React from 'react'
import Button from '../../components/Button'
import InputBox from '../../components/InputBox'
import { Validations } from '../../validations'
import SendOtpForgotPassword from '../../components/Otp/SendOtp'
import VerifyOtp from '../../components/Otp'
import ResetPassword from './ResetPassword'
import axiosInstance from '../../config/axios'
import LoginContainer from './styles'
import Lottie from 'lottie-react-web'
import checkedDone from './checked-done.json'
import SignUp from '../SignUp'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Loader from '../../components/Loader'
import { LoginAuthRedirector } from '../../hoc/redirector'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.validations = new Validations()
    this.state = {
      fields: ['emailPhone', 'password'],
      emailPhone: '',
      password: '',
      errors: this.validations.errors,
      accountBlocked: false,
      loginWithOtp: false,
      otpSent: false,
      otpVerified: false,
      forgotPassword: false,
      forgotPasswordOtpSent: false,
      forgotPasswordOtpVerified: false,
      passwordChanged: false,
      loader: true,
      api_loader: false,
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.getOtp = this.getOtp.bind(this)
    this.resetOtpSent = this.resetOtpSent.bind(this)
    this.setStateValueTrue = this.setStateValueTrue.bind(this)
    this.setStateValueFalse = this.setStateValueFalse.bind(this)
  }

  componentDidMount() {
    this.props.resetErrors()
    this.setState({ loader: false })
  }

  setStateValueTrue(key) {
    this.setState({ [key]: true })
  }

  setStateValueFalse(key) {
    this.setState({ [key]: false })
  }

  getOtp() {
    let errors
    this.state.fields.forEach((field) => {
      let fieldValue = this.state[field]
      errors = this.validations.validate(field, fieldValue)
    })
    this.setState({ errors }, () => {
      if (this.state.errors && !this.state.errors.emailPhone) {
        axiosInstance
          .post('/api/signup/send-otp', {
            identifier: this.state.emailPhone,
            activity: 'Login',
          })
          .then((res) => {
            if (res.status == 200) {
              this.setStateValueTrue('otpSent')
              this.setStateValueTrue('loginWithOtp')
              this.setState({ backendError: null })
            }
          })
          .catch((err) => {
            this.setState({
              backendError:
                (err.response &&
                  err.response.data &&
                  err.response.data.error) ||
                'Something Went Wrong',
            })
          })
          .finally(() => {
            this.setState({ api_loader: false })
          })
      } else {
        this.setState({ api_loader: false })
      }
    })
  }

  resetOtpSent() {
    this.setState({ otpSent: false, emailPhone: '' })
  }

  changeHandler(e, key) {
    e.preventDefault()
    e.stopPropagation()
    let errors = Object.assign({}, this.state.errors, { [key]: null })
    this.props.resetErrors()
    this.setState({
      [key]: e.target.value,
      errors,
      backendError: null,
    })
  }

  handleBlur(e) {
    //e.preventDefault();
    e.stopPropagation()
    const errors = this.validations.validate(e.target.name, e.target.value)
    this.setState({
      errors,
    })
  }

  clickHandler(e) {
    let errors
    this.state.fields.forEach((field) => {
      let fieldValue = this.state[field]
      errors = this.validations.validate(field, fieldValue)
    })
    this.setState({ errors }, () => {
      if (!this.state.errors.emailPhone && !this.state.errors.password) {
        this.props
          .login({
            identifier: this.state.emailPhone,
            password: this.state.password,
          })
          .finally(() => {
            this.setState({ api_loader: false })
          })
      } else {
        this.setState({ api_loader: false })
      }
    })
  }

  render() {
    let sendOtpData = {
      title: 'Login With OTP',
      para:
        'Please enter the registered email address or phone number. You will receive OTP to verify on your registered email address or phone number.',
      button: 'Send OTP',
    }

    let forgotPasswordData = {
      title: 'Reset Your Password',
      para:
        'Please enter the registered email address or phone number. You will receive OTP to verify and then you can reset your password. ',
      button: 'Reset Your Password',
    }

    let display = this.state.loginWithOtp ? (
      this.state.otpSent ||
      (this.state.emailPhone && this.state.errors && !this.state.errors.emailPhone) ? (
        <VerifyOtp
          directVerify={
            this.state.emailPhone && this.state.errors && !this.state.errors.emailPhone
          }
          backendError={this.state.backendError}
          getOtp={this.getOtp}
          otpVerification={() => {
            this.setStateValueTrue('otpVerified')
          }}
          resetOtpSent={this.resetOtpSent}
          phone={this.state.emailPhone}
          activity="Login"
          verifyAndLogin
        />
      ) : (
        <SendOtpForgotPassword
          data={sendOtpData}
          otpSent={() => {
            this.setStateValueTrue('otpSent')
          }}
          resetLoginWithOtp={() => {
            this.setStateValueFalse('loginWithOtp')
          }}
          phone={this.state.emailPhone}
          setPhone={(emailPhone) => {
            this.setState({ emailPhone })
          }}
          activity="Login"
        />
      )
    ) : this.state.forgotPassword ? (
      this.state.forgotPasswordOtpSent ||
      (this.state.emailPhone && this.state.errors && !this.state.errors.emailPhone) ? (
        this.state.forgotPasswordOtpVerified ? (
          this.state.passwordChanged ? (
            <div className="congratulations-body">
              
              <div className="title">
                Congratulations Your Password has been Reset Successfully
              </div>
              <Lottie
                options={{
                  loop: false,
                  animationData: checkedDone,
                }}
                width="300px"
                height="300px"
              />
              <div className="go-back">
                Go back to{' '}
                <span
                  onClick={() => {
                    this.setState({
                      forgotPassword: false,
                      forgotPasswordOtpSent: false,
                      forgotPasswordOtpVerified: false,
                      passwordChanged: false,
                    })
                  }}
                  style={{
                    cursor: 'pointer',
                    color: '#f8811a',
                  }}
                >
                  CodeLQ/login
                </span>
              </div>
            </div>
          ) : (
            <ResetPassword
              passwordChangeSuccessful={(e) => {
                this.setStateValueTrue('passwordChanged')
              }}
              phone={this.state.emailPhone}
            />
          )
        ) : (
          <VerifyOtp
            directVerify={
              this.state.emailPhone && this.state.errors && !this.state.errors.emailPhone
            }
            backendError={this.state.backendError}
            getOtp={this.getOtp}
            otpVerification={() => {
              this.setStateValueTrue('forgotPasswordOtpVerified')
            }}
            resetOtpSent={() => {
              this.setState({
                forgotPasswordOtpSent: false,
                emailPhone: null,
              })
            }}
            phone={this.state.emailPhone}
            activity="Login"
          />
        )
      ) : (
        <SendOtpForgotPassword
          data={forgotPasswordData}
          otpSent={() => {
            this.setStateValueTrue('forgotPasswordOtpSent')
          }}
          resetLoginWithOtp={() => {
            this.setStateValueFalse('forgotPassword')
          }}
          phone={this.state.emailPhone}
          setPhone={(emailPhone) => {
            this.setState({ emailPhone })
          }}
        />
      )
    ) : (
      <>
        {/* <div className="new-to-logicode">
          New to CodeLQ?{' '}
          <Link to="/signup">
            <span style={{ color: '#27debf' }}>Sign up</span>
          </Link>
        </div> */}
        <div className="title">Great to see you again!</div>
        {/* <div className="login-options">
                    <div className="logiqids">
                        <img
                            className="logo"
                            src="https://i.ibb.co/yYcf4Lg/applogo.png"
                        />
                        <div className="name">
                            Sign up to{" "}
                            <span style={{ color: "#59c7e3" }}>LogI</span>
                            <span style={{ color: "#62be41" }}>Qids</span>
                        </div>
                    </div>
                    <div className="google">
                        <img
                            className="logo"
                            src="https://i.ibb.co/ydMPDW1/search-3x.png"
                        />
                    </div>
                </div>
                <div className="hr">
                    <div className="line" />
                    <div className="or">Or</div>
                    <div className="line" />
                </div> */}
        <InputBox
          className="width390"
          label="Phone Number / Email Id"
          value={this.state.emailPhone}
          name="emailPhone"
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              this.setState({ api_loader: true }, this.clickHandler)
            }
          }}
          onChange={(e) => {
            this.changeHandler(e, 'emailPhone')
          }}
          placeholder="Enter Your Phone Number / Email Id"
          onBlur={this.handleBlur}
          error={this.state.errors && this.state.errors.emailPhone}
          required
        />

        <InputBox
          className="width390"
          label="Password"
          // altLabel="Forgot Password?"
          // onClick={() => {
          //     this.setStateValueTrue("forgotPassword");
          // }}
          name="password"
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              this.setState({ api_loader: true }, this.clickHandler)
            }
          }}
          value={this.state.password}
          onChange={(e) => {
            this.changeHandler(e, 'password')
          }}
          placeholder="Enter Your Password"
          onBlur={this.handleBlur}
          type="password"
          error={this.state.errors && this.state.errors.password}
          required
        />

        {this.state.accountBlocked && (
          <div className="something-wrong">
            <div className="title">Something went wrong</div>
            <div className="para">
              Looks like your account is blocked due to security reasons Please
              contact us to unblock your account
            </div>
          </div>
        )}

        {this.props.loginError  ? (
          <div className="backend-error-container">
            {this.props.loginError}
          </div>
        ) : this.state.backendError ? (
          <div className="backend-error-container">
            {this.state.backendError}
          </div>
        ) : null}

        <Button
          className="login"
          label="LOGIN"
          onClick={() => {
            this.setState({ api_loader: true }, this.clickHandler)
          }}
          width="212px"
          type={this.state.api_loader ? 'circle-loader' : ''}
        />
        <div className="hr">
          <div className="line" />
          <div className="or">Or</div>
          <div className="line" />
        </div>
        <Button
          className="login-otp"
          label="Login with OTP"
          width="212px"
          type={
            this.state.api_loader
              ? 'circle-loader-color-switch'
              : 'color-switch'
          }
          onClick={() => {
            // this.setStateValueTrue("loginWithOtp");
            this.setState({ api_loader: true }, this.getOtp)
          }}
        />
      </>
    )
    return (
      <LoginContainer>
        {this.state.loader ? (
          <Loader size="100px" color="#27debf" />
        ) : (
          <div className="login-container">
            <div className="left-section">
              <div className="data">
                <div className="title">Did you know ?</div>
                <div className="computer-screen">
                  <img
                    src="https://lqcdndata.s3.ap-south-1.amazonaws.com/code-lq-images/login-signup/homepageicon-copy-3x.png"
                    height="350px"
                  />
                  <img
                    style={{
                      position: 'absolute',
                      left: 70,
                      top: 70,
                    }}
                    height="180px"
                    src="https://lqcdndata.s3.ap-south-1.amazonaws.com/logiqids-website-resources/logiqicode/demo.gif"
                  />
                </div>
                <div className="para">
                  Many of the people who shaped our digital world started out by
                  coding games for fun. For example, Steve Jobs and Steve
                  Wozniak, the co-founders of multinational technology company
                  Apple, began their coding careers as teenagers when they
                  created the arcade game Breakout.
                </div>
              </div>
            </div>
            <div className="right-section">
              {/* <div className="flying-rocket">
                            <img
                                className="dots"
                                src="https://i.ibb.co/P5WXLqy/bg-path.png"
                            />
                            <img
                                className="rocket"
                                src="https://i.ibb.co/jWmXGF7/yellowplane.png"
                            />
                        </div> */}
              {display}
            </div>
          </div>
        )}
      </LoginContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginError: state.error,
  }
}

export default connect(mapStateToProps, actions)(LoginAuthRedirector(Login))
