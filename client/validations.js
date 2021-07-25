import isAlpha from "validator/lib/isAlpha";
import isEmail from "validator/lib/isEmail";
import isNumeric from "validator/lib/isNumeric";

export class Validations {
    constructor() {
        this.errors = {
            name: null,
            lastname: null,
            full_name: null,
            city: null,
            email: null,
            phone: null,
            password: null,
            className: null,
            query: null,
            emailForPopUp: null
        };
    }

    validate(fieldName, fieldValue, confirmPassword) {
        if (!fieldValue.trim().length) {
            this.errors[fieldName] =
                "This field is required and can not be blank";
            return this.errors;
        } else {
            this.errors[fieldName] = null;
            if (fieldName != "password" && fieldName != "confirmPassword")
                fieldValue = fieldValue.trim();
        }
        let regex;
        switch (fieldName) {
            case "name":
                if (!isAlpha(fieldValue)) {
                    this.errors[fieldName] =
                        "Only alphabets are allowed as part of this field";
                } else {
                    this.errors[fieldName] = null;
                }
                break;
            case "lastname":
                regex = /^[a-zA-Z][a-zA-Z\.]*$/;
                if (!regex.test(fieldValue)) {
                    this.errors[fieldName] =
                        "Only alphabets are allowed as part of this field";
                } else {
                    this.errors[fieldName] = null;
                }
                break;
            case "full_name":
                regex = /[\sa-z]+/i;
                if (!regex.test(fieldValue)) {
                    this.errors[fieldName] =
                        "Only alphabets and a space are allowed as part of this field";
                } else {
                    this.errors[fieldName] = null;
                }
                break;
            case "child_name":
                regex = /[\sa-z]+/i;
                if (!regex.test(fieldValue)) {
                    this.errors[fieldName] =
                        "Only alphabets and a space are allowed as part of this field";
                } else {
                    this.errors[fieldName] = null;
                }
                break;
            case "city":
                regex = /^[a-zA-Z ]*$/;
                if (!regex.test(fieldValue && fieldValue.trim())) {
                    this.errors[fieldName] =
                        "Only alphabets are allowed as part of this field";
                } else {
                    this.errors[fieldName] = null;
                }
                break;
            case "className":
                break;
            case "class_id":
                break;
            case "school":
                if (fieldValue.trim().length) {
                    this.errors[fieldName] = null;
                }
                break;
            case "email":
                if (!isEmail(fieldValue)) {
                    this.errors[fieldName] = "Invalid email format";
                } else {
                    this.errors[fieldName] = null;
                }
                break;
            case "emailForPopUp":
                if (!isEmail(fieldValue)) {
                    this.errors[fieldName] = "Invalid email format";
                } else if (
                    fieldValue.toLowerCase().indexOf("logiqids.com") >= 0
                ) {
                    this.errors[fieldName] =
                        "Sorry,please use a non-Logiqids email";
                } else {
                    this.errors[fieldName] = null;
                }
                break;
            case "phone":
                if (
                    !isNumeric(fieldValue) ||
                    fieldValue === "0000000000" ||
                    fieldValue === "9999999999"
                ) {
                    this.errors[fieldName] = "Invalid phone number";
                } else if (fieldValue[0] === "0") {
                    this.errors[fieldName] =
                        "Phone number can not start from 0";
                } else if (fieldValue.length !== 10) {
                    this.errors[fieldName] =
                        "10 digit numbers are only allowed";
                } else {
                    this.errors[fieldName] = null;
                }
                break;
            case "password":
                if (fieldValue.indexOf(" ") !== -1) {
                    this.errors[fieldName] =
                        "Spaces are not allowed in the password";
                } else if (fieldValue.length < 6) {
                    this.errors[fieldName] =
                        "Minimum 6 characters password is allowed";
                } else {
                    this.errors[fieldName] = null;
                }
                break;
            case "confirmPassword":
                if (fieldValue != confirmPassword) {
                    this.errors[fieldName] = "Your password does not match";
                } else {
                    this.errors[fieldName] = null;
                }
                break;
            case "query":
                if (fieldValue.trim().length) {
                    this.errors[fieldName] = null;
                }
                break;
            case "queryText":
                if (fieldValue.trim().length) {
                    this.errors[fieldName] = null;
                }
                break;
            case "address1":
                if (fieldValue.trim().length) {
                    this.errors[fieldName] = null;
                }
                break;
            case "pincode":
                if (!isNumeric(fieldValue)) {
                    this.errors[fieldName] =
                        "Only numeric values are allowed for this field";
                } else if (fieldValue.length !== 6) {
                    this.errors[fieldName] = "Pincode has to be 6 digits long";
                } else {
                    this.errors[fieldName] = null;
                }
                break;
            case "emailPhone":
                if (isNumeric(fieldValue)) {
                    if (
                        !isNumeric(fieldValue) ||
                        fieldValue === "0000000000" ||
                        fieldValue === "9999999999"
                    ) {
                        this.errors[fieldName] = "Invalid phone number";
                    } else if (fieldValue[0] === "0") {
                        this.errors[fieldName] =
                            "Phone number can not start from 0";
                    } else if (fieldValue.length !== 10) {
                        this.errors[fieldName] =
                            "10 digit numbers are only allowed";
                    } else {
                        this.errors[fieldName] = null;
                    }
                } else if (isAlpha(fieldValue)) {
                    if (!isEmail(fieldValue)) {
                        this.errors[fieldName] = "Invalid email format";
                    } else {
                        this.errors[fieldName] = null;
                    }
                }
                break;
            case "url":
                let exp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                let regexp = new RegExp(exp);
                if (regexp.test(fieldValue)) {
                    this.errors[fieldName] = null;
                } else {
                    this.errors[fieldName] = "Invalid URL";
                }
                break;
            default:
                regex = /[\sa-z]+/i;
                if (!regex.test(fieldValue)) {
                    this.errors[fieldName] =
                        "Only alphabets and a space are allowed as part of this field";
                } else {
                    this.errors[fieldName] = null;
                }
        }
        return this.errors;
    }

    allNullKeyValue(object) {
        const keys = Object.keys(object);
        const keysLength = keys.length;
        for (let i = 0; i < keysLength; i += 1) {
            if (object[keys[i]]) {
                return false;
            }
        }
        return true;
    }
}
