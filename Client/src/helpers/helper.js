import toast from "react-hot-toast"


export async function passwordValidate(values) {
    const errors = passwordVerify({}, values)
    return errors
}

function passwordVerify(error = {}, values) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!values.password) {
        error.password = toast.error("Password Required ...!")
    } else if (values.password.includes(" ")) {
        error.password = toast.error("password pasword ...!")
    }
    else if (values.password.length <= 4) {
        error.password = toast.error("password cannot be less than 4 characters")
    }
    else if (!specialChars.test(values.password)) {
        error.password = toast.error("password must have special character")
    }
    return error
}

export function isValidEmail(email) {
    // regular expression to match email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors
}
function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required...!");
    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email...!")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}