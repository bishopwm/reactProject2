import React, { Component } from 'react';
import './CovidCases.css';

class CovidCases extends Component {
 

showCovidStats =  () => {
    let allStats = this.props.covidStats
    // allStats.splice(0, 1);
    console.log("all covid stats", allStats);
    if(this.props.queryReady === true){
        return (
        <li className="list-group-item all-covid-stats">
            <p className="country-name"><strong>{this.props.cityStat.country_name}</strong></p>
            <p><strong>Cases: </strong>{this.props.cityStat.cases}</p>
            <p><strong>Deaths: </strong>{this.props.cityStat.deaths}</p>
            <p><strong>Tests per mil: </strong>{this.props.cityStat.tests_per_1m_population}</p>
        </li>)
    } else {
        return this.props.covidStats.map((eachStat) => {
            return (
                <li className="list-group-item all-covid-stats" key={eachStat.country_name}>
                    <p className="country-name"><strong>{eachStat.country_name}</strong></p>
                    <p><strong>Cases: </strong>{eachStat.cases}</p>
                    <p><strong>Deaths: </strong>{eachStat.deaths}</p>
                    <p><strong>Tests/million people: </strong>{eachStat.tests_per_1m_population}</p>
                </li>
            );
        })
    }
}

    render() {
        return (
            <div>
                <ul className="list group article-list">
                    <h3>Covid-19 Data</h3>
                    {this.props.dataReady ? this.showCovidStats() : "Loading..."}
                </ul>
            </div>
        );
    }
}

export default CovidCases;