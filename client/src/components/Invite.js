import React, { useContext } from 'react'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import inviteBg from '../images/homeBg.jpg'
import { Link } from 'react-router-dom'
import img02 from '../images/02.svg'
import ticket from '../images/ticket.png'
import CopyToClipboard from 'react-copy-to-clipboard'
import { ContextApi } from '../App'
import LV1 from '../images/LV1.png'
import LV2 from '../images/LV2.png'
import LV3 from '../images/LV3.png'

const Invite = () => {

    const { userDetails, setUserDetails, getUserDetails, user, toaster } = useContext(ContextApi);


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

                                <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-white ' >Invitation rebate</h2>

                            </div>
                        </header>

                        <div className='max-w-full min-h-[90px] mx-auto bg-[brown] invite ' >

                            <div className="relative z-[1]">
                                <img src={inviteBg} alt="" className='w-full' />
                            </div>

                            <div className="left-0 right-0 px-5 py-[10px] absolute z-[1]"></div>

                        </div>
                    </div>

                    <div className="relative -top-[50px] mx-auto z-[1] ">

                        <div className="m-5 p-5 bg-white rounded-[7px] items-center flex flex-wrap">

                            <img src={img02} alt="" className='w-[60px] mr-[10px]' />

                            <p className='text-[#4b4d5e] text-lg font-bold p-[10px] '>
                                Friends get 100 Rs for their first investment
                            </p>

                        </div>

                        <div className="m-5 p-5 bg-white rounded-[7px] ">

                            <div className="flex flex-wrap items-end">

                                <div className="flex-1 max-w-[160px] relative">

                                    <div className="top-0 left-0 right-0 bottom-0 text-center absolute justify-center items-center flex flex-wrap">
                                        <div>
                                            <h3 className='leading-none text-[30px] text-[#f15542]'>
                                                30
                                                <em className='leading-none text-[20px] text-[#f15542] not-italic '>%</em>
                                            </h3>
                                            <p className='opacity-50 text-center text-base text-[#f15542]'>Level 1</p>
                                        </div>
                                    </div>

                                    <img src={ticket} alt="" className='w-full' />

                                </div>

                                <div className="flex-1 max-w-[160px] relative">

                                    <div className="top-0 left-0 right-0 bottom-0 text-center absolute justify-center items-center flex flex-wrap">
                                        <div>
                                            <h3 className='leading-none text-[30px] text-[#f15542]'>
                                                3
                                                <em className='leading-none text-[20px] text-[#f15542] not-italic '>%</em>
                                            </h3>
                                            <p className='opacity-50 text-center text-base text-[#f15542]'>Level 2</p>
                                        </div>
                                    </div>

                                    <img src={ticket} alt="" className='w-full' />

                                </div>

                                <div className="flex-1 max-w-[160px] relative">

                                    <div className="top-0 left-0 right-0 bottom-0 text-center absolute justify-center items-center flex flex-wrap">
                                        <div>
                                            <h3 className='leading-none text-[30px] text-[#f15542]'>
                                                1
                                                <em className='leading-none text-[20px] text-[#f15542] not-italic '>%</em>
                                            </h3>
                                            <p className='opacity-50 text-center text-base text-[#f15542]'>Level 3</p>
                                        </div>
                                    </div>

                                    <img src={ticket} alt="" className='w-full' />

                                </div>

                            </div>

                            <div className="p-[10px] bg-[rgba(255,255,255,0.3)] ">

                                <p className='font-bold text-lg text-[#4b4d5e]'>
                                    If your friends have invested in the platform, you can get 35% of the total investment
                                    amount
                                </p>

                            </div>

                        </div>

                        <div className="bg-transparent px-5 rounded-[7px] w-full flex flex-wrap items-stretch">
                            <CopyToClipboard text={`${window.location.origin}/signup?invitation_code=${userDetails?.user_invite}`} onCopy={() => toaster('copy succeded')}>
                                <button className='copyBtn flex-[3] text-white border-0 border-[rgba(215,215,215,0.6)] h-11 leading-10 px-5 text-center text-base block border-solid rounded-[500px] transition-all active:translate-y-1 duration-500 overflow-hidden relative '>
                                    Copy and share
                                </button>
                            </CopyToClipboard>
                        </div>

                        <div className="m-[10px] p-[10px]">

                            <h3 className='text-[22px] mb-[10px] mt-[10px] font-bold text-[#4b4d5e] '>My Team</h3>

                            <div className="flex flex-wrap items-end rounded-[7px] bg-white p-[10px] m-[10px] mr-0 relative ">

                                <div className="w-10">
                                    <div className="">
                                        <img src={LV1} alt="" className='absolute w-[66px] top-0 -left-5' />
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-wrap items-end">

                                    <div className="px-5">
                                        <p id="level1Count" className='text-[#0aa496] text-[22px] font-bold leading-none'>{userDetails?.directMember?.length}</p>
                                        <span className='text-sm text-[#818393]'>Quantity</span>
                                    </div>

                                    <div className="px-5">
                                        <p id="level1Count" className='text-[#0aa496] text-[22px] font-bold leading-none'>
                                            <em className='p-0 px-[2px] border-0 text-base font-light align-top not-italic'>₹</em>
                                            {userDetails?.directRecharge.toFixed(2)}
                                        </p>
                                        <span className='text-sm text-[#818393]'>Commission</span>
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-wrap items-end rounded-[7px] bg-white p-[10px] m-[10px] mr-0 relative ">

                                <div className="w-10">
                                    <div className="">
                                        <img src={LV2} alt="" className='absolute w-[66px] top-0 -left-5' />
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-wrap items-end">

                                    <div className="px-5">
                                        <p id="level1Count" className='text-[#0aa496] text-[22px] font-bold leading-none'>{userDetails?.indirectMember?.length}</p>
                                        <span className='text-sm text-[#818393]'>Quantity</span>
                                    </div>

                                    <div className="px-5">
                                        <p id="level1Count" className='text-[#0aa496] text-[22px] font-bold leading-none'>
                                            <em className='p-0 px-[2px] border-0 text-base font-light align-top not-italic'>₹</em>
                                            {userDetails?.indirectRecharge.toFixed(2)}
                                        </p>
                                        <span className='text-sm text-[#818393]'>Commission</span>
                                    </div>
                                </div>

                            </div>

                            <div className="flex flex-wrap items-end rounded-[7px] bg-white p-[10px] m-[10px] mr-0 relative ">

                                <div className="w-10">
                                    <div className="">
                                        <img src={LV3} alt="" className='absolute w-[66px] top-0 -left-5' />
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-wrap items-end">

                                    <div className="px-5">
                                        <p id="level1Count" className='text-[#0aa496] text-[22px] font-bold leading-none'>{userDetails?.in_indirectMember?.length}</p>
                                        <span className='text-sm text-[#818393]'>Quantity</span>
                                    </div>

                                    <div className="px-5">
                                        <p id="level1Count" className='text-[#0aa496] text-[22px] font-bold leading-none'>
                                            <em className='p-0 px-[2px] border-0 text-base font-light align-top not-italic'>₹</em>
                                            {userDetails?.in_indirectRecharge.toFixed(2)}
                                        </p>
                                        <span className='text-sm text-[#818393]'>Commission</span>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="m-5 p-[10px]">

                            <h3 className='mb-[5px] text-[28px] text-[#4b4d5e] '>Rule description</h3>

                            <p className='leading-tight py-[2px] text-[#4b4d5e]'>
                                Promotion commission ratio
                            </p>
                            <p className='leading-tight py-[2px] text-[#4b4d5e]'>
                                Direct recommendation (Level 1): 35%
                            </p>
                            <p className='leading-tight py-[2px] text-[#4b4d5e]'>
                                Indirect recommendation (Level 2): 4%
                            </p>
                            <p className='leading-tight py-[2px] text-[#4b4d5e]'>
                                Indirect recommendation (Level 3): 1%
                            </p>
                            <p className='leading-tight py-[2px] text-[#4b4d5e]'>
                                If you invite A to invest successfully, you will get 100 additional rewards+35% of A's total investment.
                            </p>
                            <p className='leading-tight py-[2px] text-[#4b4d5e]'>
                                A invites B, and you will get 4% of B's total investment
                            </p>
                            <p className='leading-tight py-[2px] text-[#4b4d5e]'>
                                B invites C, and you will get 1% of C's total investment
                            </p>

                        </div>

                    </div>

                </div>
            </div>


        </>
    )
}

export default Invite