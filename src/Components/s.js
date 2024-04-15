import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'

function DataList(props) {
  const location = useLocation()
  const data = location.state
  console.log(data)

  const [ forcast, setForcast ] = useState(null)
  console.log(forcast)

  const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coordinates.lat}&lon=${data.coordinates.lon}&appid=f86625079ac148808122da558c5fbb44`

  useEffect(() => {
    axios
      .get(api)
      .then(res => setForcast(res.data.list))
      .catch(err => console.log(err))
  }, [])

  const output = () => {
    if(!forcast){
      return(
        <></>
      )
    }
    else{
      return(
        <>
          <td>{(forcast[0].main.temp - 273).toFixed(1)}°C</td>
          <td>{forcast[0].weather[0].description}</td>
          <td>{forcast[0].main.humidity}%</td>
          <td>{(forcast[0].wind.speed).toFixed(2)} km/h</td>
          <td>{forcast[0].main.pressure} hPa</td>
        </>
      )
    }
  }

  return (
    <div className='table-responsive'>
      <h1>{data.name}</h1>
      
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Weather Description</th>
            <th>Humidity</th>
            <th>Wind Speed</th>
            <th>Atmospheric Pressure</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {output()}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DataList