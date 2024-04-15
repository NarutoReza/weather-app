import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router'
import jsonData from './geonames-all-cities-with-a-population-1000.json'
import './Navebar.css'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function Navebar() {
    const [ cities, setCities ] = useState(jsonData)

    // useEffect(() => {
    //     const names = jsonData.map(item => item.name.toLowerCase())
    //     setCities(names)
    // }, [])

    const [ searchItem, setSearchItem ] = useState('')

    const updateData = e => {
        setSearchItem(e.target.value.toLowerCase())
    }

    const [ results, setResults ] = useState([])

    useEffect(() => {
        if(searchItem != ''){
            
            const out = cities.filter(object => object.name.toLowerCase().includes(searchItem))
            setResults([out])
        }
        else setResults([])
    })

    const [ view, setView ] = useState('none')

    useEffect(() => {
        if(searchItem != ''){
            setView('')
        }
        else{
            setView('none')
        }
    })

  return (
    <>
        <Navbar collapseOnSelect expand='lg' className='bg-body-tertiary' bg='light' data-bs-theme='light'>
            <Container>
                <Navbar.Brand href='/'>Weather App</Navbar.Brand>

                <Navbar.Toggle aria-controls='responsive-navbar-nav' />

                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Item>
                            <Nav.Link href='/'>HOME</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Nav className='ml-auto'>
                        <Form className='d-flex'>
                            <Form.Control type='search' placeholder='Search using city name' className='me-2' aria-label='Search' style={{'marginRight': '10px'}} onChange={updateData} />
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <div className='search-results table-responsive' style={{display: view}}>
            <table className='table table-striped'>
                <tbody>
                    {results[0] && results[0].map((item, index) => {
                        return(
                            <tr key={index}><td>
                                <Link to={{ pathname: `/data/${item.name}`}}><button className='btn' onClick={() => {cookies.set('data', item)}}><a>{item.name}</a></button></Link>
                            </td></tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

        <Outlet />
    </>
  )
}

export default Navebar