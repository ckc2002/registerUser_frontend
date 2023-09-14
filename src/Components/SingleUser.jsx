import React, { useState, useEffect } from 'react'
import { SingleUserData } from '../axios/apis'
import { useParams } from 'react-router-dom'
import PrevButton from './Buttons/PrevButton'
import { Col, Container, Row } from 'react-bootstrap'
import Loader from './Loader'

const SingleUser = () => {

    const [user, setUser] = useState({})
    const [loader, setLoader] = useState(true)

    const { id } = useParams()

    const getSingleUser = async () => {
        setLoader(true)
        try {
            const response = await SingleUserData(id)
            setUser(response.data.data)
            setLoader(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSingleUser()
    }, [])

    const dateConverter = (data) => {
        const date = new Date(data)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${day}-${month}-${year}`
    }


    return (
        <>
            {
                loader ? <Loader /> : <Container fluid className="align-padding mt-5 ">
                    <div className='body-container'>
                        <h3 className='form-head'>
                            <PrevButton path="/" isPrev={true}>
                                User Data
                            </PrevButton>
                        </h3>

                        <Row className='mt-4'>
                            <Col lg={6} className='input-margin'>
                                <div>
                                    <label className='input-head' htmlFor="">Name : </label><span className='data-text'> {user?.firstName + " " + user?.lastName}</span>
                                    {/* <div className='input-field'>
                                    <input value={userData?.firstName} name="firstName" onChange={handleChange} required pattern="^[A-Za-z]+$" title='First Name must contain alphabets only' type="text" />
                                </div> */}
                                </div>
                            </Col>
                            <Col lg={6} className='input-margin'>
                                <div>
                                    <label className='input-head' htmlFor="">Email : </label><span className='data-text'> {user?.email}</span>
                                </div>
                            </Col>
                            <Col lg={6} className='input-margin'>
                                <div>
                                    <label className='input-head' htmlFor="">Gender : </label><span className='data-text'> {user?.gender}</span>
                                </div>
                            </Col>
                            <Col lg={6} className='input-margin'>
                                <div>
                                    <label className='input-head' htmlFor="">Date of Birth : </label><span className='data-text'> {dateConverter(user?.dateBirth)}</span>
                                </div>
                            </Col>
                            <Col lg={6} className='input-margin'>
                                <div>
                                    <label className='input-head' htmlFor="">Age : </label><span className='data-text'> {user?.age}</span>
                                </div>
                            </Col>
                            <Col lg={6} className='input-margin'>
                                <div>
                                    <label className='input-head' htmlFor="">Country : </label><span className='data-text'> {user?.country}</span>
                                </div>
                            </Col>
                            <Col lg={6} className='input-margin'>
                                <div>
                                    <label className='input-head' htmlFor="">State : </label><span className='data-text'> {user?.state}</span>
                                </div>
                            </Col>
                            <Col lg={6} className='input-margin'>
                                <div>
                                    <label className='input-head' htmlFor="">City : </label><span className='data-text'> {user?.city}</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            }
        </>
    )
}

export default SingleUser