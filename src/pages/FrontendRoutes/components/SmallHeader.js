import React from 'react'
import { Link } from 'react-router-dom'
import '../../../scss/_mainheader.scss'
import { FaFacebookF, FaInstagramSquare } from 'react-icons/fa'
import { AiFillGithub } from 'react-icons/ai'

const SmallHeader = () => {
    return (
        <div className='d-flex align-items-center justify-content-end' style={{
            backgroundColor: "rgb(83, 86, 90)"
        }}>
            <Link to='/' className='btn ' >Location</Link>
            <Link to='/' className='btn'>Financial Calculators</Link>
            <Link to='/' className='btn'>Contact Us</Link>
            <a href="tel:+4733378901" className='btn' style={{
                color: "rgb(181, 129, 80)"
            }}>(888) 831-1500</a>
            <div className='me-3 fs-4 d-flex align-items-center justify-content-between'>
                <a href='https://www.facebook.com' ><FaFacebookF /></a> |
                <a href='https://github.com/usama78621' ><AiFillGithub /></a> |
                <a href='https://www.instagram.com' ><FaInstagramSquare /></a>
            </div>
        </div>
    )
}

export default SmallHeader