import React from 'react'
import Card from './Card'
import p1 from '../images/img201.jpg'
import p2 from '../images/img301.jpg'
import { Link } from 'react-router-dom'
import { LiaAngleLeftSolid } from 'react-icons/lia'
import img1 from '../images/img1.jpg'
import img3 from '../images/img3.jpg'
import img4 from '../images/img4.jpg'
import img5 from '../images/img5.jpg'
import img6 from '../images/img6.jpg'
import img2 from '../images/img7.jpg'

const Article = () => {
    return (
        <>
            <div className="after:bg-white after:contents-[' '] after:fixed ">
                <div className="w-full mx-auto max-w-[800px]">

                    <header className="h-[50px] leading-[50px] block">
                        <div className="max-w-[800px] h-[50px] leading-[50px] left-0 right-0 top-0 mx-auto fixed bg-[brown] z-[9999] flex flex-wrap items-center  ">

                            <Link to={'/home'} className="w-[60px] h-[50px] left-0 text-center text-white text-[22px] absolute z-[2] flex justify-center items-center ">
                                <LiaAngleLeftSolid size={22} />
                            </Link>

                            <h2 className='left-0 right-0 text-center text-lg font-medium absolute z-[1] flex-1 text-white ' >Article</h2>

                        </div>
                    </header>

                    <div className="mx-auto relative z-[1]">
                        <div className="my-[10px] mx-[5px]">

                            <div className="flex">

                                <div className="flex-1 ">

                                    <Card
                                        img={img1}
                                        title={'gift'}
                                        content={'A small gift for all VIP usersCycle: one day Income: 300 quick pick up Stop time: 21:30'}
                                        timestamp={'2024-02-24 20:22:04'}
                                    />

                                    <Card
                                        img={img2}
                                        title={'Link change'}
                                        content={'dear user Our promotion link will be changed frequently, it is recommended that you use the APP to log in If you need the latest link, please click to copy the latest link in the sharing interface'}
                                        timestamp={'2024-02-22 13:07:04'}
                                    />

                                    <Card
                                        img={img4}
                                        title={'A small gift for all VIP users'}
                                        content={'Cycle: one day Income: 300 quick pick up Stop time: 14:00'}
                                        timestamp={'2024-02-20 13:18:04'}
                                    />
                                </div>

                                <div className="flex-1 ">

                                    <Card
                                        img={img5}
                                        title={'Welfare release'}
                                        content={'Today&#39s system has been updated, it will be more stable and secure, so 2 super event products will be sent to users again'}
                                        timestamp={'2024-02-22 20:02:42'}
                                    />

                                    <Card
                                        img={img3}
                                        title={'Quickly join'}
                                        content={'Quickly join Kent Ro and become a VIP🤑🤑🤑 We will send a lot of gifts to our trusted and loyal users in the days to come.'}
                                        timestamp={'2024-02-24 20:22:04'}
                                    />

                                    <Card
                                        img={img6}
                                        title={'Call for prizes'}
                                        content={'announcement We need more withdrawal screenshots for display Let more users see that there will be no problem with withdrawing money in Kent Ro Please send the screenshot of your withdrawal to the bank card today to our customer service, if your screenshot is true and qualified, then we will reward you 50Rs The activity ends at 18:00'}
                                        timestamp={'2024-02-24 20:22:04'}
                                    />
                                </div>

                            </div>

                            {/* <Link to={`/article`} className="m-5 flex flex-wrap justify-center items-center w-full">

                    <div className="font-bold text-[rgba(52,86,255,0.9)] text-base flex items-center">
                        MORE <HiOutlineChevronDoubleRight size={18} />
                    </div>

                </Link> */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Article