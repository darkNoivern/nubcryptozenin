import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './style.css'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link exact to="/" className="navbar-brand text-warning py-2">
                        $ CryptoZenin $
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <NavLink
                                activeclassname="active"
                                className="nav-link ms-1 text-warning"
                                exact
                                to="/"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                activeclassname="active"
                                className="nav-link ms-1 text-warning"
                                exact
                                to="/news"
                            >
                                News
                            </NavLink>
                            <NavLink
                                activeclassname="active"
                                className="nav-link ms-1 text-warning"
                                exact
                                to="/stalk"
                            >
                                StalkList
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
