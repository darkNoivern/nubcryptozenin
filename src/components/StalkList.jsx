import React from 'react'
import { useSelector } from 'react-redux'
import LargeTable from './LargeTable'
import SmallTable from './SmallTable'
import './style.css'
import './makeup.css'
import { useNavigate } from 'react-router'

const StalkList = () => {

    const substituteData = useSelector(state => state);
    const stalkIDs = substituteData[1];
    const data = substituteData[0];
    const navigate = useNavigate();

    const displayData = data.filter((yawn) => {
        return (stalkIDs.includes(yawn.id));
    })

    return (
        <>
            <div className="abril flexy my-5 text-white">
                Stalk List
            </div>
            <div className="dataAnalysis mb-5 flexy">
                {
                    (displayData.length > 0) ?
                        (window.innerWidth > 760 ?
                            <LargeTable data={displayData} />
                            :
                            <SmallTable data={displayData} />) :
                        <div className="flexy my-5">
                            <div>
                                <div className="unavailable flexy mt-3 mb-5 text-white text-center">
                                    Add Some Cryptos To Stalk
                                </div>
                                <div className="flexy">

                                    <button
                                        onClick={() => { navigate('/') }}
                                        className="ui primary button go-back-btn">
                                        Go Back
                                    </button>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default StalkList
