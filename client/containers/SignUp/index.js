import React from 'react'
import InputBox from '../../components/InputBox'
import Button from '../../components/Button'
import SignUpContainer from './styles'
import { Validations } from '../../validations'
import VerifyOtp from '../../components/Otp'
import axiosInstance from '../../config/axios'
import Lottie from 'lottie-react-web'
import checkedDone from './checked-done.json'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import { LoginAuthRedirector } from '../../hoc/redirector'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.validations = new Validations()
    this.state = {
      fields: [
        'full_name',
        'phone',
        'email',
      ],
      otpSent: false,
      otpVerified: false,
      full_name: '',
      phone: '',
      email: '',
      checked: false,
      errors: this.validations.errors,
      termsAccepted: true,
      directOtp: false,
      preBooked: false,
      modal: false,
      loader: true,
      account_already_exists: null,
    }
  }

  componentDidMount() {
    this.setState({ loader: false })
  }

  resetOtpSent = () => {
    this.setState({ otpSent: false })
  }

  addParent = () => {
    axiosInstance
      .post('/api/signup/add-parent', {
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        name: this.state.full_name,
          
      })
      .then((res) => {
        if (res.status == 200) {
          this.preBook()
        }
      })
      .catch((err) => {
        this.setState({
          backendErrorLeads:
            (err.response && err.response.data && err.response.data.error) ||
            'Something Went Wrong',
        })
      })
  }

  getClassList = () => {
    axiosInstance
      .get('/api/class-list')
      .then((res) => {
        if (res.status == 200) {
          this.setState({
            classList: res.data,
            backendErrorClassList: null,
          })
        }
      })
      .catch((err) => {
        this.setState({
          backendErrorClassList:
            (err.response && err.response.data && err.response.data.error) ||
            'Something Went Wrong',
        })
      })
  }

  handleCheck = () => {
    let value = !this.state.checked
    this.setState({
      checked: value,
      termsAccepted: value,
    })
  }

  changeHandler = (e) => {
    let errors = Object.assign({}, this.state.errors, {
      [e.target.name]: null,
    })
    this.setState({
      [e.target.name]: e.target.value,
      errors,
      account_already_exists: null,
    })
  }

  handleBlur = (e) => {
    const errors = this.validations.validate(e.target.name, e.target.value)
    this.setState({
      errors,
    })
  }

  otpVerification = () => {
    this.setState(
      {
        otpVerified: true,
      },
      this.addParent
    )
  }

  preBookClickHandler = () => {
    let errors = null
    ;['child_name', 'city', 'school', 'class_id'].forEach((field) => {
      const fieldValue = this.state[field]
      errors = this.validations.validate(field, fieldValue)
    })
    this.setState(
      {
        errors,
      },
      () => {
        if (
          !errors.child_name &&
          !errors.city &&
          !errors.school &&
          !errors.class_id
        ) {
          this.saveLeads()
        }
      },
    )
  }

  preBook = () => {
    this.setState(
      {
        preBooked: true,
        backendErrorLeads: null,
      },
      () => {
        setTimeout(() => {
          this.props.login({
            identifier: this.state.phone,
            password: this.state.password,
          })
        }, 5000)
      },
    )
  }

  checkIfAccountExists = () => {
    axiosInstance
      .post('/api/signup/check-if-account-exists', {
        email: this.state.email,
        phone: this.state.phone,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data)
          this.setState(
            {
              account_already_exists: 
                res.data.email_exists?
                  "Email already exists":
                  res.data.phone_exists?
                    "Phone already exists":
                    null,
            },
            ()=>{
              console.log(this.state.account_already_exists)
              if(!this.state.account_already_exists){
                this.getOtp()
              }
            }
          )
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error)
          this.setState({ account_already_exists: err.response.data.error })
      })
  }

  clickHandler = () => {
    let errors = null
    ;['full_name', 'phone', 'email'].forEach((field) => {
      const fieldValue = this.state[field]
      errors = this.validations.validate(field, fieldValue)
    })
    this.setState(
      {
        errors,
      },
      () => {
        if (!this.state.checked) this.setState({ termsAccepted: false })
        if (
          !errors.phone &&
          !errors.full_name &&
          !errors.email &&
          this.state.checked
        )
          this.checkIfAccountExists()
      },
    )
  }

  getOtp = () => {
    axiosInstance
      .post('/api/signup/send-otp', {
        identifier: this.state.phone,
      })
      .then((res) => {
        if (res.status == 200) {
          this.setState({ otpSent: true, backendErrorSendOtp: null })
        }
      })
      .catch((err) => {
        this.setState({
          backendErrorSendOtp:
            (err.response && err.response.data && err.response.data.error) ||
            'Something Went Wrong',
        })
      })
  }

  render() {
    let display = this.state.otpSent ? (
      this.state.otpVerified ? (
          <div className="congratulations-body">
            {/* <Confetti /> */}
            <Lottie
              options={{
                loop: true,
                animationData: checkedDone,
              }}
              height="50%"
            />
            <div className="title">Congratulations!</div>
            {/* <div className="para">
              You have unlocked early bird access to CodeLQ Platform. Please
              enter your child details to pre book.
            </div> */}
          </div>
         
      ) : (
        <VerifyOtp
          resetOtpSent={this.resetOtpSent}
          full_name={this.state.full_name}
          phone={this.state.phone}
          otpVerification={this.otpVerification}
          updatePassword={(password) => {
            this.setState({ password })
          }}
          askPassword
          activity="SignUp"
        />
      )
    ) : (
      <>
        <div className="already-member">
          Already a member?{' '}
          <Link to="/login">
            <span style={{ color: '#27debf' }}>Sign in</span>
          </Link>
        </div>
        <div className="title">Sign up to CodeLQ</div>
        {/* <div className="signup-options">
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
          label="Full Name"
          value={this.state.full_name}
          name="full_name"
          onChange={this.changeHandler}
          onBlur={this.handleBlur}
          error={this.state.errors && this.state.errors.full_name}
          onKeyPress={(e) => {
            if (e.key == 'Enter') this.clickHandler()
          }}
        />
        <InputBox
          label="Email Address"
          value={this.state.email}
          name="email"
          onChange={this.changeHandler}
          onBlur={this.handleBlur}
          error={this.state.errors && this.state.errors.email}
          onKeyPress={(e) => {
            if (e.key == 'Enter') this.clickHandler()
          }}
        />
        <div className="with-code">
          <div className="country-code">+91</div>
          <InputBox
            label="Phone Number"
            name="phone"
            value={this.state.phone}
            onChange={this.changeHandler}
            onBlur={this.handleBlur}
            error={this.state.errors && this.state.errors.phone}
            onKeyPress={(e) => {
              if (e.key == 'Enter') this.clickHandler()
            }}
          />
        </div>

        <div className="terms-and-conditions">
          <InputBox
            checked={this.state.checked}
            onChange={this.handleCheck}
            type="checkbox"
          />
          <div className="content">
            Creating an account means you’re okay with our{' '}
            <span className="link">Terms of Service</span>,{' '}
            <span className="link">Privacy Policy</span>, and our default{' '}
            <span className="link">Notification Settings</span>
          </div>
        </div>

        <div className="error-msg">
          {!this.state.termsAccepted &&
            'You need to accept the terms and conditions'}
        </div>

        {this.state.backendErrorSendOtp && (
          <div className="backend-error-container">
            {this.state.backendErrorSendOtp}
          </div>
        )}

        {this.state.account_already_exists && (
          <div className="backend-error-container">
            {this.state.account_already_exists}
          </div>
        )}

        <Button label="GET OTP" width="212px" onClick={this.clickHandler} />
      </>
    )

    return (
      <SignUpContainer>
        {this.state.loader ? (
          <Loader size="100px" color="#27debf" />
        ) : (
          <div className="modal-logicode">
            {!this.props.isMobile && !this.state.preBooked && (
              <div className="left-section">
                <div className="data">
                  <img
                    src="https://i.ibb.co/pbdjp48/unnamed.png"
                    className="formimg"
                  />
                  <div className="first-line">Pre-Register For CodeLQ</div>
                  <div className="para">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,
                  </div>
                </div>
              </div>
            )}
            <div className="right-section">
              {this.state.modal && (
                <img
                  width="10px"
                  className="cross-icon"
                  src="https://i.ibb.co/yPT6x4x/close.png"
                  onClick={this.props.closeModal}
                />
              )}
              <div className="signup-body">{display}</div>
            </div>
          </div>
        )}
      </SignUpContainer>
    )
  }

  static getDerivedStateFromProps(props, state) {
    let obj = {}
    if (props.directOtp && state.phone != props.data.phone) {
      obj.otpSent = true
      console.log('IN GDSFP')
      console.log(props.data.phone)
      if (state.phone != props.data.phone) {
        obj.phone = props.data.phone
      }
      console.log(props.data.full_name)
      if (state.full_name != props.data.full_name) {
        obj.full_name = props.data.full_name
      }
      if (state.email != props.data.email) {
        obj.email = props.data.email
      }
    }
    return obj
  }
}

export default connect(null, actions)(LoginAuthRedirector(Signup))
