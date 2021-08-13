import React, { useState, useEffect} from 'react';
import ChevronIcon from '../../assets/chevron.png' 
import {ReactComponent as CloseIcon} from '../../assets/Close.svg'

import './Planet.css'; 

const Planet = props => {
    const {
        planets = [],
        vehicles = [],
        selectPlanet = () => {},
        index=0,
        selectVehicle=() => {},
        planet='',
        vehicle=''
    } = props;

    const [planetSearchInput, setPlanetSearchInput] = useState('')
    const [selectedPlanet, setSelectedPlanet] = useState('')
    const [showPlanetDropdown, setShowPlanetDropdown] = useState(false)
    const [showVehicleList, setShowVehicleList] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState('')
    const [distance, setDistance] = useState()

    useEffect(() => {
        setSelectedPlanet(planet ? planet : '')
        setSelectedVehicle(vehicle ? vehicle : '')
        if(planet === '' && vehicle === ''){
            setShowPlanetDropdown(false)
            setShowVehicleList(false)
        }
    },[planet,vehicle])

    useEffect(() => {

    })

    const handlePlanetSelection = (name) => {
        setSelectedPlanet(name);
        setShowPlanetDropdown(false)
        selectPlanet(name,index)
        setDistance(planets.find(planet => planet.name === name).distance)
        setShowVehicleList(true)
    } 

    const handleVehicleSelection = vehicle => {
        setSelectedVehicle(vehicle)
        setShowVehicleList(false)
        selectVehicle(index,vehicle,distance)
    }

    const planetDropdown = () => {
        return (
            showPlanetDropdown ?
            <div className='planet-dropdown'>
                <input className='planet-input' type='text' onChange={(e) => setPlanetSearchInput(e.target.value)} value={planetSearchInput} />
                <img className='input-chevron' src={ChevronIcon} onClick={() => setShowPlanetDropdown(false)}/>
                <div className='dropdown'>
                    {
                    planets.map(planet => (
                        planetSearchInput === '' || planet.name.includes(planetSearchInput) ?
                            <p className='dropdown-text' onClick={() => handlePlanetSelection(planet.name)}>{planet.name}</p>
                        :
                        null
                    ))
                    }
                </div>
            </div>
            :
            null
        )
    }

    const vehicleList = () => {

        return (
            showVehicleList ? 
            (
                <div className='vehicle-list'>
                    {vehicles.map(vehicle => {
                        const detailClassName = distance <= vehicle.max_distance && vehicle.total_no > 0 ? 'vehicle-detail' : 'vehicle-detail transparent' 
                        return <div className={detailClassName} onClick={() => handleVehicleSelection(vehicle.name)}>
                                    <p className='vehicle-name'>{vehicle.name}</p>
                                    <p className='vehicle-count'>{vehicle.total_no}</p>
                                </div>
                    }
                    ) 
                    }
                </div>
            )
            :null
        )
    }

    return ( 
        <div className='Planet'>
            <div className='planet-section'>
                <p className='selected-planet-text'>{selectedPlanet==='' ? 'Select' : selectedPlanet}</p>
                {selectedPlanet === ''  ? <img className='chevron-icon' src={ChevronIcon} onClick={() => setShowPlanetDropdown(true)}/> : null}
                {planetDropdown()}
            </div>
            {vehicleList()}
            {selectedPlanet !== '' && selectedVehicle!=='' ?
                <div className='selected-vehicle'>
                    <p className='selected-vehicle-name'>{selectedVehicle}</p>
                </div>
                :
                null
            }
            
        </div>
    )
}

export default Planet;