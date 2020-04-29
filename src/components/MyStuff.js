import React, { Component } from 'react';
import TopStories from './TopStories';

class MyStuff extends Component {
    componentDidMount(){
        console.log("propssss", this.props)
    }

    getSavedArticles = () => {

    }

    render() {
        return (
            <div id="my-stuff">
                My stuff goes here...
            </div>
        );
    }
}

export default MyStuff;