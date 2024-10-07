import React, { useContext, useEffect, useState } from 'react'
import taskBG from '../images/04.png'
import { Link } from 'react-router-dom'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import { TbTicket } from 'react-icons/tb'
import { BiSolidGift } from 'react-icons/bi'
import axios from 'axios'
import BASE_URL from '../api_url'
import { ContextApi } from '../App'

const Task = () => {

    const date = new Date();

    const { userDetails, setUserDetails, getUserDetails, user, toaster, vipimg } = useContext(ContextApi);

    const [level_1, setLevel_1] = useState(0)
    const [signinrewardactive, setSigninrewardactive] = useState(new Date(userDetails?.last_signin_reward) < date)

    const handelSignin = async () => {
        await axios.post(`${BASE_URL}/signinReward`, { _id: localStorage.getItem('uid') }).then(responce => {
            // console.log(responce);
            toaster(responce.data.message)
            setSigninrewardactive(new Date(responce.data.last_signin_reward) < date)
        }).catch(error => {
            toaster("Something went wrong")
        })
    }

    useEffect(() => {
        const level1 = async () => {
            await axios.post(`${BASE_URL}/lvl1`, { _id: localStorage.getItem('uid') }).then(responce => {
                // console.log(responce);
                // toaster(responce.data.message)
                setLevel_1(responce.data.level1.filter(element => element.vipLevel > 0).length)

            }).catch(error => {
                console.log(error);
                toaster("Something went wrong")
            })
        }
        level1()
    }, [])

    // const directMemberVip = level_1.filter(element => element.vipLevel > 0)

    // console.log(directMemberVip.length);
    // console.log(level_1);

    // useEffect(() => {

    const activation = async () => {
        await axios.post(`${BASE_URL}/task_reward`, { _id: localStorage.getItem('uid'), count: level_1 }).then(responce => {
            // console.log(responce);
            toaster(responce.data.message)

        }).catch(error => {
            console.log(error);
            toaster("Something went wrong")
        })

    }

    //     activation()

    // }, [level_1, setLevel_1])

    // console.log(userDetails);



    // console.log(new Date(userDetails?.last_signin_reward) < date);


    return (
        <>

            <div className="mx-auto mb-28 bgimg overflow-hidden">
                <div className="w-full mx-auto max-w-[800px]" >

                    <div>

                        <header className="h-[50px] leading-[50px] block">
                            <div className="max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed bg-[brown] z-[9999] flex flex-wrap items-center  ">

                                <Link to={'/home'} className="w-[60px] h-[50px] left-0 text-center text-white text-[22px] absolute z-[2] flex justify-center items-center ">
                                    <LiaAngleLeftSolid size={22} />
                                </Link>

                                <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-white ' >Task Hall</h2>

                            </div>
                        </header>

                        <div className='max-w-full min-h-[90px] mx-auto bg-[brown] invite ' >

                            <div className="relative z-[1]">
                                <img src={taskBG} alt="" className='w-full' />
                            </div>

                            <div className="left-0 right-0 px-5 py-[10px] absolute z-[1]"></div>

                        </div>
                    </div>

                    <div className="relative -top-[50px] mx-auto z-[1] ">
                        <div className="m-[10px]">

                            <div className="my-[10px] p-5 flex flex-wrap items-start rounded-[7px] bg-white">

                                <div className="w-10 h-10 overflow-hidden bg-[#00aa75] relative flex flex-wrap justify-center items-center rounded-[50%]">
                                    <TbTicket size={26} className='text-white' />
                                </div>

                                <div className="flex-1 px-[10px] leading-none">
                                    <p className='text-lg text-[#1e2531]'>Daily Attendance</p>
                                    <span className="text-[#818393] text-sm font-light">Sign in every day and get 7 rupees</span>
                                </div>

                                {signinrewardactive ?
                                    <div onClick={handelSignin} className="rounded-[500px] px-[10px] py-[5px] text-white bg-[rgba(75,169,88,0.9)] text-xs ">
                                        Sign
                                    </div>
                                    :
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[#eee] text-xs ">
                                        Sign
                                    </div>
                                }

                            </div>

                            <div className="my-[10px] p-5 flex flex-wrap items-start rounded-[7px] bg-white">

                                <div className="w-10 h-10 overflow-hidden bg-[#00aa75] relative flex flex-wrap justify-center items-center rounded-[50%]">
                                    <BiSolidGift size={26} className='text-white' />
                                </div>

                                <div className="flex-1 px-[10px] leading-none">
                                    <p className='text-lg text-[#1e2531]'>Invitation Activation</p>
                                    <span className="text-[#818393] text-sm font-light">Every time you invite a friend to register and activate, you will get a reward of 100 rupees</span>
                                </div>

                                {userDetails?.vipMemcount < level_1 ?
                                    <div onClick={activation} className="rounded-[500px] px-[10px] py-[5px] text-white bg-[rgba(75,169,88,0.9)] text-xs ">
                                        Receive
                                    </div>
                                    :
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[#eee] text-xs ">
                                        Receive
                                    </div>
                                }


                                <div className="w-full py-[10px] ">
                                    <div className="w-full relative flex flex-wrap justify-between items-center">
                                        <div className="bg-[#eee] rounded-[500px] w-full h-[5px] ">
                                            <div className="bg-[#4c8dcb] rounded-[500px] h-[5px] w-0 ">
                                                <p className='-bottom-[6px] text-right text-sm font-bold text-[#00aa75] relative whitespace-nowrap'>
                                                    {userDetails?.vipMemcount - level_1}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="my-[10px] p-5 flex flex-wrap items-start rounded-[7px] bg-white">

                                <div className="w-10 h-10 overflow-hidden bg-[#00aa75] relative flex flex-wrap justify-center items-center rounded-[50%]">
                                    <BiSolidGift size={26} className='text-white' />
                                </div>

                                <div className="flex-1 px-[10px] leading-none">
                                    <p className='text-lg text-[#1e2531]'>Invite to activate 5</p>
                                    <span className="text-[#818393] text-sm font-light">
                                        Earn money by sharing your invitation links to recommend friends to sign up for Wipro
                                        App.
                                        <br />
                                        Success +5, extra bonus 100
                                    </span>
                                </div>



                                {userDetails?.vipMemcount === 5 ?
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[rgba(75,169,88,0.9)] text-xs ">
                                        Receive
                                    </div>
                                    :
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[#eee] text-xs ">
                                        Receive
                                    </div>
                                }



                                <div className="w-full py-[10px] ">
                                    <div className="w-full relative flex flex-wrap justify-between items-center">
                                        <div className="bg-[#eee] rounded-[500px] w-full h-[5px] ">
                                            <div className={`bg-[#4c8dcb] rounded-[500px] h-[5px] w-[${level_1 / 5 * 100}%]`}>
                                                <p className='-bottom-[6px]  text-right text-sm font-bold text-[#00aa75] relative whitespace-nowrap'>
                                                    {level_1 >= 5 ? '5/5' : `${level_1} /5`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="my-[10px] p-5 flex flex-wrap items-start rounded-[7px] bg-white">

                                <div className="w-10 h-10 overflow-hidden bg-[#00aa75] relative flex flex-wrap justify-center items-center rounded-[50%]">
                                    <BiSolidGift size={26} className='text-white' />
                                </div>

                                <div className="flex-1 px-[10px] leading-none">
                                    <p className='text-lg text-[#1e2531]'>Invite to activate 10</p>
                                    <span className="text-[#818393] text-sm font-light">
                                        Earn money by sharing your invitation links to recommend friends to sign up for Wipro
                                        App.
                                        <br />
                                        Success +10, extra bonus 200
                                    </span>
                                </div>

                                {userDetails?.vipMemcount === 10 ?
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[rgba(75,169,88,0.9)] text-xs ">
                                        Receive
                                    </div>
                                    :
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[#eee] text-xs ">
                                        Receive
                                    </div>
                                }

                                <div className="w-full py-[10px] ">
                                    <div className="w-full relative flex flex-wrap justify-between items-center">
                                        <div className="bg-[#eee] rounded-[500px] w-full h-[5px] ">
                                            <div className={`bg-[#4c8dcb] rounded-[500px] h-[5px] w-[${level_1 / 10 * 100}%]`}>
                                                <p className='-bottom-[6px] text-right text-sm font-bold text-[#00aa75] relative whitespace-nowrap'>
                                                    {level_1 >= 10 ? '10/10' : `${level_1} /10`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="my-[10px] p-5 flex flex-wrap items-start rounded-[7px] bg-white">

                                <div className="w-10 h-10 overflow-hidden bg-[#00aa75] relative flex flex-wrap justify-center items-center rounded-[50%]">
                                    <BiSolidGift size={26} className='text-white' />
                                </div>

                                <div className="flex-1 px-[10px] leading-none">
                                    <p className='text-lg text-[#1e2531]'>Invite to activate 50</p>
                                    <span className="text-[#818393] text-sm font-light">
                                        Earn money by sharing your invitation links to recommend friends to sign up for Wipro
                                        App.
                                        <br />
                                        Success +50, extra bonus 1,500
                                    </span>
                                </div>

                                {userDetails?.vipMemcount === 50 ?
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[rgba(75,169,88,0.9)] text-xs ">
                                        Receive
                                    </div>
                                    :
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[#eee] text-xs ">
                                        Receive
                                    </div>
                                }

                                <div className="w-full py-[10px] ">
                                    <div className="w-full relative flex flex-wrap justify-between items-center">
                                        <div className="bg-[#eee] rounded-[500px] w-full h-[5px] ">
                                            <div className={`bg-[#4c8dcb] rounded-[500px] h-[5px] w-[${level_1 / 50 * 100}%]`}>
                                                <p className='-bottom-[6px] text-right text-sm font-bold text-[#00aa75] relative whitespace-nowrap'>
                                                    {level_1 >= 50 ? '50/50' : `${level_1} /50`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="my-[10px] p-5 flex flex-wrap items-start rounded-[7px] bg-white">

                                <div className="w-10 h-10 overflow-hidden bg-[#00aa75] relative flex flex-wrap justify-center items-center rounded-[50%]">
                                    <BiSolidGift size={26} className='text-white' />
                                </div>

                                <div className="flex-1 px-[10px] leading-none">
                                    <p className='text-lg text-[#1e2531]'>Invite to activate 100</p>
                                    <span className="text-[#818393] text-sm font-light">
                                        Earn money by sharing your invitation links to recommend friends to sign up for Wipro
                                        App.
                                        <br />
                                        Success +100, extra bonus 5000
                                    </span>
                                </div>

                                {userDetails?.vipMemcount === 100 ?
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[rgba(75,169,88,0.9)] text-xs ">
                                        Receive
                                    </div>
                                    :
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[#eee] text-xs ">
                                        Receive
                                    </div>
                                }

                                <div className="w-full py-[10px] ">
                                    <div className="w-full relative flex flex-wrap justify-between items-center">
                                        <div className="bg-[#eee] rounded-[500px] w-full h-[5px] ">
                                            <div className={`bg-[#4c8dcb] rounded-[500px] h-[5px] w-[${level_1}%]`}>
                                                <p className='-bottom-[6px] text-right text-sm font-bold text-[#00aa75] relative whitespace-nowrap'>
                                                    {level_1 >= 100 ? '100/100' : `${level_1} /100`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="my-[10px] p-5 flex flex-wrap items-start rounded-[7px] bg-white">

                                <div className="w-10 h-10 overflow-hidden bg-[#00aa75] relative flex flex-wrap justify-center items-center rounded-[50%]">
                                    <BiSolidGift size={26} className='text-white' />
                                </div>

                                <div className="flex-1 px-[10px] leading-none">
                                    <p className='text-lg text-[#1e2531]'>Invite to activate 500</p>
                                    <span className="text-[#818393] text-sm font-light">
                                        Earn money by sharing your invitation links to recommend friends to sign up for Wipro
                                        App.
                                        <br />
                                        Success +500, extra bonus 20,000
                                    </span>
                                </div>

                                {userDetails?.vipMemcount === 500 ?
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[rgba(75,169,88,0.9)] text-xs ">
                                        Receive
                                    </div>
                                    :
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[#eee] text-xs ">
                                        Receive
                                    </div>
                                }

                                <div className="w-full py-[10px] ">
                                    <div className="w-full relative flex flex-wrap justify-between items-center">
                                        <div className="bg-[#eee] rounded-[500px] w-full h-[5px] ">
                                            <div className={`bg-[#4c8dcb] rounded-[500px] h-[5px] w-[${level_1 / 500 * 100}%]`}>
                                                <p className='-bottom-[6px] text-right text-sm font-bold text-[#00aa75] relative whitespace-nowrap'>
                                                {level_1 >= 5 ? '500/500' : `${level_1} /500`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="my-[10px] p-5 flex flex-wrap items-start rounded-[7px] bg-white">

                                <div className="w-10 h-10 overflow-hidden bg-[#00aa75] relative flex flex-wrap justify-center items-center rounded-[50%]">
                                    <BiSolidGift size={26} className='text-white' />
                                </div>

                                <div className="flex-1 px-[10px] leading-none">
                                    <p className='text-lg text-[#1e2531]'>Invite to activate 5000</p>
                                    <span className="text-[#818393] text-sm font-light">
                                        Earn money by sharing your invitation links to recommend friends to sign up for Wipro
                                        App.
                                        <br />
                                        Success +5000, extra bonus 1,000,000,
                                    </span>
                                </div>

                                {userDetails?.vipMemcount === 5000 ?
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[rgba(75,169,88,0.9)] text-xs ">
                                        Receive
                                    </div>
                                    :
                                    <div className="rounded-[500px] px-[10px] py-[5px] text-white bg-[#eee] text-xs ">
                                        Receive
                                    </div>
                                }

                                <div className="w-full py-[10px] ">
                                    <div className="w-full relative flex flex-wrap justify-between items-center">
                                        <div className="bg-[#eee] rounded-[500px] w-full h-[5px] ">
                                            <div className={`bg-[#4c8dcb] rounded-[500px] h-[5px] w-[${level_1 / 5000 * 100}%]`}>
                                                <p className='-bottom-[6px] text-right text-sm font-bold text-[#00aa75] relative whitespace-nowrap'>
                                                    {level_1 >= 5 ? '5000/5000' : `${level_1} /5000`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>


                </div >
            </div >


        </>
    )
}

export default Task