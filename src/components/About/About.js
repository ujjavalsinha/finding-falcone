import React from 'react'
import './About.css'

const About = props => {
    return (
        <div className='About'>
            <p className='find-falcone'>FIND AL FALCONE!</p>
            <p className='story-first'>King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets - DonLon, Enchai, Jebing, Sapir, Lerbin & Pingasor. However he has limited resources at his disposal & can send his army to only 4 of these planets.
You have to help King Shan find Al Falcone.</p>
            <p className='task'>WHAT YOU NEED TO DO</p>
            <ul className='list-task'>
                <li>Select 4 planets to search (out of the total 6)</li>
                <li>Select which space vehicles to send to these planets</li>
                <li>See how much time it will take for the vehicles to reach their targets</li>
                <li>Show final result of success or failure</li>
            </ul>
        </div>
    )
}

export default About