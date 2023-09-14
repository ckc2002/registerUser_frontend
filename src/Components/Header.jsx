import React from 'react'
import { MdAdd } from 'react-icons/md'
import ThemeButton from './Buttons/ThemeButton'

const Header = () => {
    return (
        <div className='d-flex justify-content-between align-padding py-3 page-header'>
            <label className='logo-text'>User Register</label>
            <div className="d-flex gap-4">
                <ThemeButton name="Add User" icon={<MdAdd />} path="/add" />
                {/* <ThemeButton name="Add Country" icon={<MdAdd />} /> */}
            </div>
        </div>
    )
}

export default Header