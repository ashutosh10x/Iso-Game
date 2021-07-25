import React from 'react'
import { FormInput, FormSelect, FormCheckbox } from 'shards-react'
import InputBoxContainer from './styles'

export default class InputBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      passwordVisibility: true,
    }
    this.visibilityHandler = this.visibilityHandler.bind(this)
  }

  visibilityHandler() {
    let visibility = this.state.passwordVisibility
    this.setState({
      passwordVisibility: !visibility,
    })
  }

  render() {
    let display
    let type = this.props.type
    let show_password = (
      <svg
        aria-hidden="true"
        //class="stUf5b"
        fill="#8fa4b8"
        focusable="false"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="https://www.w3.org/2000/svg"
        onClick={this.visibilityHandler}
      >
        <path d="M10.58,7.25l1.56,1.56c1.38,0.07,2.47,1.17,2.54,2.54l1.56,1.56C16.4,12.47,16.5,12,16.5,11.5C16.5,9.02,14.48,7,12,7 C11.5,7,11.03,7.1,10.58,7.25z"></path>
        <path d="M12,6c3.79,0,7.17,2.13,8.82,5.5c-0.64,1.32-1.56,2.44-2.66,3.33l1.42,1.42c1.51-1.26,2.7-2.89,3.43-4.74 C21.27,7.11,17,4,12,4c-1.4,0-2.73,0.25-3.98,0.7L9.63,6.3C10.4,6.12,11.19,6,12,6z"></path>
        <path d="M16.43,15.93l-1.25-1.25l-1.27-1.27l-3.82-3.82L8.82,8.32L7.57,7.07L6.09,5.59L3.31,2.81L1.89,4.22l2.53,2.53 C2.92,8.02,1.73,9.64,1,11.5C2.73,15.89,7,19,12,19c1.4,0,2.73-0.25,3.98-0.7l4.3,4.3l1.41-1.41l-3.78-3.78L16.43,15.93z M11.86,14.19c-1.38-0.07-2.47-1.17-2.54-2.54L11.86,14.19z M12,17c-3.79,0-7.17-2.13-8.82-5.5c0.64-1.32,1.56-2.44,2.66-3.33 l1.91,1.91C7.6,10.53,7.5,11,7.5,11.5c0,2.48,2.02,4.5,4.5,4.5c0.5,0,0.97-0.1,1.42-0.25l0.95,0.95C13.6,16.88,12.81,17,12,17z"></path>
      </svg>
    )
    let hide_password = (
      <svg
        aria-hidden="true"
        //class="stUf5b"
        fill="#8fa4b8"
        focusable="false"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="https://www.w3.org/2000/svg"
        onClick={this.visibilityHandler}
      >
        <path d="M12,7c-2.48,0-4.5,2.02-4.5,4.5S9.52,16,12,16s4.5-2.02,4.5-4.5S14.48,7,12,7z M12,14.2c-1.49,0-2.7-1.21-2.7-2.7 c0-1.49,1.21-2.7,2.7-2.7s2.7,1.21,2.7,2.7C14.7,12.99,13.49,14.2,12,14.2z"></path>
        <path d="M12,4C7,4,2.73,7.11,1,11.5C2.73,15.89,7,19,12,19s9.27-3.11,11-7.5C21.27,7.11,17,4,12,4z M12,17 c-3.79,0-7.17-2.13-8.82-5.5C4.83,8.13,8.21,6,12,6s7.17,2.13,8.82,5.5C19.17,14.87,15.79,17,12,17z"></path>
      </svg>
    )
    switch (type) {
      case 'checkbox':
        display = (
          <FormCheckbox
            checked={this.props.checked}
            onChange={this.props.onChange}
          />
        )
        break
      case 'select':
        let options =
          this.props.options &&
          this.props.options.map((ele, index) => {
            return (
              <option
                value={(ele.id && ele.id.toString()) || index.toString()}
                key={index}
              >
                {ele.name}
              </option>
            )
          })
        this.props.options &&
          this.props.options.splice &&
          !this.props.noplaceholder &&
          options.splice(
            0,
            0,
            <option value="">{this.props.selectPlaceholder}</option>,
          )

        display = (
          <FormSelect
            size={this.props.size}
            className={this.props.className}
            required={this.props.required}
            value={this.props.value}
            onChange={this.props.onChange}
            name={this.props.name}
            invalid={this.props.error && this.props.error !== '' ? true : false}
          >
            {options}
          </FormSelect>
        )
        break
      default:
        display = (
          <>
            <FormInput
              size={this.props.size}
              className={this.props.className}
              onChange={(e) => {
                this.props.onChange(e)
              }}
              onKeyPress={this.props.onKeyPress}
              value={this.props.value}
              invalid={
                this.props.error && this.props.error !== '' ? true : false
              }
              onBlur={this.props.onBlur}
              name={this.props.name}
              placeholder={this.props.placeholder}
              type={
                this.props.type == 'password' && this.state.passwordVisibility
                  ? 'password'
                  : 'text'
              }
              pattern={this.props.pattern}
              required={this.props.required}
              disabled={this.props.disabled}
            />
            {this.props.type == 'password'
              ? this.state.passwordVisibility
                ? hide_password
                : show_password
              : null}
          </>
        )
    }
    let ifCheck =
      this.props.type == 'checkbox' ? (
        display
      ) : (
        <div className="input-container">
          <div className="label-container">
            <div className={`label ${this.props.error ? 'error-label' : ''}`}>
              {this.props.label}
            </div>
            <div
              onClick={this.props.onClick}
              style={{ cursor: 'pointer' }}
              className="altLabel"
            >
              {this.props.altLabel}
            </div>
          </div>
          {display}
          <div
            className={`${
              this.props.type == 'password' && this.props.passwordMatch
                ? 'success-msg'
                : 'error-msg'
            }`}
          >
            {this.props.error}
          </div>
        </div>
      )
    return <InputBoxContainer>{ifCheck}</InputBoxContainer>
  }
}
