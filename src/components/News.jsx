import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LoaderPage from './Loading'
import './style.css'
import './makeup.css'

const News = () => {
    const [news, setNews] = useState([]);
    async function getData() {
        let responseJsonData = await axios.get(
            `
            https://api.nytimes.com/svc/search/v2/articlesearch.json?q=cryptocurrency&api-key=PuDQaAXu6eJqLqI5S8I5AMThmBtFdBKn
            `
            // https://bing-news-search1.p.rapidapi.com/news/search?q=cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=10
            // https://api.cognitive.microsoft.com/bing/v7.0/news?q=weather
        );
        console.log(responseJsonData.data.response.docs);
        setNews(responseJsonData.data.response.docs);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        (!news) ? <LoaderPage /> :
            <>
                <div className="abril flexy my-lg-5 my-3 text-warning">
                    Crypto News
                </div>
                <div className="row mx-0">
                    {
                        news.map((nexus, index) => {
                            return (
                                <>
                                    <div className="col col-lg-4 mb-4 col-md-6 col-12">
                                        <div className="card bg-dark text-white">
                                            <h5 className="card-header">{nexus.headline.main}</h5>
                                            <div className="card-body">
                                            <div className="card-body-text mb-3">
                                            {nexus.lead_paragraph}
                                            </div>
                                            <a href={nexus.web_url}>
                                            <button className="btn btn-outline-light btn-read">
                                            Read More...
                                            </button>
                                            </a>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </>
    )
}

export default News
