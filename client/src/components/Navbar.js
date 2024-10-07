import React, { useEffect, useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { PiNotebookBold } from 'react-icons/pi'
import { RiShieldUserLine } from 'react-icons/ri'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import iNav from '../images/invest.png'



const Navbar = () => {

    const pathname = window.location.pathname

    const [home, setHome] = useState()
    const [homeIcon, setHomeIcon] = useState()
    const [homeText, setHomeText] = useState()
    const [homediv, setHomediv] = useState()
    const [invest, setInvest] = useState()
    const [investIcon, setInvestIcon] = useState()
    const [investText, setInvestText] = useState()
    const [investdiv, setInvestdiv] = useState()
    const [account, setAccount] = useState()
    const [accountIcon, setAccountIcon] = useState()
    const [accountText, setAccountText] = useState()
    const [accountdiv, setAccountdiv] = useState()
    

    useEffect(() => {

        if (pathname === '/home') {
            setHome('active')
            setHomeIcon('text-white')
            setHomeText('text-[#00aa75] text-base font-bold opacity-100 block')
            setHomediv('bg-[#00aa75] opacity-100')
            setInvest()
            setInvestIcon('text-[#818393]')
            setInvestText('text-xs text-white opacity-0 hidden ')
            setInvestdiv('opacity-60')
            setAccount()
            setAccountIcon('text-[#818393]')
            setAccountText('text-xs text-white opacity-0 hidden ')
            setAccountdiv('opacity-60')
        }
        else if (pathname === '/invest') {
            setHome()
            setHomeIcon('text-[#818393]')
            setHomeText('text-xs text-white opacity-0 hidden ')
            setHomediv('opacity-60')
            setInvest('active')
            setInvestIcon('text-white')
            setInvestText('text-[#00aa75] text-base font-bold opacity-100 block')
            setInvestdiv('bg-[#00aa75] opacity-100')
            setAccount()
            setAccountIcon('text-[#818393]')
            setAccountText('text-xs text-white opacity-0 hidden ')
            setAccountdiv('opacity-60')
        }
        else {
            setHome()
            setHomeIcon('text-[#818393]')
            setHomeText('text-xs text-white opacity-0 hidden ')
            setHomediv('opacity-60')
            setInvest()
            setInvestIcon('text-[#818393]')
            setInvestText('text-xs text-white opacity-0 hidden ')
            setInvestdiv('opacity-60')
            setAccount('active')
            setAccountIcon('text-white')
            setAccountText('text-[#00aa75] text-base font-bold opacity-100 block')
            setAccountdiv('bg-[#00aa75] opacity-100')
        }

    }, [pathname])


    return (
        <div className='max-w-[800px] fixed bottom-5 left-[10px] right-[10px] mx-auto z-[999] '>
            <div className="mx-auto bg-white shadow-[0_-3px_30px_1px_rgba(0,40,14,0.3)] backdrop-blur-[5px] rounded-[500px] ">
                <ul className='flex items-center'>
                    <Link to={`/home`} className={` ${home} text-center block relative flex-1 no-underline`}>
                        <div className={`${homediv} w-11 h-11 mx-auto relative rounded-[50%] flex justify-center items-center`}>
                            <FaHome size={28} className={`${homeIcon} mx-auto inline-block `} />
                            {/* <img src={hNav} alt="home icon" className='w-7 h-7' /> */}
                        </div>
                        <p className={`${homeText}`}>Home</p>
                    </Link>

                    <Link to={`/invest`} className={`${invest} text-center block relative flex-1 no-underline`}>
                        <div className={`${investdiv} w-11 h-11 mx-auto relative rounded-[50%] flex justify-center items-center`}>
                            {/* <PiNotebookBold size={28} className={`${investIcon} mx-auto inline-block `} /> */}
                            <img src={iNav} alt="home icon" className='w-7 h-7 ' />
                            
                        </div>
                        <p className={`${investText}`}>Invest</p>
                    </Link>

                    <Link to={`/account`} className={`${account} text-center block relative flex-1 no-underline`}>
                        <div className={`${accountdiv} w-11 h-11 mx-auto relative rounded-[50%] flex justify-center items-center`}>
                            <RiShieldUserLine size={28} className={`${accountIcon} mx-auto inline-block `} />
                        </div>
                        <p className={`${accountText}`}>Account</p>
                    </Link>

                </ul>
            </div>
        </div>
    )
}

export default Navbar