import React from 'react'
import './login.css'


import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import { passwordValidate, isValidEmail } from '../../helpers/helper'
import { verifyPassword } from '../../helpers/verify'



export default function Login() {
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
                let result = await verifyPassword(values);
                if (result.error === "Email is not found ") {
                  toast.error("Email is not found ");
                } else if (result.error === "incorrect password") {
                  toast.error("incorrect password");
                } else if (result.msg === "You are Successfully Logged in") {
                  toast.success("You are Successfully Logged in");
                  navigate("/");
                }
              } catch (error) {
                toast.error("Password is incorrect or Try Sign Up");
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
                            <h1><p>User Login</p></h1>
                        </div>
                        <div className="box-root flex-flex flex-justifyContent--center error">
                        </div>
                        <div className="formbg-outer">
                            <div className="formbg">
                                <div className="formbg-inner padding-horizontal--48">
                                    <span className="padding-bottom--15">Login to your account</span>

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
                                            <input style={{ background: "blue" }} to={"/"} type="submit" value="Login" />
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div className="footer-link padding-top--24">
                                <span>Don't Have an account? <Link to={'/signup'} style={{ color: "blue", cursor: "pointer" }}> Sigup </Link></span>
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
