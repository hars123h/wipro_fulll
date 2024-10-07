import React, { useContext, useEffect, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { Link, useNavigate } from 'react-router-dom'
import { ContextApi } from '../App';
import axios from 'axios';
import BASE_URL from '../api_url';

const BankCardAdd = () => {

    const navigate = useNavigate();


    const { userDetails, setUserDetails, getUserDetails, user, toaster,setLoading } = useContext(ContextApi);

    const [details, setDetails] = useState(
        {
            fullName: '',
            bankAccount: '',
            ifsc: '',
            phoneNo:'',
            bankName:''
        }
    );
    const [pop, setpop] = useState(false);
    const [wpwd, setWpwd] = useState()


    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
        // console.log(details);
    }

    const handleSubmit = async () => {
        // console.log(userDetails.wpwd,wpwd);
        if (userDetails.wpwd === wpwd) {
            setLoading(true)
            await axios.post(`${BASE_URL}/bank_details`, { user_id: localStorage.getItem('uid'), bank_details: details })
                .then(() => {
                    setLoading(false)
                    toaster('Bank details added successfully!');
                    navigate('/account')
                })
                .catch(() => {setLoading(false); toaster('Some error Occured')}
                );
        } else {
            setLoading(false)
            toaster('Incorrect withdrawal password!');
        }
    }

    useEffect(() => {
        if (user) {
            getUserDetails()
        }
        else {
            toaster('Please login')
            setTimeout(() => {
                navigate('/')
            }, 3000);
        }
    }, [])

    return (
        <>

            {pop &&
                <div className="fixed top-0 right-0 left-0 bottom-0 z-[9999] p-5 flex flex-wrap justify-center items-center">

                    <div className="before:content-[''] fixed top-0 left-0 right-0 bottom-0 bg-[rgba(46,46,46,0.1)] z-[1] backdrop-blur-[3px]"></div>

                    <div className="max-w-[600px] w-full -top-[20%] relative mx-auto p-5 bg-white backdrop-blur-sm shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] z-[2] rounded-[15px]">
                        <div className="">

                            <h4 className='font-bold my-[5px] text-lg text-[#333]'>Trade Password</h4>

                            <div className="py-[5px] mb-5 relative">&nbsp;</div>

                            <div className="mb-5 relative">

                                <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                    <input
                                        onChange={e => setWpwd(e.target.value)}
                                        type="password"
                                        name="wpwd"
                                        id="wpwd"
                                        className='flex-1 fillArea w-full h-[50px] text-base leading-none px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                        placeholder='Please enter the trade password'

                                    />
                                    {/* <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div> */}
                                    {/* <label className='placeholder text-[#818393] text-sm leading-none left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Bank IFSC</label> */}

                                </div>
                            </div>

                            <div className="px-[5px] py-10 mb-5 relative">
                                <div className="flex flex-wrap items-stretch w-full ">

                                    <div onClick={() => setpop(!pop)} className="bg-[#818393] text-center flex-1 h-[45px] leading-[45px] px-5 text-base text-white block rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative  ">
                                        Cancel
                                    </div>

                                    <div onClick={handleSubmit} className="bg-[#00aa75] flex-1 text-center ml-[10px] h-[45px] leading-[45px] px-5 text-base text-white block rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative  ">
                                        Sure Add
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            }

            <div className="after:bg-white after:contents-[' '] after:fixed ">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block">
                        <div className="max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed bg-[brown] z-[999] flex flex-wrap items-center  ">

                            <Link to={'/account'} className="w-[60px] h-[50px] left-0 text-center text-white text-[22px] absolute z-[2] flex justify-center items-center ">
                                <LiaAngleLeftSolid size={22} />
                            </Link>

                            <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-white ' >Add BankCard</h2>

                        </div>
                    </header>

                    <div className="mx-auto relative z-[1]">

                        <div className="m-[10px] p-[10px] relative z-[2]">

                            <div className="mb-5 relative">

                                <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="ifsc"
                                        id="ifsc"
                                        className='flex-1 fillArea w-full h-[50px] text-base leading-none px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                        placeholder=''

                                    />
                                    <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                    <label className='placeholder text-[#818393] text-sm leading-none left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Bank IFSC</label>

                                </div>
                            </div>

                            <div className="mb-5 relative">

                                <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        className='flex-1 fillArea w-full h-[50px] text-base leading-none px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                        placeholder=''

                                    />
                                    <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                    <label className='placeholder text-[#818393] text-sm leading-none left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Card Holder</label>

                                </div>
                            </div>

                            <div className="mb-5 relative">

                                <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                    <input
                                        onChange={handleChange}
                                        type="number"
                                        name="bankAccount"
                                        id="bankAccount"
                                        className='flex-1 fillArea w-full h-[50px] text-base leading-none px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                        placeholder=''

                                    />
                                    <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                    <label className='placeholder text-[#818393] text-sm leading-none left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Bank Account No.</label>

                                </div>
                            </div>

                            <div className="mb-5 relative">

                                <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="phoneNo"
                                        id="phoneNo"
                                        className='flex-1 fillArea w-full h-[50px] text-base leading-none px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                        placeholder=''

                                    />
                                    <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                    <label className='placeholder text-[#818393] text-sm leading-none left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Phone Number</label>

                                </div>
                            </div>

                            <div className="mb-5 relative">

                                <div className="px-[10px] relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="bankName"
                                        id="bankName"
                                        className='flex-1 fillArea w-full h-[50px] text-base leading-none px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent '
                                        placeholder=''

                                    />
                                    <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                    <label className='placeholder text-[#818393] text-sm leading-none left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Bank Name</label>

                                </div>
                            </div>

                            <div className="flex flex-wrap items-center my-10 w-full justify-end ">
                                <button onClick={()=>setpop(!pop)} className='flex-1 w-full text-white bg-[#00aa75] border-0 border-[rgba(215,215,215,0.6)] h-11 leading-10 px-5 text-center text-base block border-solid rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative ' >
                                    Confirm Add
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default BankCardAdd