import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import AliceCarousel from 'react-alice-carousel';
import CarouselItem from './CarouselItem';
import LargeTable from './LargeTable';
import SmallTable from './SmallTable'
import { Link } from 'react-router-dom'

const Home = () => {

    const substituteData = useSelector(state => state);
    const data = substituteData[0];

    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState(data);

    const items = data.map((crypto, index) => {
        return (
            <Link exact to={`/coin/${crypto.id}`} className="text-dark">
                <CarouselItem key={index} crypto={crypto} />
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 3,
        },
        680: {
            items: 4,
        },
    };

    const getSearch = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        const newData = data.filter((crypto) => {
            let lenc = crypto.name.length;
            let lens = search.length;
            let s = crypto.name.slice(0, Math.min(lenc, lens));
            let ser = search;
            return s.toLowerCase() === ser.toLowerCase();
        });

        if (search === "") {
            setSearchData(data);
        } else {
            setSearchData(newData);
        }
    }, [search]);

    return (
        <>
            <div className="carousel-section">
                <div className="carousel-section-text text-center text-white pt-3">
                    <div className="banner logo flexy mt-3 mb-2">
                        CryptoZenin💸
                    </div>
                    Get all information regarding CryptoCurrency
                </div>
                <div className="my-5">

                    <AliceCarousel
                        className="my-4"
                        mouseTracking
                        infinite
                        autoPlayInterval={1000}
                        animationDuration={1500}
                        disableDotsControls
                        disableButtonsControls
                        responsive={responsive}
                        items={items}
                        autoPlay
                    />
                </div>
            </div>

            {/* <div className="banner text-white flexy mt-md-4 mt-2 mb-3">
            Crypto......
            </div> */}
            <div className="inputset flexy my-5">
                <input
                    className="styleInput bg-dark text-white form-control mx-2"
                    type="text"
                    placeholder="Search Currency . . . ."
                    value={search}
                    onChange={getSearch}
                />
            </div>
            <div className="dataAnalysis mb-5 flexy">
                {
                    (searchData.length > 0) ?
                        (window.innerWidth > 760 ?
                            <LargeTable data={searchData} />
                            :
                            <SmallTable data={searchData} />) :
                        <div className="unavailable text-white text-center my-5">
                            Search Unavialable
                        </div>
                }
            </div>

        </>
    )
}

export default Home
