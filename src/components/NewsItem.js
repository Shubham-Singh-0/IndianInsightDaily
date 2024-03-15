import React from 'react'

const NewsItem = (props) => {


    let { title, description, imageUrl, NewsUrl, author, date, source } = props;
    return (
        <div>
            <div className="card" >
                <img src={!imageUrl ? "https://www.tagesspiegel.de/images/bundesinnenministerin-faeser-besucht-brasilien1/alternates/BASE_16_9_W1400/bundesinnenministerin-faeser-besucht-brasilien.jpeg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}....<span class="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger">
                        {source}

                    </span></h5>
                    <p className="card-text">{description}....</p>
                    <p className='card-text'><small className='text-muted'> by {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" s href={NewsUrl} target="_blank" className="btn btn-sm btn-dark btn-primary">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
