import React, {useState, useEffect} from 'react'

import Planet from '../Planet/Planet'
import Result from '../Result/Result'
import './Home.css'

const Home = props => {
    
    const {
        loading = false,
        status = {},
        findFalcone = () => {},
        planets = [],
        setPlanets = () => {},
        vehicles = [],
        setVehicles =() => {},
        selectedPlanets = [],
        setSelectedPlanets = () => {},
        totalTime = 0,
        setTotalTime = () => {},
        onReset = () => {},
    } = props

    const disableFindButton = () => {
        let count = 0
        selectedPlanets.forEach(planet => {
            if(planet.length === 2) count+=1
        })
        return count === 4 ? false : true
    }
    
    const selectPlanet = (planetName,index) => {
        const updatedSelectedPlanets = [...selectedPlanets]
        updatedSelectedPlanets[index] = [planetName]
        setSelectedPlanets(updatedSelectedPlanets)
        const updatedPlanets = planets.filter(planet => planet.name !== planetName)
        setPlanets(updatedPlanets)
    }

    const handleFindButtonClick = () => {
        if(disableFindButton()){
            return 
        }
        
        findFalcone()
        
    }

    const selectVehicle = (index,vehicleName,distance) => {
        let speedOfVehicle;
        selectedPlanets[index].push(vehicleName)
        const updatedVehicles = vehicles.map(vehicle => {
            if(vehicle.name === vehicleName){
                const total_no = vehicle.total_no - 1
                speedOfVehicle = vehicle.speed;
                return {...vehicle, total_no }
            }
            return vehicle
        })
        
        setTotalTime(prevState => prevState + distance / speedOfVehicle)
        setVehicles(updatedVehicles)
    }

    return (
        
        <div className="Home">
            <div className='heading-container'><h1 className='heading'>Finding Falcone</h1></div>
                {!Object.keys(status).length ?
                    <>
                    <p className='text'>Select planets you want to search in : </p>
                    <div className="Planets">
                        {selectedPlanets.map((selectedPlanet, i) => {
                            return <Planet 
                                    planets={planets} 
                                    index={i}
                                    vehicles={vehicles} 
                                    selectPlanet={selectPlanet}
                                    selectVehicle={selectVehicle}
                                    vehicle={selectedPlanets[i][1]}
                                    planet={selectedPlanets[i][0]}
                                    totalTime={totalTime}/>
                        })
                        }
                    </div>
                    <p className='total-time'>TOTAL TIME : <span className='time'>{totalTime}</span></p>
                    <button className='find-button' onClick={handleFindButtonClick} disabled={disableFindButton()}>Find Falcone</button>
                    </>
                :
                !loading ?
                <Result status={status} totalTime={totalTime} onReset={onReset}/>
                :
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                }
        </div>
   
    )
}

export default Home;
