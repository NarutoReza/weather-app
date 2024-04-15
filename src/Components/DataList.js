import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router'
import './DataList.css'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function DataList() {
  const data = cookies.get('data')
  console.log(data)

  const [ forcast, setForcast ] = useState(null)
  console.log(forcast)

  const [ color, setColor ] = useState('')

  useEffect(() => {
    if(!forcast){
      setColor('')
    }
    else{
      if(forcast[0].weather[0].description.includes('clouds')) setColor('rgba(95, 95, 95, 0.5)')
      else if(forcast[0].weather[0].description.includes('clear')) setColor('rgba(171, 218, 236, 0.9)')
      else if(forcast[0].weather[0].description.includes('snow')) setColor('rgba(255, 250, 250, 0.897)')
      else if(forcast[0].weather[0].description.includes('rain')) setColor('rgba(0, 0, 255, 0.497)violet')
    }
  })

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
          <Col sm={12}>
            <p className='temp'>{(forcast[0].main.temp - 273).toFixed(1)}°C</p>
            <p className='desc'>{forcast[0].weather[0].description}</p>
            <p className='country'>{data.name}, {data.cou_name_en}</p>
            <p className='humid'>
              <div className='humidity'>
                <img src='../humidity.png' alt='humidity' />
                <p className='text'>{forcast[0].main.humidity}%<br />Humidity</p>
              </div>

              <div className='humidity'>
                <img src='../wind.png' alt='wind' />
                <p className='text'>{(forcast[0].wind.speed).toFixed(2)} Km/h<br />Wind Speed</p>
              </div>
            </p>
            <p className='press'>
              <div className='pressure'>
                <img src='../pressure.png' alt='atmospheric pressure' />
                <p className='text2'>{forcast[0].main.pressure} hPa<br />Atmospheric Pressure</p>
              </div>
            </p>
            <p className='humid'>
              <div className='humidity'>
                <img src='../top temp.png' alt='top temp' />
                <p className='text'>{(forcast[0].main.temp_max - 273).toFixed(1)}°C<br />Highest Temperature</p>
              </div>

              <div className='humidity'>
                <img src='../lowest temp.png' alt='lowest temp' />
                <p className='text'>{(forcast[0].main.temp_min - 273).toFixed(1)}°C<br />Lowest Temperature</p>
              </div>
            </p>
          </Col>
          
          <Col sm={12}>
            <div className='future'>
              <div className='forecast'>
                <table className='table table-sm'>
                  <tbody>
                    <tr><td><p>Date</p></td></tr>
                    
                    <tr><td><p>Time</p></td></tr>

                    <tr><td><p className='text'>Highest Temp</p></td></tr>

                    <tr><td><p className='text'>Lowest Temp</p></td></tr>

                    <tr><td>Humidity</td></tr>

                    <tr><td>Wind Speed</td></tr>
                  </tbody>
                </table>
              </div>

              {forcast && forcast.map((item, index) => {
                return(
                  <div className='forecast' key={index}>
                    <table className='table table-sm'>
                      <tbody>
                        <tr><td><p>{(new Date(item.dt_txt)).getDate()}/{(new Date(item.dt_txt)).getMonth()}/{(new Date(item.dt_txt)).getFullYear()}</p></td></tr>

                        <tr><td><p>{(new Date(item.dt_txt)).getHours()}:{(new Date(item.dt_txt)).getMinutes()}:{(new Date(item.dt_txt)).getSeconds()}</p></td></tr>

                        <tr><td><p className='text'>{(item.main.temp_max - 273).toFixed(1)}°C</p></td></tr>

                        <tr><td><p className='text'>{(item.main.temp_min - 273).toFixed(1)}°C</p></td></tr>

                        <tr><td><p className='text'>{forcast[0].main.humidity}%</p></td></tr>

                        <tr><td><p className='text'>{(forcast[0].wind.speed).toFixed(2)} Km/h</p></td></tr>
                      </tbody>
                    </table>
                  </div>
                )
              })}
            </div>
          </Col>
        </>
      )
    }
  }

  return (
    <div className='table-responsive' style={{'background-color': `${color}`}}>
      <Container>
        <Row>
          {output()}
        </Row>
      </Container>
    </div>
  )
}

export default DataList