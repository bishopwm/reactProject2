import React, { Component } from 'react';
import TopStories from './TopStories';
import CovidCases from './CovidCases';
import TravelAdvisories from './TravelAdvisories';
import './Pulse.css';
import flights from '../flights.jpg';
import hotels from '../hotels.jpg';
import stockMap from '../stock_map.jpg';

class Results extends Component {
    render() {
        return (
            <div id="content1">
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
                        <TravelAdvisories 
                        dataReady={this.props.dataReady} 
                        query={this.props.query}
                        travelAdvisories={this.props.travelAdvisories}
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
                </div>
                <div className="travel-container">
                    <div id="travel-content">
                        <div className="travel-search">
                            <h2>Travel Tools</h2>
                            <i>Search flight prices in real time — Browse flights and hotels by destination and date.</i>
                            <hr></hr>
                        </div>
                        <div className="card-container">
                            <div className="card">
                                <div className="card-body">
                                    <img alt="airplane" src={flights} id="travel-image"></img>
                                    {/* <h5 className="card-title">Flights</h5> */}
                                    <div className="skyscanner" data-skyscanner-widget="SearchWidget" data-origin-iata-code="'JFK'" data-origin-geo-lookup="true" data-target="_blank"></div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <img alt="hotel" src={hotels} id="travel-image"></img>
                                    {/* <h5 className="card-title">Hotels</h5> */}
                                    <div data-skyscanner-widget="HotelSearchWidget"></div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <img alt="hotel" src={stockMap} id="travel-image"></img>
                                    {/* <h5 className="card-title">Hotels</h5> */}
                                    <div
                                    data-skyscanner-widget="InsiderTipsWidget"
                                    data-tip-type="month_price"
                                    data-origin-name="'Bristol'"
                                    data-destination-name="'Barcelona'"
                                    data-origin-geo-lookup="true"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        );
    }
}

export default Results;

