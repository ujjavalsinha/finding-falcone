import './App.css';
import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom'
import Home from './components/Home/Home'
import axios from './axios';
import About from './components/About/About'
import Navigation from './components/Navigation/Navigation';

const App = props => {
  const [planets, setPlanets] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [token, setToken] = useState('')
  const [selectedPlanets, setSelectedPlanets] = useState([...Array(4)].map((e,i) => []))
  const [totalTime, setTotalTime] = useState(0)
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(false)


  const fetchPlanetsAndVehicles = () => {
    axios.get('/planets')
    .then(res => {
        setPlanets(res.data)
        return axios.get('/vehicles')
    })
    .then(res => {
        setVehicles(res.data)
    })
    .catch(err => {
        console.log(err)
    })
  }

  const getToken = () => {
      axios.post('/token', {})
      .then(res => {
          setToken(res.data)
      })
  }

  useEffect(() => {
      fetchPlanetsAndVehicles()
      getToken()
  },[])

  const onReset = () => {
    fetchPlanetsAndVehicles()
    getToken()
    setSelectedPlanets([...Array(4)].map((e,i) => []))
    setTotalTime(0)
    setStatus({})
  }

  const findFalcone = () => {
    setLoading(true)
    const planet_names = []
    const vehicle_names = []
    selectedPlanets.forEach(planet => {
        planet_names.push(planet[0])
        vehicle_names.push(planet[1])
    })
    axios.post('/find',{
        token : token.token,
        planet_names ,
        vehicle_names 
    })
    .then(response => {
        setStatus(response.data)
        setLoading(false)
    })
    .catch(err => {
        console.log(err)
        setLoading(false)
    })
  }
  return (
    <div className="App">
      <Navigation onReset={onReset}/>
      <Route path='/' 
            exact 
            render={() => <Home 
                                status={status}
                                findFalcone={findFalcone}
                                planets={planets}
                                loading={loading}
                                vehicles={vehicles}
                                selectedPlanets={selectedPlanets}
                                setPlanets={setPlanets}
                                setVehicles={setVehicles}
                                setSelectedPlanets={setSelectedPlanets}
                                totalTime={totalTime}
                                setTotalTime={setTotalTime}
                                onReset={onReset}/>}/>
      <Route path='/about' component={About}/>
    </div>
  )
}

export default App;
