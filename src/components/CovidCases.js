import React, { Component } from 'react';
import './CovidCases.css';

class CovidCases extends Component {
 

showCovidStats =  () => {
    console.log(this.props.cityStat, this.props.covidStats)
    if(this.props.query !== "usa"){
        return (
        <li className="list-group-item">
            <p className="article-headline"><strong>{this.props.cityStat.country_name}</strong></p>
            <p className="article-headline"><strong>Cases: </strong>{this.props.cityStat.cases}</p>
            <p className="article-headline"><strong>Deaths: </strong>{this.props.cityStat.deaths}</p>
            <p className="article-headline"><strong>Tests per mil: </strong>{this.props.cityStat.tests_per_1m_population}</p>
        </li>)
    } else {
        return this.props.covidStats.map((eachStat) => {
            return (
                <li className="list-group-item" key={eachStat.country_name}>
                    <p className="article-headline"><strong>{eachStat.country_name}</strong></p>
                    <p className="article-headline"><strong>Cases: </strong>{eachStat.cases}</p>
                    <p className="article-headline"><strong>Deaths: </strong>{eachStat.deaths}</p>
                    <p className="article-headline"><strong>Tests/million people: </strong>{eachStat.tests_per_1m_population}</p>
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