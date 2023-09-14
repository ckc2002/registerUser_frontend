import React, { useEffect, useState } from 'react'
import PrevButton from './Buttons/PrevButton'
import "../styles/register.css"
import { Col, Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { AllCountry, RegisterUser } from '../axios/apis'
import Loader from './Loader'

const RegisterForm = () => {

    const [loader, setLoader] = useState(true)
    const [submitloader, setSubmitLoader] = useState(false)

    const [country, setCountry] = useState([])
    const [state, setState] = useState([])
    const [city, setCity] = useState([])

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        state: "",
        city: "",
        gender: "",
        dateBirth: "",
        age: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "dateBirth") {
            const today = new Date();
            const year = new Date(value);
            const age = today.getFullYear() - year.getFullYear();
            console.log(age >= 14)
            if (age >= 14) {
                setUserData({ ...userData, [name]: value })
            } else {
                toast.error("Age must be greater than 14")
            }
        } else {
            setUserData({ ...userData, [name]: value })
        }
    }


    const handleSave = async (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        try {
            const response = await RegisterUser(userData)
            console.log(response)
            toast.success("User Data Saved Successfully")
            setSubmitLoader(false)
            handleReset()
        } catch (error) {
            toast.error(error.response.data.message)
            setSubmitLoader(false)
            console.log(error)
        }
    }

    const handleReset = (e) => {
        setUserData({
            firstName: "",
            lastName: "",
            email: "",
            country: "",
            state: "",
            city: "",
            gender: "",
            dateBirth: "",
        })
    }

    const handleCountry = (e, type) => {
        const { value } = e.target
        if (type === "country") {
            setState(country?.filter((item) => item.name === value)[0]?.state)
            setUserData({ ...userData, country: value, state: "", city: "" })
            setCity([])
        } else if (type === "state") {
            setCity(state?.filter((item) => item.name === value)[0]?.city)
            setUserData({ ...userData, state: value, city: "" })
        } else if (type === "city") {
            setUserData({ ...userData, city: value })
        }
    }

    const getCountryData = async () => {
        setLoader(true)
        try {
            const res = await AllCountry()
            setCountry(res.data.data)
            setLoader(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCountryData()
    }, [])


    return (
        <>
            {
                loader ? <Loader /> : <Container fluid className="align-padding mt-5 ">
                    <div className='body-container'>
                        <h3 className='form-head'>
                            <PrevButton path="/" isPrev={true}>
                                Registration Form
                            </PrevButton>
                        </h3>

                        <form onSubmit={handleSave}>
                            <Row className='mt-4'>
                                <Col lg={6} className='input-margin'>
                                    <div>
                                        <label className='input-head' htmlFor="">First Name</label>
                                        <div className='input-field'>
                                            <input value={userData?.firstName} name="firstName" onChange={handleChange} required pattern="^[A-Za-z]+$" title='First Name must contain alphabets only' type="text" />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} className='input-margin'>
                                    <div>
                                        <label className='input-head' htmlFor="">Last Name</label>
                                        <div className='input-field'>
                                            <input value={userData?.lastName} name="lastName" onChange={handleChange} pattern="^[A-Za-z]+$" title='Last Name must contain alphabets only' type="text" />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} className='input-margin'>
                                    <div>
                                        <label className='input-head' htmlFor="">Email</label>
                                        <div className='input-field'>
                                            <input value={userData?.email} name="email" onChange={handleChange} pattern='/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/' title='Invalid email format' type="email" />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} className='input-margin'>
                                    <div>
                                        <label className='input-head' htmlFor="">Country</label>
                                        <div className='input-field'>
                                            <select value={userData?.country} name="country" onChange={(e) => handleCountry(e, "country")} required id="">
                                                <option selected>select country</option>
                                                {
                                                    country?.map((el, index) => (
                                                        <option value={el?.name}>{el?.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} className='input-margin'>
                                    <div>
                                        <label className='input-head' htmlFor="">State</label>
                                        <div className='input-field'>
                                            <select value={userData?.state} name="state" onChange={(e) => handleCountry(e, "state")} required id="">
                                                <option selected>select state</option>
                                                {
                                                    state?.map((el, index) => (
                                                        <option value={el?.name}>{el?.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} className='input-margin'>
                                    <div>
                                        <label className='input-head' htmlFor="">City</label>
                                        <div className='input-field'>
                                            <select value={userData?.city} name="city" onChange={(e) => handleCountry(e, "city")} required id="">
                                                <option selected>select city</option>
                                                {
                                                    city?.map((el, index) => (
                                                        <option value={el?.name}>{el?.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} className='input-margin'>
                                    <div>
                                        <label className='input-head' htmlFor="">Gender</label>
                                        <div className='input-field-radio'>
                                            <div className='d-flex input-box align-items-center'>
                                                <label>Male</label>
                                                <input checked={userData?.gender === "Male" && "checked"} name="gender" required onChange={handleChange} value="Male" type="radio" />
                                            </div>
                                            <div className='d-flex input-box align-items-center'>
                                                <label>Female</label>
                                                <input checked={userData?.gender === "Female" && "checked"} name="gender" required onChange={handleChange} value="Female" type="radio" />
                                            </div>
                                            <div className='d-flex input-box align-items-center'>
                                                <label>Other</label>
                                                <input checked={userData?.gender === "Other" && "checked"} name="gender" required onChange={handleChange} value="Other" type="radio" />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} className='input-margin'>
                                    <div>
                                        <label className='input-head' htmlFor="">Date of Birth</label>
                                        <div className='input-field'>
                                            <input name="dateBirth" value={userData?.dateBirth} onChange={handleChange} type="date" className='justify-content-between' />
                                        </div>
                                    </div>
                                </Col>
                                {/* <Col lg={6} className='input-margin'>
                                <div>
                                    <label className='input-head' htmlFor="">Age</label>
                                    <div className='input-field'>
                                        <input type="text" />
                                    </div>
                                </div>
                            </Col> */}
                                <div className='d-flex justify-content-end gap-3 mt-5'>
                                    <button type='button' onClick={handleReset} className='common-btn px-5'>Reset</button>
                                    <button className='common-btn px-5'>
                                        {
                                            submitloader ? <div
                                                className="spinner-border text-white spinner-border-md"
                                                role="status"
                                            ></div> : <>Save</>
                                        }
                                    </button>
                                </div>
                            </Row>
                        </form>
                    </div>
                </Container>
            }
        </>
    )
}

export default RegisterForm