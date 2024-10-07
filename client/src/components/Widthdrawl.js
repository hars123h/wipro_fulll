import React, { useContext, useEffect, useState } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { Link, useNavigate } from 'react-router-dom'
import { ContextApi } from '../App';
import chip from '../images/Chip.svg'
import BASE_URL from '../api_url';
import axios from 'axios';

const Widthdrawl = () => {

    const navigate = useNavigate();


    const { userDetails, setLoading, setUserDetails, getUserDetails, user, toaster, amounts, setAmounsts } = useContext(ContextApi);

    // console.log(amounts);

    // const [bank_details, setBank_details] = useState(
    //     {
    //         fullName: '',
    //         bankAccount: '',
    //         ifsc: '',
    //     }
    // )
    const [bank_details, setBank_details] = useState(userDetails?.bank_details)

    const [deposit, setDeposit] = useState()
    const [wpwd, setWpwd] = useState()
    const [wpwd2, setWpwd2] = useState(localStorage.getItem('wpwd'))

    const date = new Date()
    date.setHours(0, 0, 0, 0)

    const withdrawDate = new Date(userDetails?.lastWithdrawal)
    withdrawDate.setHours(0, 0, 0, 0)

    const isBetween = () => {
        var startTime = '10:00:00';
        var endTime = '18:00:00';

        var currentDate = new Date()

        var startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);

        var endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);


        var valid = startDate < currentDate && endDate > currentDate;
        //console.log(valid);
        return valid;
    }

    const handleWithdrawal = async () => {

        if (Number(deposit) === false || Number(deposit) <= 0) {
            toaster('Enter a valid number');
            return;
        }

        if ((Number(deposit)) < Number(amounts.mwamount)) {
            //console.log((Number(deposit)+Number(amounts.withdrawal_fee)), Number(amounts.mwamount));
            toaster(`Amount should be greater than ${amounts.mwamount}`);
            //console.log(deposit, amounts.amount);
            return;
        }

        if (withdrawDate.toDateString() === date.toDateString()) {
            toaster('you can withdraw once in a day.')
            return
        }

        if ((Number(deposit) > 50000)) {
            toaster('Amount should not be greatr than Rs 50,000');
            return;
        }

        if (((Number(deposit)) > Number(userDetails.balance))) {
            toaster('You dont have enough balance');
            return;
        }
        //&& otp === otpfield
        if (userDetails.wpwd === wpwd) {
            try {
                //const docRef1 = 
                var temp_details = bank_details;
                delete temp_details._id;

                setLoading(true)

                await axios.post(`${BASE_URL}/place_withdrawal`, {
                    withdrawalAmount: (Number(deposit)),
                    ...temp_details,
                    afterDeduction: (Number(deposit) - (Number(amounts.withdrawal_fee) * Number(deposit) / 100)),
                    user_id: localStorage.getItem('uid'),
                    time: new Date(),
                    balance: userDetails.balance,
                    
                }).then(() => {
                    setLoading(false)
                    toaster('Withdrawal request placed successfully!');
                    setTimeout(() => {
                        navigate('/widthdrawlrecords')
                    }, 3000);
                }).catch(e => {
                    setLoading(false)
                    toaster("some error occured")
                    console.log(e);
                })

            } catch (e) {
                setLoading(false)
                toaster('error adding document')
                console.error("Error adding document: ", e);

            }
        } else {
            setLoading(false)
            toaster('Trade Password is incorrect');
            //console.log(wpassword, loc.state.withdrawalPassword);
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

    useEffect(() => {
        // console.log(wpwd2);

        if (wpwd2 === 'undefined') {
            toaster('Set Trade Password')
            setTimeout(() => {
                navigate('/widthdrawlpassword')
            }, 3000);
        }

        else if (userDetails?.bank_details.bankAccount.length === 0) {
            toaster("Add bank details first")
            setTimeout(() => {
                navigate('/bankcardadd')
            }, 3000);
        }
    }, [])


    // console.log(bank_details,'withdrawl');


    console.log();




    return (
        <>
            <div className="after:bg-white after:contents-[' '] after:fixed ">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block">
                        <div className="max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed bg-[brown] z-[9999] flex flex-wrap items-center  ">

                            <Link to={'/account'} className="w-[60px] h-[50px] left-0 text-center text-white text-[22px] absolute z-[2] flex justify-center items-center ">
                                <LiaAngleLeftSolid size={22} />
                            </Link>

                            <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-white ' >Withdrawal</h2>

                        </div>
                    </header>

                    <div className="mx-auto relative z-[1]">

                        <div className="bg-[brown] px-5 pt-5 overflow-hidden invite">

                            <div className="flex flex-wrap items-center mb-5 ">
                                <div className="mt-[10px]">
                                    <h3 className='text-[30px] font-bold text-white leading-none' >
                                        <em className='mr-1 p-0 px-[2px] border-0 text-base font-light align-top not-italic leading-none '>₹</em>
                                        {(Number(userDetails?.balance)).toFixed(2)}
                                    </h3>
                                    <span className='text-base text-[#fffc] opacity-80 leading-none'>Withdrawable account balance</span>
                                </div>
                            </div>

                            <div className="">
                                <div className=" px-5 pt-[10px] pb-10 relative bankcard rounded-[15px]">

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

                                    <div className="shading rounded-[15px]"></div>

                                </div>
                            </div>

                        </div>

                        <div className="m-[10px] p-[10px]">

                            <div className="mb-5 relative">

                                <div className=" relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">

                                    <div className="flex items-center relative w-full">
                                        <input
                                            onChange={e => setDeposit(e.target.value)}
                                            type="number"
                                            name="withdrawl"
                                            id="withdrawl"
                                            className=' fillArea w-full h-[50px] text-base leading-none px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent flex-1 '
                                            maxLength={11}
                                            size={11}
                                            placeholder=''
                                        />
                                        <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                        <label className='placeholder text-[#818393] text-sm leading-none left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Withdrawal Amount</label>

                                    </div>
                                </div>
                            </div>

                            <div className="mb-5 relative">

                                <div className=" relative border-0 border-solid border-[rgba(215, 215, 215, 0.6)] bg-[rgb(246,246,246)] rounded-[7px] flex items-center flex-wrap">

                                    <div className="flex items-center relative w-full ">
                                        <input
                                            onChange={e => setWpwd(e.target.value)}
                                            type="password"
                                            name="wpwd"
                                            id="wpwd"
                                            className=' fillArea w-full h-[50px] text-base leading-none px-[5px] py-[10px] appearance-none select-text outline-none border-0 border-[#e0e0e0] border-solid text-[#1e2531] font-medium bg-transparent flex-1 '
                                            maxLength={11}
                                            size={11}
                                            placeholder=''
                                        />
                                        <div className="cut bg-transparent rounded-[10px] h-5 left-[10px] absolute -top-5 translate-y-0 w-[100px] transition-transform delay-0 eas duration-200"></div>
                                        <label className='placeholder text-[#818393] text-sm leading-none left-[10px] pointer-events-none absolute origin-[0_50%] transition-all duration-200  '>Trade Password</label>

                                    </div>
                                </div>
                            </div>

                            <div className="px-[5px] py-10 mb-5 relative">
                                <div className="flex flex-wrap items-stretch w-full ">

                                    {isBetween() ?

                                        <div onClick={handleWithdrawal} className="bg-[#00aa75] flex-1 text-center h-[45px] leading-[45px] px-5 text-base text-white block rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative  ">
                                            Submit
                                        </div>
                                        :
                                        <div onClick={() => toaster('You can withdraw only between 10:00:00 to 18:00:00 ')} className="bg-[#00aa75] flex-1 text-center h-[45px] leading-[45px] px-5 text-base text-white block rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative  ">
                                            Submit
                                        </div>
                                    }

                                </div>
                            </div>

                        </div>

                        <div className="mx-[10px] p-5">
                            <div className="my-5">
                                <p className='leading-tight py-[2px] text-[#4b4d5e] mb-[10px]'>1. The daily withdrawal time is from 10:00:00 to 18:00:00</p>
                                <p className='leading-tight py-[2px] text-[#4b4d5e] mb-[10px]'>2. The single withdrawal amount is between 200 and 50000</p>
                                <p className='leading-tight py-[2px] text-[#4b4d5e] mb-[10px]'>3. 10% of the withdrawal amount will be charged as tax for each withdrawal</p>
                                <p className='leading-tight py-[2px] text-[#4b4d5e] mb-[10px]'>4. In order to facilitate financial settlement, you can only apply for cash withdrawal 1 times a day</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Widthdrawl