import React from 'react'
import './signup.css'

import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import { passwordValidate, isValidEmail } from '../../helpers/helper'
import { registerUser } from '../../helpers/verify'

export default function Signup() {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            if (values.email !== "" && isValidEmail(values.email)) {
                try {
                    let result = await registerUser(values);
                    if (result.msg === "You has been register successfully") {
                        toast.success("You has been register successfully");
                        navigate("/");
                    }
                    else if (result.error === 'email is already taken') {
                        toast.error("Email is Already taken");

                    }
                } catch (error) {
                    toast.error("Email is Already taken");
                }
            } else {
                toast.error("Email is required");
            }
        }
    })
    return (
        <section>
            <Toaster position='top-center'></Toaster>

            <div className="login-root">
                <div className="box-root flex-flex flex-direction--column" style={{ minHeight: "100vh", flexGrow: 1 }}>
                    <div className="loginbackground box-background--white padding-top--64">
                        <div className="loginbackground-gridContainer">
                            <div className="box-root flex-flex" style={{ gridArea: "top / start / 8 / end" }}>
                                <div className="box-root"
                                    style={{ backgroundImage: "linear-gradient(white 0%, rgb(247, 250, 252) 33%)", flexGrow: 1 }}>
                                </div>
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: " 4 / 2 / auto / 5" }}>
                                <div className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                                    style={{ flexGrow: 1 }}></div>
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: "6 / start / auto / 2" }}>
                                <div className="box-root box-background--blue800" style={{ flexGrow: 1 }}></div>
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: "7 / start / auto / 4" }}>
                                <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }}></div>
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: "8 / 4 / auto / 6" }}>
                                <div className="box-root box-background--gray100 animationLeftRight tans3s"
                                    style={{ flexGrow: 1 }}></div>
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: "2 / 15 / auto / end" }}>
                                <div className="box-root box-background--cyan200 animationRightLeft tans4s"
                                    style={{ flexGrow: 1 }}></div>
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: "3 / 14 / auto / end" }}>
                                <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: 1 }}></div>
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: "4 / 17 / auto / 20" }}>
                                <div className="box-root box-background--gray100 animationRightLeft tans4s"
                                    style={{ flexGrow: 1 }}></div>
                            </div>
                            <div className="box-root flex-flex" style={{ gridArea: "5 / 14 / auto / 17" }}>
                                <div className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                                    style={{ flexGrow: 1 }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="box-root padding-top--24 flex-flex flex-direction--column"
                        style={{ flexGrow: 1, zIndex: 9 }}>
                        <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                            <h1><p>User SignUp</p></h1>
                        </div>
                        <div className="box-root flex-flex flex-justifyContent--center error">
                        </div>
                        <div className="formbg-outer">
                            <div className="formbg">
                                <div className="formbg-inner padding-horizontal--48">
                                    <span className="padding-bottom--15">Create A New Account</span>

                                    <form id="stripe-login" onSubmit={formik.handleSubmit}>
                                        <div className="field padding-bottom--24">
                                            <label for="email">Email</label>
                                            <input {...formik.getFieldProps('email')} type="email" name="email" placeholder="Enter your Email" />
                                        </div>

                                        <div className="field padding-bottom--24">
                                            <div className="grid--50-50">
                                                <label for="password">Password</label>
                                                {/* <div className="reset-pass">
                                                    <Link className='link' to={"/"}>Forgot your password?</Link>
                                                </div> */}
                                            </div>
                                            <input {...formik.getFieldProps('password')} type="password" name="password" placeholder="Enter your password"
                                                minlength="6" />
                                        </div>

                                        <div className="field padding-bottom--24">
                                            <input style={{ background: "blue" }} to={"/"} type="submit" value="Sign Up" />
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="footer-link padding-top--24">
                                <span>Already Have an account? <Link to={'/login'} style={{ color: "blue", cursor: "pointer" }}> Login </Link></span>
                                <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                    <span><Link className='link' to={"/"}>Contact</Link></span>
                                    <span><Link className='link' to={"/"}>Privacy & terms</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
