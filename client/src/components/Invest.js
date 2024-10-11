import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Tradmark from './Tradmark'
import hot from '../images/hot.svg'
import ProductCard from './ProductCard'
import img202 from '../images/201.png'
import img302 from '../images/301.png'
import p1 from '../images/p1.jpg'
import p2 from '../images/p2.jpg'
import p3 from '../images/p3.jpg'
import p4 from '../images/p4.jpg'
import p5 from '../images/p5.jpg'
import p6 from '../images/p6.jpg'
// import p7 from '../images/p7.jpg'
// import p8 from '../images/p8.jpg'
import { ContextApi } from '../App'

const Invest = () => {

    const navigate = useNavigate();


    const { userDetails, setUserDetails, getUserDetails, user, toaster } = useContext(ContextApi);


    const [stable, setStable] = useState('-top-[5px] bg-white font-bold text-[#0aa496] text-xl')
    const [welfare, setWelfare] = useState('bg-[rgba(255,255,255,0.3)] text-white text-lg ')
    const [activity, setActivity] = useState('bg-[rgba(255,255,255,0.3)] text-white text-lg ')
    const [activelist, setActivelist] = useState('stable')
    const [totalEarn, setTotalEarn] = useState(0)


    const swiperHandel = name => {
        setActivelist(name)
        if (name === 'stable') {
            setStable('-top-[5px] bg-white font-bold text-[#0aa496] text-xl')
            setWelfare('bg-[rgba(255,255,255,0.3)] text-white text-lg ')
            setActivity('bg-[rgba(255,255,255,0.3)] text-white text-lg ')
        }
        else if (name === 'welfare') {
            setStable('bg-[rgba(255,255,255,0.3)] text-white text-lg ')
            setWelfare('-top-[5px] bg-white font-bold text-[#0aa496] text-xl')
            setActivity('bg-[rgba(255,255,255,0.3)] text-white text-lg ')
        }
        else {
            setStable('bg-[rgba(255,255,255,0.3)] text-white text-lg ')
            setWelfare('bg-[rgba(255,255,255,0.3)] text-white text-lg ')
            setActivity('-top-[5px] bg-white font-bold text-[#0aa496] text-xl')
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

    const DateDifference = (date1, date2) => {


        //console.log(date1, date2);    
        var Difference_In_Time = date2.getTime() - date1.getTime();
        //console.log(Difference_In_Time);
        var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

        //console.log(Difference_In_Days);

        return Difference_In_Days;
    }

    useEffect(() => {


        userDetails?.plans_purchased?.forEach(element => {
            setTotalEarn(
                totalEarn + (DateDifference(new Date(element.date_purchased), new Date(element.date_till_rewarded)) * element.quantity * element.plan_daily_earning)
            )

        });

    }, [])

    console.log(totalEarn);





    return (
        <>

            <div className="mx-auto mb-28 bgimg">
                <div className="w-full mx-auto max-w-[800px]" >

                    <Link to={`/orders`}>
                        <div className='max-w-full min-h-[90px] mx-auto bg-[brown] invite pb-[120px] ' >

                            <div className="relative z-10 flex flex-wrap items-start pt-5 px-5 pb-[10px]">

                                <div className="flex-[3]">
                                    <p className='text-[26px] font-bold text-white leading-none' >
                                        <em className='p-0 px-[2px] border-0 text-base font-light align-top not-italic leading-none '>₹</em>
                                        {userDetails?.totalInvestment.toFixed(2)}
                                    </p>
                                    <span className=' text-white opacity-80 leading-none'>Total Investment</span>
                                </div>

                                <div className="flex-[2]">
                                    <p className='text-[26px] font-bold text-white leading-none' >
                                        <em className=' p-0 px-[2px] border-0 text-base font-light not-italic leading-none '>₹</em>
                                        {totalEarn?.toFixed(2)}
                                    </p>
                                    <span className=' text-white opacity-80 leading-none'>Bought-in</span>
                                </div>

                            </div>

                            <div className="left-0 right-0 px-5 py-[10px] absolute z-[1]"></div>

                        </div>
                    </Link>

                    <div className="relative -top-[120px] mx-auto z-[1]">

                        {/* itemlist */}

                        <div className="m-[10px]">

                            {/* toogle */}

                            <div className="mx-auto relative overflow-hidden p-0 z[1] ">

                                <div className="swiper pt-[10px] overflow-hidden overflow-x-scroll relative w-full h-full z-[1] flex transition-transform box-content rounded-[7px] ">

                                    <div onClick={() => swiperHandel('stable')} className={`${stable} w-auto mr-[3px] px-[15px] pt-[15px] pb-5 no-underline inline-block relative flex-shrink-0 h-full transition-transform rounded-tl-[7px] rounded-tr-[7px]  `}>
                                        <p>Wipro 1</p>
                                        {activelist === 'stable' &&
                                            <>
                                                <div className="opacity-100 block -left-10 -bottom-[5px] rotate-45 z-[1] absolute w-[50px] h-[50px] border-[10px] border-solid border-transparent border-r-white rounded-[100%] duration-300 "></div>
                                                <div className="opacity-100 block -right-10 -bottom-[5px] -rotate-45 z-[1] absolute w-[50px] h-[50px] border-[10px] border-solid border-transparent border-l-white rounded-[100%] duration-300 "></div>
                                            </>
                                        }
                                    </div>

                                    <div onClick={() => swiperHandel('welfare')} className={`${welfare} w-auto mr-[3px] px-[15px] pt-[15px] pb-5 no-underline inline-block relative flex-shrink-0 h-full transition-transform rounded-tl-[7px] rounded-tr-[7px]  `}>
                                        <p>Wipro 2</p>
                                        {activelist === 'welfare' &&
                                            <>
                                                <div className="opacity-100 block -left-10 -bottom-[5px] rotate-45 z-[1] absolute w-[50px] h-[50px] border-[10px] border-solid border-transparent border-r-white rounded-[100%] duration-300 "></div>
                                                <div className="opacity-100 block -right-10 -bottom-[5px] -rotate-45 z-[1] absolute w-[50px] h-[50px] border-[10px] border-solid border-transparent border-l-white rounded-[100%] duration-300 "></div>
                                            </>
                                        }
                                    </div>

                                    <div onClick={() => swiperHandel('activity')} className={`${activity} w-auto mr-[3px] px-[15px] pt-[15px] pb-5 no-underline inline-block relative flex-shrink-0 h-full transition-transform rounded-tl-[7px] rounded-tr-[7px]  `}>
                                        <img className='w-6 top-0 right-0 absolute' src={hot} alt="" />
                                        <p>Wipro 3</p>

                                        {activelist === 'activity' &&
                                            <>
                                                <div className="opacity-100 block -left-10 -bottom-[5px] rotate-45 z-[1] absolute w-[50px] h-[50px] border-[10px] border-solid border-transparent border-r-white rounded-[100%] duration-300 "></div>
                                                <div className="opacity-100 block -right-10 -bottom-[5px] -rotate-45 z-[1] absolute w-[50px] h-[50px] border-[10px] border-solid border-transparent border-l-white rounded-[100%] duration-300 "></div>
                                            </>
                                        }

                                    </div>
                                </div>


                            </div>

                            {/* list */}

                            <div className="">

                                {activelist === 'stable' &&
                                    <div className="block bg-white -top-[10px] pt-[10px] px-[5px] pb-12 relative z-[2] rounded-[7px] ">
                                        <div className="flex flex-wrap items-center justify-between">

                                            <ProductCard
                                                product_image={p1}
                                                product_type={0}
                                                plan_cycle={65}
                                                plan_amount={520}
                                                plan_daily_earning={200}
                                            />

                                            <ProductCard
                                                product_image={p2}
                                                product_type={0}
                                                plan_cycle={65}
                                                plan_amount={1890}
                                                plan_daily_earning={750}
                                            />

                                            <ProductCard
                                                product_image={p3}
                                                product_type={0}
                                                plan_cycle={65}
                                                plan_amount={3980}
                                                plan_daily_earning={1600}
                                            />

                                            <ProductCard
                                                product_image={p4}
                                                product_type={0}
                                                plan_cycle={65}
                                                plan_amount={8880}
                                                plan_daily_earning={3700}
                                            />

                                            <ProductCard
                                                product_image={p5}
                                                product_type={0}
                                                plan_cycle={65}
                                                plan_amount={15500}
                                                plan_daily_earning={6000}
                                            />

                                            <ProductCard
                                                product_image={p6}
                                                product_type={0}
                                                plan_cycle={65}
                                                plan_amount={28880}
                                                plan_daily_earning={12500}
                                            />

                                            {/* <ProductCard
                                                product_image={img202}
                                                product_type={0}
                                                plan_cycle={60}
                                                plan_amount={100000}
                                                plan_daily_earning={45500}
                                            /> */}

                                            {/* <ProductCard
                                                product_image={img202}
                                                product_type={0}
                                                plan_cycle={60}
                                                plan_amount={100000}
                                                plan_daily_earning={90000}
                                            /> */}

                                        </div>
                                    </div>

                                }

                                {activelist === 'welfare' &&
                                    <div className="block bg-white -top-[10px] pt-[10px] px-[5px] pb-12 relative z-[2] rounded-[7px] ">
                                        <div className="flex flex-wrap items-center justify-between">

                                            {/* <ProductCard
                                                product_type={1}
                                                plan_cycle={1}
                                                plan_amount={240}
                                                plan_daily_earning={360}
                                            /> */}

                                            <ProductCard
                                                product_type={1}
                                                plan_cycle={2}
                                                plan_amount={800}
                                                plan_daily_earning={480}
                                            />

                                            <ProductCard
                                                product_type={1}
                                                plan_cycle={2}
                                                plan_amount={2000}
                                                plan_daily_earning={1100}
                                            />

                                            <ProductCard
                                                product_type={1}
                                                plan_cycle={5}
                                                plan_amount={5050}
                                                plan_daily_earning={3000}
                                            />

                                            {/* <ProductCard
                                                product_type={5}
                                                plan_cycle={3}
                                                plan_amount={30000}
                                                plan_daily_earning={21000}
                                            />

                                            <ProductCard
                                                product_type={6}
                                                plan_cycle={3}
                                                plan_amount={50000}
                                                plan_daily_earning={37500}
                                            /> */}

                                        </div>
                                    </div>

                                }

                                {activelist === 'activity' &&
                                    <div className="block bg-white -top-[10px] pt-[10px] px-[5px] h-screen pb-12 relative z-[2] rounded-[7px] ">
                                        <div className="flex flex-wrap items-center justify-between h-3/5">

                                            <p className='text-center flex-1'>No plans</p>

                                        </div>
                                    </div>

                                }

                            </div>

                        </div>

                    </div>
                    <div className="fixed bottom-0">
                        <Tradmark />
                    </div>

                </div>
            </div>

            {/* footer  */}
            <Navbar />
        </>
    )
}

export default Invest