import React, { useContext, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';
import { ContextApi } from '../App';
import axios from 'axios';
import BASE_URL from '../api_url';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const ForgotPassword = () => {

    const navigate = useNavigate();


    const {
        setLoading,
        toaster,
        userDetails

    } = useContext(ContextApi);

    const [secret, setSecret] = useState('password')
    // const [pwd, setPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [otpfield, setOTPfield] = useState('');
    const [otp, setOtp] = useState('');
    const [mobno, setMobno] = useState('')

    const secrethandel = () => {
        if (secret === 'password') {
            setSecret('text')
        }
        else {
            setSecret('password')
        }
    }

    const handleMessage = () => {
        // if (mobno.length !== 10) {
        //     toaster('Invalid Mobile No, please enter a valid number');
        //     return;
        // }
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=27b58V4YOqBDMgWvNjapz1k9IHlrJfynC6w0hceRAZGoLimK3PuJC7OoiV4N2B6DjfwWKzb0lhgEetPH&variables_values=${otpfield}&route=otp&numbers=${mobno}`)
            .then((response) => {
                console.log(response);
                toaster('OTP sent successfully');
            })
            .catch(error => toaster('Something went wrong'));
    }

    const validatePassword = password => /[a-zA-Z]/.test(password) && /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

    const handleRegister = async () => {

        // if (otp !== otpfield) {
        //     toaster('Otp does not match')
        // }

        if (newPwd.length < 6) {
            toaster('Password must contain at least 6 characters!');
            return;
        }

        else if (validatePassword(newPwd) === false) {
            toaster('Password must contain letters and numbers or special symbols');
            return;
        }

        else {

            await axios.post(`${BASE_URL}/forgot_password`,
                { new_pwd: newPwd, mobno }).then(() => {
                    // setOtp('');
                    // setOTPfield('');
                    setMobno('');
                    setOTPfield('')
                    setOtp('')
                    setNewPwd('')
                    toaster('Password successfully updated!');
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000);
                })
                .catch(error => toaster('Some Error Occured'));
        }

    }

    console.log(otpfield);

    return (
        <>
            <div className="bg-white  after:contents-[' '] after:fixed h-screen ">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className="max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed bg-[brown] z-[9999] flex flex-wrap items-center  ">

                            <Link to={'/account'} className="w-[60px] h-[50px] left-0 text-center text-white text-[22px] absolute z-[2] flex justify-center items-center ">
                                <LiaAngleLeftSolid size={22} />
                            </Link>

                            <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-white ' >Change Login Password</h2>

                        </div>
                    </header>

                    <div className="m-[10px] p-[10px] relative">

                        <div className="mb-5 relative">

                            <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                <div className="flex items-center flex-wrap h-full text-center z-10">
                                    <p className='text-sm text-[#818393] mr-1'>+91</p>
                                </div>
                                <div className="flex items-center relative flex-1">
                                    <input onChange={e => { setMobno(e.target.value); setOTPfield(String(Math.floor(100000 + Math.random() * 900000))) }}
                                        type="number"
                                        name="mobno"
                                        id="mobno"
                                        className=' fillArea w-full h-[50px] text-base px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                        maxLength={11}
                                        size={11}
                                        placeholder=''
                                    />
                                    <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                    <label className='placeholder text-[#818393] text-sm left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>TEL</label>

                                </div>
                            </div>
                        </div>

                        <div className="mb-5 relative">

                            <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                <input onChange={e => { setNewPwd(e.target.value) }}
                                    type={secret}
                                    name="new password"
                                    id="new password"
                                    className='flex-1 fillArea w-full h-[50px] text-base px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                    placeholder=''

                                />
                                <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                <label className='placeholder text-[#818393] text-sm left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>New Password</label>
                                <div className={` right-[10px] h-full text-center bg-no-repeat bg-[center_center]  bg-[length:30px] z-10 `} onClick={secrethandel}>
                                    {
                                        secret === 'password' ?
                                            <AiFillEyeInvisible size={22} />
                                            :
                                            <AiFillEye size={22} />
                                    }
                                </div>

                            </div>
                        </div>

                        {/* <div className="mb-5 relative">

                            <div className="px-[10px] relative border-0 border-solid border-[rgba(215,215,215,0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                <input onChange={e => setOtp(e.target.value)}
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    className='flex-1 fillArea w-full h-[50px] text-base px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                    placeholder=''

                                />
                                <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                <label className='placeholder text-[#818393] text-sm left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Verification code (OTP)</label>
                                <div className={` right-[10px] h-full text-center bg-no-repeat bg-[center_center]  bg-[length:30px] z-10 `} onClick={handleMessage}>
                                    <p className='text-sm text-[rgba(52,86,255,0.9)]'>Send</p>
                                </div>

                            </div>
                        </div> */}

                        <div className="flex flex-wrap items-center my-10 w-full justify-end ">

                            <Link to={`/login`} className='text-[#1f3d70] bg-white border-[1px] border-[#1f3d70] h-11 leading-10 px-5 text-center text-base block border-solid rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative '>SIGN IN</Link>

                            <button className='ml-[10px] flex-1 text-white bg-[#00aa75] border-0 border-[rgba(215,215,215,0.6)] h-11 leading-10 px-5 text-center text-base block border-solid rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative ' onClick={handleRegister}>
                                Reset Password
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default ForgotPassword