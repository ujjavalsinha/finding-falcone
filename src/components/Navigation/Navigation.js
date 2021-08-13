import React from 'react'
import { Link } from 'react-router-dom';
import './Navigation.css'

const Navigation = props => {
    return (
        <div className='Navigation'>
            <Link to='/' onClick={props.onReset}>Reset</Link>
            <Link to='/' onClick={props.onReset}>Geek Trust Home</Link>
        </div>
    )
}

export default Navigation;