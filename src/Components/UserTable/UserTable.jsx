import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { AllUser } from '../../axios/apis'
import UsertableRow from './UsertableRow'
import Loader from '../Loader'

const UserTable = () => {

    const [useList, setUserList] = useState([])
    const [loader, setLoader] = useState(false)

    const getAllUser = async () => {
        setLoader(true)
        try {
            const res = await AllUser()
            setUserList(res.data.data)
            setLoader(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllUser()
    }, [])

    return (
        <>
            {
                loader ? <Loader /> : <Container fluid className="align-padding mt-5 ">
                    <div className='body-container'>
                        <table className='fl-table '>
                            <thead>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Country</th>
                                <th>Action</th>
                            </thead>
                            <tbody>
                                {
                                    useList.map((item, index) => (
                                        <UsertableRow key={index} data={item} list={useList} setList={setUserList} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Container>
            }
        </>
    )
}

export default UserTable