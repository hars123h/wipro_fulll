import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ContextApi } from '../App';
import { LiaAngleLeftSolid } from 'react-icons/lia';

const DateDifference = (date1, date2) => {


    //console.log(date1, date2);    
    var Difference_In_Time = date2.getTime() - date1.getTime();
    //console.log(Difference_In_Time);
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

    //console.log(Difference_In_Days);

    return Difference_In_Days;
}

const Order = () => {

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

    const [toggle, setToggle] = useState(false)
    const [completed, setCompleted] = useState('text-black')
    const [processing, setProcessing] = useState('text-red-500')

    const toggleser = () => {
        if (toggle) {
            setCompleted('text-white')
            setProcessing('text-black')
        }
        else {
            setProcessing('text-white')
            setCompleted('text-black')
        }
    }

    useEffect(() => {
        toggleser();
    }, [toggle, setToggle])





    return (
        <>

            <div className="bg-[brown]  after:contents-[' '] after:fixed min-h-screen">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block mb-[10px]">
                        <div className="max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed bg-[brown] z-[9999] flex flex-wrap items-center  ">

                            <Link to={'/account'} className="w-[60px] h-[50px] left-0 text-center text-white text-[22px] absolute z-[2] flex justify-center items-center ">
                                <LiaAngleLeftSolid size={22} />
                            </Link>

                            <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-white ' >Plan Records</h2>

                        </div>
                    </header>

                    <div className="mx-auto relative z-[1]">

                        <div className="flex flex-wrap">

                            <div onClick={() => setToggle(!toggle)} className={`p-1 flex flex-wrap justify-center items-center w-1/2 `}>
                                <p className={`${completed}`}>completed</p>
                            </div>

                            <div onClick={() => setToggle(!toggle)} className={` p-1 flex flex-wrap justify-center items-center w-1/2`}>
                                <p className={`${processing}`}>processing</p>
                            </div>

                        </div>

                        <div className="p-[5px]">

                            {toggle ?

                                <>
                                    {userDetails?.plans_purchased?.map((element, index) => {
                                        if (element.plan_daily_earning * element.plan_cycle === DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning) {
                                            return (
                                                <div className="my-[5px] border-x-2 bg-white border-white border-b-2  rounded-[7px]" key={index}>

                                                    <div className="p-3 text-base font-semibold bg-confirm rounded-t-lg bg-[brown] text-white">Plan Details</div>
                                                    <div className='p-3'>
                                                        <div className='mb-1'>earn: &#8377;{DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning}</div>
                                                        <div className='mb-1'>total revenue: {element.plan_daily_earning * element.plan_cycle}</div>
                                                        <div className='mb-1'>time: {element.date_purchased}</div>
                                                        {/* <div className='mb-1'>Plan Cycle: {element.plan_cycle}</div>
                                                        <div className='mb-1'>Plan Daily Earning: &#8377;{element.plan_daily_earning}</div>
                                                        <div className='mb-1'>Quantity: {element.quantity}</div> */}
                                                        <div className='mb-1'>full time: {element.fullTime}</div>

                                                    </div>

                                                </div>
                                            )
                                        }
                                    })}
                                </>

                                :
                                <>
                                    {userDetails?.plans_purchased?.map((element, index) => {
                                        if (element.plan_daily_earning * element.plan_cycle !== DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning) {
                                            return (
                                                <div className="my-[5px] border-x-2 bg-white border-white border-b-2  rounded-[7px]" key={index}>

                                                    <div className="p-3 text-base font-semibold bg-confirm rounded-t-lg bg-[brown] text-white">Plan Details</div>
                                                    <div className='p-3'>
                                                        <div className='mb-1'>earn: &#8377;{DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning}</div>
                                                        <div className='mb-1'>total revenue: {element.plan_daily_earning * element.plan_cycle}</div>
                                                        <div className='mb-1'>time: {element.date_purchased}</div>
                                                        {/* <div className='mb-1'>Plan Cycle: {element.plan_cycle}</div>
                                                        <div className='mb-1'>Plan Daily Earning: &#8377;{element.plan_daily_earning}</div>
                                                        <div className='mb-1'>Quantity: {element.quantity}</div> */}
                                                        <div className='mb-1'>full time: {element.fullTime}</div>

                                                    </div>

                                                </div>
                                            )
                                        }
                                    })}
                                </>

                            }

                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Order