import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const PrevButton = ({ children, path, isPrev }) => {

    const navigate = useNavigate()

    return (
        <>
            {
                isPrev && <div className='prev-icon'>
                    <IoArrowBackOutline onClick={() => navigate(path ? path : -1)} />
                </div>
            }
            {children}
        </>
    )
}

export default PrevButton