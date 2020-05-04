import React, { Component } from 'react';
import TopStories from './TopStories';
import CovidCases from './CovidCases';
import TravelAdvisories from './TravelAdvisories';

class Results extends Component {
    render() {
        return (
            <div>
                <div className="content-container">
                    <div className="main-content col-4">
                        <TopStories 
                        stories={this.props.stories} 
                        dataReady={this.props.dataReady} 
                        covidStats={this.props.covidStats}
                        query={this.props.query}
                        articles={this.props.articles}
                        getStories={this.props.getStories}
                        saveStories={this.props.saveStories}
                        />
                    </div>
                    <div className="main-content col-4">
                        <CovidCases 
                        cityStat={this.props.cityStat}
                        dataReady={this.props.dataReady} 
                        covidStats={this.props.covidStats}
                        query={this.props.query}
                        />
                    </div>
                    <div className="main-content col-4">
                        <TravelAdvisories 
                        dataReady={this.props.dataReady} 
                        query={this.props.query}
                        travelAdvisories={this.props.travelAdvisories}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Results;