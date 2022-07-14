import React from 'react';
import { Link } from 'react-router-dom';
import { useGobalContext } from '../../../../context/UserContext';
import { auth } from '../../../../config/Firebase-uitles'
import { signOut } from 'firebase/auth';

const Header = () => {
    const { Authentication } = useGobalContext()
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                alert("logged out")
            })
            .catch(e => {
                console.error(e)
            })
    }

    return (
        <nav className="navbar  navbar-expand-lg bg-dark navbar-dark">
            <div className="container d-flex">
                <Link className="navbar-brand" to="/">My Bank</Link>
                <div className="flex-grow-0 d-flex">
                    {Authentication &&
                        <Link className="nav-link text-white fs-5" to='/dashboard'>Dashboard</Link>
                    }
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {Authentication ? (
                            <button className='btn text-white' onClick={handleLogout}>Logout</button>
                        ) : (
                            <Link className="nav-link text-white fs-5" to='/login'>Login</Link>
                        )
                        }
                    </ul>
                </div>
            </div>
        </nav>

    );
};
export default Header;
