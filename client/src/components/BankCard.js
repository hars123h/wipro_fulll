import React, { useContext, useEffect, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { Link, useNavigate } from 'react-router-dom'
import { ContextApi } from '../App';
import chip from '../images/Chip.svg'
import { AiOutlinePlus } from 'react-icons/ai';

const BankCard = () => {

    const navigate = useNavigate();


    const { userDetails, setUserDetails, setUser, getUserDetails, toaster, user } = useContext(ContextApi);




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

    console.log(userDetails?.bank_details);

    return (
        <>
            <div className="after:bg-white after:contents-[' '] after:fixed ">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block">
                        <div className="max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed bg-[brown] z-[9999] flex flex-wrap items-center  ">

                            <Link to={'/account'} className="w-[60px] h-[50px] left-0 text-center text-white text-[22px] absolute z-[2] flex justify-center items-center ">
                                <LiaAngleLeftSolid size={22} />
                            </Link>

                            <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-white ' >My Bank Account</h2>

                        </div>
                    </header>

                    <div className="mx-auto relative z-[1]">

                        {userDetails?.bank_details?.fullName !== '' &&
                            <div className="">
                                <div className="m-[10px] px-5 py-[10px] relative bankcard rounded-[7px]">

                                    <div className="m-auto relative">
                                        <p className='text-white text-sm tracking-[2px]'>IFSC:{userDetails?.bank_details?.ifsc}</p>
                                    </div>

                                    <div className="py-[10px]">
                                        <h3 className='font-bold text-[26px] text-white'>{userDetails?.bank_details?.bankAccount.toString().replace(/\d{4}(?=.)/g, '$& ')}</h3>
                                    </div>

                                    <div className="">
                                        <span className='text-white font-light text-xs leading-4'>CARD HOLDER</span>
                                        <p className='text-white text-sm tracking-[2px]'>{userDetails?.bank_details?.fullName}</p>
                                    </div>

                                    <div className="w-[45px] top-5 right-[10px] absolute z-[2]">
                                        <img src={chip} alt="" className='w-full opacity-20' />
                                    </div>

                                    <div className="shading"></div>

                                </div>
                            </div>
                        }

                        <Link to={'/bankcardadd'} className='bg-[#eee] my-[30px] mx-[10px] p-[10px] text-[#4b4d5e] block text-center rounded-[7px]' >
                            <AiOutlinePlus size={25} className='mx-2 inline-block align-bottom' />

                            Add Bank card


                        </Link>

                    </div>

                </div>
            </div>

        </>
    )
}

export default BankCard