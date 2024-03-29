import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    


    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`

        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)}- IndianInsightDaily`;
        updateNews();
        //eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        setPage(page + 1)

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&
          category=${props.category}&apiKey=${props.apiKey}&page=1&
          pageSize=${props.pageSize}`


        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)



    };



    return (
        <>
            <h1 className=" text-center" style={{ margin:'35px , 0px', marginTop: '90px' }} > Top  <b> {capitalizeFirstLetter(props.category)} </b>Headlines</h1>
            {loading && <Spiner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spiner />}
            >
                <div className="container">
                    <div className="row ">
                        {articles.map((element) => {
                            return <div className="col-md-4 my-2 " key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                    imageUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}

                                />

                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        </>
    )

}


News.defultprops = {
    country: "in",
    pageSize: 8,
    category: "general"

}

News.propType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

}

export default News
