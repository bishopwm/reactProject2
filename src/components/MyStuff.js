import React, { Component } from 'react';
import TopStories from './TopStories';
import axios from 'axios';

class MyStuff extends Component {
    render() {
        console.log("props", this.props.articles)
        return (
            <div id="my-stuff">
                My stuff goes here...
            </div>
        );
    }
}

export default MyStuff;