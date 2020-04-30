import React, { Component } from 'react';
import '../components/MyStuff.css';
import axios from 'axios';

class MyStuff extends Component {

    state = {
        removeClicked: false
    }

    componentDidMount(){
        console.log("propssss", this.props.articles)
    }

    removeArticle = async (i) => {
        console.log("remove article", i)
        let articlesRetrieved = this.props.articles;
        console.log(articlesRetrieved[i]._id)
        await axios.delete("https://ironrest.herokuapp.com/willbcollection/" + articlesRetrieved[i]._id).then(response => {
            console.log(response)
        });
        console.log("this.props.articles during remove", this.props.articles)
        this.props.articles.splice(i, 1);
        this.forceUpdate();
    }

    getSavedArticles = () => {
        let articlesRetrieved = this.props.articles;
        return articlesRetrieved.map((eachArticle, i) => {
            return (
            <li className="list-group-item" key={eachArticle._id}>
                <p className="article-headline">{eachArticle.eachStory.headline.main}</p>
                <button onClick={() => this.removeArticle(i)}>Remove</button>
            </li>
            )
        });
    }

    getUpdatedArticles = () => {
        let updatedArticles = [...this.state.updatedArticles]
        return updatedArticles.map((eachArticle, i) => {
            return (
            <li className="list-group-item" key={eachArticle._id}>
                <p className="article-headline">{eachArticle.eachStory.headline.main}</p>
                <button onClick={() => this.removeArticle(i)}>Remove</button>
            </li>
            )
        }); 
    }

    render() {
        console.log("updated articles?", this.props.articles)
        return (
            <div>
                <div>
                    <ul>
                    <h3 id="saved-articles">My Saved Articles</h3>
                    {this.getSavedArticles()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default MyStuff;