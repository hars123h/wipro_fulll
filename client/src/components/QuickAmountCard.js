import React, { useEffect, useState } from 'react'

const QuickAmountCard = ({ amount, setDeposit, id, selected, setSelected }) => {

    // const [active, setActive] = useState('text-[#4b4d5e] bg-[#eee]')

    const handelclick = () => {

        setSelected(id)
        setDeposit(amount)

    }



    return (
        <>

            <div className="relative w-1/3 py-[5px] m-0 pr-[10px] " onClick={() => handelclick(id)}  >
                <div className={`py-[5px] px-[10px] text-base font-bold ${selected === id ? 'text-white bg-[brown]' : 'text-[#4b4d5e] bg-[#eee]'}  rounded-[7px] `}>
                    <p className='text-base font-bold leading-none '>
                        <em className=' p-0 px-[2px] border-0 text-base font-light not-italic leading-none '>₹</em>
                        {amount}
                    </p>
                </div>
            </div>

        </>
    )
}

export default QuickAmountCard