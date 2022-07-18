import React from 'react'
import '../../../scss/_hero.scss'
const Hero = () => {
    return (
        <div className='hero'>
            <div className='container'>
                <div className='row'>
                    <div className='col-5'>
                        <div className='card shadow card-custom'>
                            <div className='card-body'>
                                <h2 className="card-title">Get a $400 bouns then make it better.</h2>
                                <p className="card-text">Create an account to save your salery on  My bank.</p>
                                <button className="btn btn-danger">See Offer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero