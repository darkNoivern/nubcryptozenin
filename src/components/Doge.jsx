import React, { useState, useEffect } from 'react'
import ReactHtmlParser from "react-html-parser";
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading'
import axios from 'axios'
import BergChart from './BergChart';
import { toast } from 'react-toastify';
import './makeup.css'
import './style.css'

const Doge = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const substituteData = useSelector(state => state);
    const stalkList = substituteData[1];
    console.log('stalkList', stalkList)
    console.log('substituteData', substituteData)

    const [contains, setContains] = useState(stalkList.includes(id));
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const addToStalk = () => {
        dispatch({
            type: 'ADD_TO_STALK',
            payload: id,
        });
        setContains(true)
        toast.success('Added to StalkList', { theme: "colored" })
    }

    const remFromStalk = () => {
        dispatch({
            type: 'REM_FROM_STALK',
            payload: id,
        });
        setContains(false)
        toast.error('Removed from StalkList', { theme: "colored" })
        
    }

    async function getData() {
        setLoading(true);
        let responseJsonData = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setData(responseJsonData.data)
        setLoading(false);
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        (loading === true || data === undefined || data.image === undefined || data.image.large === undefined) ?
            <Loading /> :
            <>
                <div className="row mx-0 text-white">

                    <div className="col col-lg-4 col-12 berg-text">

                        <div className="flexy my-4">
                            <img src={data?.image.large} alt="" />
                        </div>
                        <div className="flexy berg-heading-name my-5">{data?.name}</div>
                        <div className="mt-5 mb-4">
                            {ReactHtmlParser(data?.description.en.split(". ")[0])}.
                        </div>
                        <div className="mb-4">
                            <span className="berg-point">Rank :  &nbsp;</span>
                            <span className="berg-point-answer">{data?.market_cap_rank}</span>
                        </div>
                        <div className="mb-4">
                            <span className="berg-point">Current Price : &nbsp; </span>
                            <span className="berg-point-answer">$ {data?.market_data.current_price.usd}</span>
                        </div>
                        <div className="mb-4">
                            <span className="berg-point">Market Price : &nbsp;</span>
                            <span className="berg-point-answer">$ {data?.market_data.market_cap.usd}</span>
                        </div>

                        <div className="mb-lg-5 mb-4">
                            {
                                contains === true ?
                                    <button
                                        onClick={remFromStalk}
                                        className="negative ui button stalk-btn">
                                        Break-Up 💔
                                    </button>
                                    :
                                    <button
                                        onClick={addToStalk}
                                        className="ui yellow button text-dark stalk-btn">
                                        Add To Stalk
                                    </button>
                            }
                        </div>
                    </div>

                    <div className="col col-lg-8 col-12">
                        <BergChart id={id} />
                    </div>
                </div>
            </>
    )
}

export default Doge
