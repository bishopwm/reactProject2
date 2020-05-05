import React, { Component } from 'react';
import './CovidCases.css';
import covid19 from '../covid19.jpg';

class CovidCases extends Component {
 

showCovidStats =  () => {
    let cityStat = this.props.covidStats.find((specificStat) => {
        return specificStat.country_name.toLowerCase() === this.props.query.toLowerCase();
      });
    
    console.log("query ready?", this.props.query, cityStat, this.props.covidStats);
    if(this.props.query !== ""){
        return (
        <li className="list-group-item all-covid-stats">
            <p className="country-name"><strong>{cityStat.country_name}</strong></p>
            <p><strong>Cases: </strong>{cityStat.cases}</p>
            <p><strong>Deaths: </strong>{cityStat.deaths}</p>
            <p><strong>Tests per mil: </strong>{cityStat.tests_per_1m_population}</p>
            <p><strong>Deaths/Million: </strong>{cityStat.deaths_per_1m_population}</p>
            <p><strong>Serious/Critical: </strong>{cityStat.serious_critical}</p>
            <p><strong>Total Recovered: </strong>{cityStat.total_recovered}</p>
            <hr></hr>
            <p id="more-link"><strong><h5>Looking for more?</h5></strong>View comphrensive stats on <a href="https://coronavirus.jhu.edu/map.html">Johns Hopkins' Resource Center</a>.</p>
        </li>)
    } else {
        let fixedStats = this.props.covidStats;
        fixedStats.splice(0, 1);
        return fixedStats.map((eachStat) => {
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
                    <h1>Coronavirus</h1>
                    <img src={(covid19)} id="covidpng" alt=""></img>    
                    {this.props.dataReady ? this.showCovidStats() : "Loading..."}
                </ul>
            </div>
        );
    }
}

export default CovidCases;