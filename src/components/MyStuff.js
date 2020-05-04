import React, { Component } from 'react';
import '../components/MyStuff.css';
import axios from 'axios';

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
                <li className="list-group-item articles-list-item list-group-item-primary" key={i}>
                    <button className="btn btn-danger" id="remove-button" onClick={() => this.removeArticle(i)}>Remove</button>
                    {eachArticle.eachStory.headline.main}
                </li>
            )
        })
    }

    render() {
        console.log("this:", this)
        return (
            <div>
                <div>
                    <ul className="col-8 list-group saved-articles-list">
                    <h3 id="saved-articles">My Saved Articles</h3>
                    {/* {this.getSavedArticles()} */}
                    {this.showArticles()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default MyStuff;