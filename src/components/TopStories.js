import React, { Component } from 'react';
import './TopStories.css';

class TopStories extends Component {

componentDidMount() {
    console.log(this.props)
}

showStories = () => {
    console.log(this.props.stories)
    
    let stories = this.props.stories ? this.props.stories : this.props.stories;
    return stories.map((eachStory) => {
        return (
            <li className="list-group-item" key={eachStory.pub_date}>
                <p className="article-headline">{eachStory.headline.main}</p>
                <p className="article-lead">{eachStory.lead_paragraph}</p>
            </li>
        );
    });
};


    render() {
        return (
            <div>
                <ul className="list group article-list">
                    <h1>Top Stories</h1>
                    {this.props.dataReady ? this.showStories() : "Loading..."}
                </ul>
            </div>
        );
    }
}

export default TopStories;

