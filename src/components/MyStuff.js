import React, { Component } from 'react';
import '../components/MyStuff.css';
import axios from 'axios';
import nytLogo from '../nyt_logo.png';

class MyStuff extends Component {

    removeArticle = async (i) => {
        console.log("remove article", i)
        let articlesRetrieved = this.props.articles;
        console.log(articlesRetrieved[i]._id)
        await axios.delete("https://ironrest.herokuapp.com/willbcollection/" + articlesRetrieved[i]._id).then(response => {
            console.log(response)
        });
        //console.log("this.props.articles during remove", this.props.articles)
        this.props.articles.splice(i, 1);
        this.forceUpdate();
    }

    showArticles= () => {
        return this.props.articles.map((eachArticle, i) => {
            return (
                <li className="list-group-item articles-list-item list-group-item-light" key={i}>
                    <div>
                        <button className="btn btn-danger" id="remove-button" onClick={() => this.removeArticle(i)}>Remove</button>
                        <img alt="nyt logo" src={nytLogo} id="nyt-logo-saved"></img>
                    </div>
                    <p id="article-link">
                        <a href={eachArticle.eachStory.web_url}>{eachArticle.eachStory.headline?.main}</a>
                    </p>
                    <p>
                    {eachArticle.eachStory.pub_date?.replace(/T.*$/,"")}
                    </p>
                    <p>
                    {eachArticle.eachStory.lead_paragraph}
                    </p>
                </li>
            )
        })
    }

    // showArticlesCell= () => {
    //     return this.props.articles.eachStory.map((eachStory, i) => {
    //         return (
    //             <li className="list-group-item articles-list-item list-group-item-light" key={i}>
    //                 <div>
    //                     <button className="btn btn-danger" id="remove-button" onClick={() => this.removeArticle(i)}>Remove</button>
    //                     <img alt="nyt logo" src={nytLogo} id="nyt-logo-saved"></img>
    //                 </div>
    //                 <p id="article-link">
    //                     <a href={eachStory.cell.web_url}>{eachStory.cell.headline?.main}</a>
    //                 </p>
    //                 <p>
    //                 {eachStory.cell.pub_date?.replace(/T.*$/,"")}
    //                 </p>
    //                 <p>
    //                 {eachStory.cell.lead_paragraph}
    //                 </p>
    //             </li>
    //         )
    //     })
    // }

    render() {
        // console.log("this:", this)
        return (
            <div>
                <div>
                    <ul className="col-8 list-group saved-articles-list">
                    <h3 id="saved-articles">My Saved Articles</h3>
                    {this.showArticles()}
                    {/* {this.showArticlesCell()} */}
                    </ul>
                </div>
            </div>
        );
    }
}

export default MyStuff;