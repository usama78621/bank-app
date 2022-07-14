import React from 'react'
import '../../../scss/_login.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../config/Firebase-uitles'
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom'

const Register = () => {
    const [isPasswordShow, setisPasswordShow] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [confirm, setConfirm] = useState(false);
    if (confirm) {
        return (
            <Navigate
                to={{
                    pathname: "/login",
                }}
            />
        );
    }
    const handleClick = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                toast.success('User has been registered!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setEmail('')
                setPassword('')
                setUserName('')
                setConfirm(true)
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(error)
                toast.error(errorMessage, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });

    }

    return (
        <section className='d-flex align-items-center justify-content-between min-vh-100'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-10 col-md-8 col-lg-4 mx-auto'>
                        <form onSubmit={handleClick} className='card p-4 shadow '>
                            <h4>Register</h4>
                            <div className="d-flex w-100">
                                <h5 className='w-50'>Full Name</h5>
                                <h5 className='w-50'>Email</h5>
                            </div>
                            <div className="d-flex w-100">
                                <input type="text" name="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                    className='form-control w-50 mx-1'
                                    placeholder='Enter Username' />

                                <input type="email" name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className='form-control w-50 mx-1'
                                    placeholder='Enter Email' />
                            </div>
                            <h5 className='mt-3'>Passwrod</h5>
                            <div class="input-group mb-3">
                                <input type={isPasswordShow ? "text" : "password"}
                                    className="form-control"
                                    required
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button type='button'
                                    className="input-group-text"
                                    onClick={() => { setisPasswordShow(!isPasswordShow) }}>
                                    <i className={`fa-solid fa-eye${isPasswordShow ? "" : "-slash"}`}></i>
                                </button>
                            </div>
                            <button className='btn btn-success fs-5'>Register</button>
                            <div className='text-center d-inline mt-4 ' >
                                <i className="fa-brands fa-facebook fs-2 btn" style={{
                                    color: "#1877f2"
                                }}>
                                </i>
                                <i className="fa-brands fa-google fs-2  btn"
                                    style={{
                                        color: "#ea4335"
                                    }}>
                                </i>
                                <i className="fa-brands fa-github fs-2 btn"
                                    style={{
                                        color: "#333"
                                    }}>
                                </i>
                            </div>
                            <p className='text-center'>Need an account? <Link to='/login'>
                                Login
                            </Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    )
}
export default Register
