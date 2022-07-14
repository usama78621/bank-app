import React from 'react'
import '../../../../scss/_footer.scss'
const Footers = () => {
  return (
    <div className='footer'>
      <h5>
        &copy; {new Date().getFullYear()}
        <span> MY Banks </span>
      </h5>
      <h5>All rights reserved</h5>
    </div>
  )
}

export default Footers