import React from 'react'
import { useNavigate } from 'react-router-dom'

const ThemeButton = ({ name, icon, path }) => {

    const navigate = useNavigate()

    return (
        <button onClick={() => navigate(path)} className='common-btn'>
            {icon} {name}
        </button>
    )
}

export default ThemeButton