import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import LoaderPage from './Loading';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './makeup.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const BergChart = (props) => {
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    const [button, setButton] = useState(0);

    async function getData() {
        // setLoading(true);
        let responseJsonData = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${days}`
        );
        console.log(responseJsonData.data.prices)
        setHistoricalData(responseJsonData.data.prices)
        
        // switchBtn(0,1)
        // setLoading(false);
    }

    const switchBtn = (btnIndex,numDays) => {
        setDays(numDays);
        let prev = button;
        setButton(btnIndex);
        console.log(document.querySelectorAll('.btn-days')[prev].classList);
        document.querySelectorAll('.btn-days')[prev].classList.remove('text-dark')
        document.querySelectorAll('.btn-days')[prev].classList.add('basic')
        document.querySelectorAll('.btn-days')[btnIndex].classList.remove('basic')
        document.querySelectorAll('.btn-days')[btnIndex].classList.add('text-dark')
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);

    return (
        !historicalData ? <LoaderPage /> :
            <>
            <div className="mt-lg-5">
                <Line
                    data={{
                        labels: historicalData.map((coin) => {
                            let date = new Date(coin[0]);
                            let time =
                                date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`;
                            return days === 1 ? time : date.toLocaleDateString();
                        }),

                        datasets: [
                            {
                                data: historicalData.map((coin) => coin[1]),
                                label: `Price ( Past ${days} Days )`,
                                borderColor: '#ffc107',
                            },
                        ],
                    }}
                    options={{
                        elements: {
                            point: {
                                radius: 1,
                            },
                        },
                    }}
                />
                </div>
                <div className="label-btn my-5">
                    <div className="row mx-0">
                        <div className="col col-md-3 col-6 flexy mb-3">
                            <button
                            onClick={()=>{switchBtn(0,1)}} 
                            className="ui yellow button text-dark btn-days">
                            24 hr
                            </button>
                        </div>
                        <div className="col col-md-3 col-6 flexy mb-3">
                            <button 
                            onClick={()=>{switchBtn(1,30)}}
                            className="ui yellow basic button btn-days">
                            30 Day
                            </button>
                        </div>
                        <div className="col col-md-3 col-6 flexy mb-3">
                            <button 
                            onClick={()=>{switchBtn(2,90)}}
                            className="ui yellow basic button btn-days">
                            90 Day
                            </button>
                        </div>
                        <div className="col col-md-3 col-6 flexy mb-3">
                            <button 
                            onClick={()=>{switchBtn(3,365)}}
                            className="ui yellow basic button btn-days">
                            1 Year
                            </button>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default BergChart
