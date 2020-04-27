import React, { Component } from 'react';

class TopStories extends Component {



componentDidMount() {
    console.log(this.props)
}

showStories = () => {
    let stories = this.props.stories ? this.props.stories : this.props.stories;
    return <h4>{stories[0].headline.main}</h4>
}


    render() {
        return (
            <div>
                Top Stories here...
                <div>
                    {this.props.dataReady ? this.showStories() : "Loading..."}
                </div>
            </div>
        );
    }
}

export default TopStories;