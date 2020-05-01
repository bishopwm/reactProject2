import React, { Component } from 'react';
import './TopStories.css';
import axios from 'axios';


class TopStories extends Component {

state = {
    articles: []
}

componentDidMount() {
   // console.log(this.props)
    this.props.getStories();
    // axios.get("https://ironrest.herokuapp.com/willbcollection").then(response => {
    //     this.setState({
    //         articles: response.data
    //     })
    // })
}

saveArticle = (eachStory) => {
    //console.log("saving article")
    this.props.saveStories(eachStory);
    // axios.post("https://ironrest.herokuapp.com/willbcollection", {eachStory}).then(response => {
    //     console.log(response)
    //     let articles = [...this.state.articles]
    //     articles.push(response.data.ops[0])
    //     this.setState({
    //         articles
    //     })
    // })
}

showStories = () => {
   // console.log(this.props)
    let stories = this.props.stories ? this.props.stories : this.props.stories;
    return stories.map((eachStory, i) => {
        return (
            <li className="list-group-item" key={i}>
                <p className="article-headline">{eachStory.headline.main}</p>
                <p className="article-lead">{eachStory.lead_paragraph}</p>
                <button onClick={() => this.saveArticle(eachStory)}>Save</button>
            </li>
        );
    });
};
showArticles = () => {
    let articles = this.props.articles ? this.props.articles : this.props.articles;
    //console.log(this)
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
    //console.log("this.props.articles during remove", this.props.articles)
    this.props.articles.splice(i, 1);
    this.forceUpdate();
}

    render() {
        return (
            <div>
                {/* <MyStuff articles={this.state.articles}/> */}
                <div>
                    <ul className="list group article-list">
                        <h3>In the Headlines</h3>
                        {this.props.dataReady ? this.showArticles() : "loading" }
                        {this.props.dataReady ? this.showStories() : "Loading..."}
                        
                    </ul>
                </div>
            </div>
        );
    }
}

export default TopStories;

