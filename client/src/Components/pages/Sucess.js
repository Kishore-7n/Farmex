
import React from 'react'

import '../styles/Sucess.css';
import successimage from '../img/flat-design-order-confirmed-concept_108061-1022.avif'
export default function Sucess() {
  return (
    <div className='sucess-message-parent'>
      <div className='sucess-message'>
        <img src={successimage} alt='successimage'></img>
      </div>
    </div>
  )
}
