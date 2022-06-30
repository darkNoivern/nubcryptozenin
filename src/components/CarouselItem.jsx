import React from 'react'
import './style.css'

const CarouselItem = (props) => {
    return (
        <>

            <div className="flexy">
                <div className="gradient carousel-card">
                    <div className="glass carousel-card">
                        <div className="carousel-card-img-container flexy">
                            <img className="bitcoin-img mt-2" src={props.crypto.image} alt={props.crypto.name} />
                        </div>
                        <div className="carousel-card-data-container mt-3 px-3 d-flex justify-content-between">
                            <span className="carousel-card-sym">
                                {props.crypto.symbol.toUpperCase()}
                            </span>
                            {
                                props.crypto.price_change_percentage_24h.toFixed(2) >= 0.0 ?
                                    <span className="carousel-card-percent per_change text-success">
                                        +{props.crypto.price_change_percentage_24h.toFixed(2)}%
                                    </span>
                                    :
                                    <span className="carousel-card-percent per_change text-danger">
                                        {props.crypto.price_change_percentage_24h.toFixed(2)}%
                                    </span>
                            }
                        </div>
                        <div className="carousel-card-value-container mt-3 text-center">
                            ${props.crypto.current_price.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarouselItem
