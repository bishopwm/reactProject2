import React, { Component } from 'react';
import './CovidCases.css';

class CovidCases extends Component {
 

showCovidStats =  () => {
    console.log(this.props.cityStat, this.props.covidStats)
    //let covidStats = this.props.covidStats;

    if(this.props.query !== "miami"){
        return (
        <li className="list-group-item">
            <p className="article-headline">{this.props.cityStat.country_name}</p>
            <p className="article-headline">Cases: {this.props.cityStat.cases}</p>
            <p className="article-headline">Deaths: {this.props.cityStat.deaths}</p>
            <p className="article-headline">Tests/million people: {this.props.cityStat.tests_per_1m_population}</p>
        </li>)
    } else {
        return this.props.covidStats.map((eachStat) => {
            return (
                <li className="list-group-item" key={eachStat.country_name}>
                    <p className="article-headline">{eachStat.country_name}</p>
                    <p className="article-headline">Cases: {eachStat.cases}</p>
                    <p className="article-headline">Deaths: {eachStat.deaths}</p>
                    <p className="article-headline">Tests/million people: {eachStat.tests_per_1m_population}</p>
                </li>
            );
        })
    }
}

    render() {
        return (
            <div>
                    <h1>Covid Cases</h1>
                <ul className="list group col-8 article-list">
                    {this.props.dataReady ? this.showCovidStats() : "Loading..."}
                    {/* {this.props.dataReady ? this.showSpecificStat() : "Loading..."} */}
                </ul>
            </div>
        );
    }
}

export default CovidCases;