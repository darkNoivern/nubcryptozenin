import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import Home from './Home'
import Doge from './Doge'
import News from './News'
import Loading from './Loading'
import StalkList from './StalkList'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './style.css'

const Index = () => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    async function getData() {
        setLoading(true);
        let responseJsonData = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
        console.log('response', responseJsonData)
        dispatch({
            type: 'SET_DATA',
            payload: responseJsonData.data,
        });
        setLoading(false);
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Router>
                <Navbar />
                <ToastContainer />
                { 
                ( loading ===true )
                ? 
                <Loading /> 
                : 
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/coin/:id" element={<Doge />} />
                    <Route exact path="/news" element={<News />} />
                    <Route exact path="/stalk" element={<StalkList />} />
                </Routes>
                }
            </Router>
        </>
    )
}

export default Index
