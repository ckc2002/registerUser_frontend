import React, { useState } from 'react'
import { BiPencil, BiTrash } from 'react-icons/bi'
import { BsFillEyeFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { DeleteUser } from '../../axios/apis'
import { toast } from 'react-toastify'

const UsertableRow = ({ data, list, setList }) => {

    const navigate = useNavigate()
    const [deleteloader, setDeleteLoader] = useState(false)

    const { firstName, lastName, gender, country, email, _id } = data


    const handleDelete = async () => {
        setDeleteLoader(true)
        try {
            const res = await DeleteUser(_id)
            setList(list.filter(item => item._id !== _id))
            toast.success("User Deleted Successfully")
            setDeleteLoader(false)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <tr>
                <td>{firstName + " " + lastName}</td>
                <td>{email}</td>
                <td>{gender}</td>
                <td>{country}</td>
                <td>
                    <div className='d-flex justify-content-center'>
                        <div onClick={() => navigate(_id)} className="eye-action-btn action-table-btns">
                            <BsFillEyeFill />
                        </div>
                        <div onClick={() => navigate(`/edit/${_id}`)} className="pencil-edit-btn action-table-btns">
                            <BiPencil />
                        </div>
                        <div onClick={handleDelete} className={`trash-edit-btn action-table-btns ${deleteloader && "theme-red"}`}>
                            {
                                deleteloader ? <div
                                    className="spinner-border text-white spinner-border-sm"
                                    role="status"
                                ></div> : <><BiTrash /></>
                            }
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default UsertableRow