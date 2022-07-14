import React from 'react'
import '../../../scss/_login.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/Firebase-uitles";
import { Navigate } from "react-router-dom";
import { useAccountsContext } from '../../../context/AccountsContext'


const Login = () => {
    const [isLoading, setisLoading] = useState(false)
    const [isPasswordShow, setisPasswordShow] = React.useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState(false);
    if (confirm) {
        return (
            <Navigate
                to={{
                    pathname: "/dashboard",
                }}
            />
        );
    }
    const handleClick = (e) => {
        e.preventDefault();
        setisLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                toast.success('Login successfully', {
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
            })
            .finally(() => {
                setisLoading(false)
            })
    }

    return (
        <section className='d-flex align-items-center justify-content-between min-vh-100'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-10 col-md-9 col-lg-4 mx-auto'>
                        <form onSubmit={handleClick} className='card p-4 shadow '>
                            <h4>Login</h4>
                            <h5 className='mt-3'>Email</h5>
                            <input type="email" name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='form-control'
                                placeholder='Enter Email' />
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
                            <div className='text-end'>
                                <p>Forgot Password</p>
                            </div>
                            <button type='submit' disabled={isLoading} className='btn btn-success'>
                                {!isLoading
                                    ? "Login"
                                    : <div className='spinner-border spinner-border-sm'></div>

                                }
                            </button>
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
                            <p className='text-center'>Need an account? <Link to='/register'>
                                SignUp
                            </Link></p>
                        </form>

                    </div>
                </div>
            </div>

        </section>

    )
}

export default Login
