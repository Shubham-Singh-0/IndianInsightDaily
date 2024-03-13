import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defultprops = {
        country: "in",
        pageSize: 8,
        category: "general"

    }

    static propType = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }




    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)}- kalTak`;
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a0e8a0c29684cf0aaf0d9f57f6d0141&page=1&pageSize=${this.props.pageSize}`

        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false


        })
    }
    // handlePrevClick = async () => {
    //     console.log("previous");
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a0e8a0c29684cf0aaf0d9f57f6d0141&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true });

    //     let data = await fetch(url);
    //     let parsedData = await data.json()

    //     this.setState({
    //         page: this.state.page - 1,
    //         articles: parsedData.articles,
    //         loading: false


    //     })
    // }

    // handleNextClick = async () => {
    //     console.log("Next");
    //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {



    //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8a0e8a0c29684cf0aaf0d9f57f6d0141&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //         this.setState({
    //             loading: true
    //         });

    //         let data = await fetch(url);
    //         let parsedData = await data.json()
    //         this.setState({
    //             page: this.state.page + 1,
    //             articles: parsedData.articles,
    //             loading: false


    //         })

    //     }

    // }

    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1})
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&
          category=${this.props.category}&apiKey=8a0e8a0c29684cf0aaf0d9f57f6d0141&page=1&
          pageSize=${this.props.pageSize}`

        
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            
           })

    };


    render() {
        return (
            <>
                <h1 className="my-3 text-center" >KalTak - Top   {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spiner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spiner />}
                >
                    <div className="container">
                        <div className="row ">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-2 " key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                        imageUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}

                                    />

                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between"> 
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>  */}
            </>
        )
    }
}

export default News
