import React, { Component } from 'react';
import './TopStories.css';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import headlines from '../headlines.jpg';
import nytLogo from '../nyt_logo.png';


class TopStories extends Component {

state = {
    articles: [],
    showAlert: false

}

closeAlert = () => {
    this.setState({
        showAlert: false
    })
}

componentDidMount() {
    // Get all NYT articles
    this.props.getStories();
}

saveArticle = (eachStory) => {
    //Save individual article
    this.props.saveStories(eachStory);
    this.setState({
        showAlert: true
    })

}

showStories = () => {
    let stories = this.props.stories ? this.props.stories : this.props.stories;
    console.log("nyt multimedia", this.props.stories[0].multimedia)
    return stories.map((eachStory, i) => {
        return (
            <li className="list-group-item all-articles" key={i}>
                <img alt="nyt logo" src={nytLogo} id="nyt-logo"></img>
                <p className="article-headline"><a href={ eachStory.web_url}>{ eachStory.headline.main}</a></p>
                <p className="article-publish-date"><strong>{ eachStory.pub_date.replace(/T.*$/,"")}</strong></p>
                <p className="article-lead">{eachStory.lead_paragraph}</p>
                <button className="btn btn-info" id="save-button" onClick={() => this.saveArticle(eachStory)}>Save</button>
            </li>
        );
    });
};




showArticles = () => {
    let articles = this.props.articles ? this.props.articles : this.props.articles;
    return articles.map((article, i) => {
        return (
            <li className="list-group-item" key={i}>
                <p className="article-headline">{article.eachStory.headline?.main}</p>
                <p className="article-lead">{article.eachStory.lead_paragraph}</p>
                <button onClick={() => this.removeArticle(i)}>Remove</button>
            </li>
        );
    });
}

removeArticle = async (i) => {
    console.log("remove article", i)
    let articlesRetrieved = this.props.articles;
    console.log(articlesRetrieved[i]._id)
    await axios.delete("https://ironrest.herokuapp.com/willbcollection/" + articlesRetrieved[i]._id).then(response => {
        console.log(response)
    });
    this.props.articles.splice(i, 1);
    this.forceUpdate();
}

    render() {
        return (
            <div>
                
                <div>
                    <ul className="list group article-list">
                        <h1>In the Headlines</h1>
                        <img src={(headlines)} id="headlines-img" alt=""></img>
                        <Alert show={this.state.showAlert} dismissible variant='success' onClick={this.closeAlert}>Saved</Alert>
                        {this.props.dataReady ? this.showStories() : "Loading..."}
                    </ul>
                </div>
            </div>
        );
    }
}

export default TopStories;

