import React from 'react'
import './Result.css'

const Result = props => {
    
    const {
        onReset,
        status,
        totalTime
    } = props

    return (
        <div className='Result'>
            {status.status === "success" ?
            <>
                <p className='success-message'><span className='success'>Success!</span> Congratulation on Finding Flacone. King Shan is mighty Pleased.</p>
                <div className='show-time'>
                    <p className='time-taken'>Time Taken : <span className='time'>{totalTime}</span></p>
                    <p className='planet-found'>Planet Found : <span className='planet-name'>{status.planet_name}</span></p>
                </div>
            </>
            :
            <>
                <p className='success-message'>Oops ! <span className='fail-message'>Failed</span> in the mission to find Falcone. King Shan is disappointed!</p>
            </>
            }
            <button className='start-again' onClick={onReset}>Start Again</button>
        </div>
    )
}
export default Result;