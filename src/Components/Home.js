import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function Home(props) {
    const navigate = useNavigate()

    const [ items, setItems ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ page, setPage ] = useState(0)
    
    const link = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=name&limit=100&offset=`

    const fetchData = () => {
        setIsLoading(true);
        setError(null);

        axios
            .get(`${link}${page}`)
            .then(({data})=> {
                setItems(prevItems => [...prevItems, ...data.results])
                setPage(prevPage => prevPage + 100)
            })
            .catch(err => setError(err))
            .finally(setIsLoading(false))
    };

    useEffect(() => {
        fetchData()
        
    }, [])

    const handleScroll = () => {
        if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading){
            return
        }
        fetchData()
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLoading])

    return (
        <>
            <div className='table-responsive'>
                <InfiniteScroll dataLength={items.length} next={fetchData} hasMore={true} loader={<p>Loading...</p>} endMessage={<p>No more data to load.</p>} >
                    <table className='table table-striped table-sm'>
                        <thead className='thead-dark'>
                            <tr>
                                <th scope="col">Serial Number</th>
                                <th scope="col">City</th>
                                <th scope="col">Country</th>
                                <th scope="col">Timezone</th>
                            </tr>
                        </thead>
                            <tbody>
                            {items && items.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <th>{index+1}</th>
                                        <td>
                                            <Link to={{ pathname: `/data/${item.name}`}}><button className='btn' onClick={() => {cookies.set('data', item)}}><a>{item.name}</a></button></Link>
                                        </td>
                                        <td>{item.cou_name_en}</td>
                                        <td>{item.timezone}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                    </table>
                </InfiniteScroll>

                {/* {isLoading && <p>Loading...</p>} */}
                {error && <p>Error: {error.message}</p>}
            </div>
        </>
    )
}

export default Home