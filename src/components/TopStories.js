import React, { Component } from 'react';
import './TopStories.css';
import MyStuff from './MyStuff';
import axios from 'axios';

class TopStories extends Component {

state = {
    articles: []
}

componentDidMount() {
    console.log(this.props)
    axios.get("https://ironrest.herokuapp.com/willbcollection").then(response => {
        this.setState({
            articles: response.data
        })
    })
}

saveArticle = (eachStory) => {
    console.log("saving article")
    // this.setState({
    //     savedArticle: {
    //         headline: eachStory.headline.main
    //     }
    // })
    axios.post("https://ironrest.herokuapp.com/willbcollection", {eachStory}).then(response => {
        console.log(response)
        let articles = [...this.state.articles]
        articles.push(response.data.ops[0])
        this.setState({
            articles
        })
    })
}

showStories = () => {
    console.log(this.props.stories)
    
    let stories = this.props.stories ? this.props.stories : this.props.stories;
    return stories.map((eachStory) => {
        return (
            <li className="list-group-item" key={eachStory.pub_date}>
                <p className="article-headline">{eachStory.headline.main}</p>
                <p className="article-lead">{eachStory.lead_paragraph}</p>
                <button onClick={() => this.saveArticle(eachStory)}>Save</button>
            </li>
        );
    });
};


    render() {
        return (
            <div>
                <MyStuff articles={this.state.articles}/>
                <div>
                    <ul className="list group article-list">
                        <h3>In the Headlines</h3>
                        {this.props.dataReady ? this.showStories() : "Loading..."}
                    </ul>
                </div>
            </div>
        );
    }
}

export default TopStories;

