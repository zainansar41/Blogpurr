import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './profile.css'
import BlogWriteBTN from '../../components/blogwriteBTN/BlogWriteBTN'

import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import useFetch from '../../hooks/fetch.hook'
import { toast, Toaster } from 'react-hot-toast'
import {updateProfile} from '../../helpers/verify'




export default function Profile() {

    const navigate = useNavigate()

    const [{ isLoading, apiData, serverError }] = useFetch()


    const formik = useFormik({
        initialValues: {
            firstname: apiData?.firstname.S || '',
            lastname: apiData?.lastname.S ||'',
            twitter: apiData?.twitter.S ||'',
            email:  apiData?.Email.S ||'',
            instagram: apiData?.instagram.S ||'',
            facebook: apiData?.facebook.S ||''

        },
        enableReinitialize: true,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let updatePromise = updateProfile(values)
            toast.promise(updatePromise,{
                loading:"Updating ...!",
                success:"Update successful.... ",
                error:"Error in Updating"
            })
            updatePromise.then(result=>{
            })
        }
    })

    return (
        <>
            <Toaster containerStyle={{zIndex:99999}} position='top-center'></Toaster>
            <Navbar />
            <div className="parent">
                <div class="container">
                    <div class="title">Your Information</div>
                    <div class="content">
                        <form action="" onSubmit={formik.handleSubmit}>
                            <div class="user-details">
                                <div class="input-box">
                                    <span class="details">First Name</span>
                                    <input {...formik.getFieldProps('firstname')} type="text" placeholder="Enter your First name"  />
                                </div>
                                <div class="input-box">
                                    <span class="details">Last Name</span>
                                    <input {...formik.getFieldProps('lastname')} type="text" placeholder="Enter your Last username"  />
                                </div>
                                <div class="input-box">
                                    <span class="details">Email</span>
                                    <input {...formik.getFieldProps('email')} type="text" placeholder="Enter your email" readOnly />
                                </div>
                                <div class="input-box">
                                    <span class="details">Instagram</span>
                                    <input {...formik.getFieldProps('instagram')} type="text" placeholder="Your Instagram"  />
                                </div>
                                <div class="input-box">
                                    <span class="details">Twitter</span>
                                    <input {...formik.getFieldProps('twitter')} type="text" placeholder="Your Twitter"  />
                                </div>
                                <div class="input-box">
                                    <span class="details">Facebook</span>
                                    <input {...formik.getFieldProps('facebook')} type="text" placeholder="Your Facebook"  />
                                </div>
                            </div>

                            <div class="button">
                                <input type="submit" value="Update" />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            <div className="div"><BlogWriteBTN/></div>
        </>
    )
}
