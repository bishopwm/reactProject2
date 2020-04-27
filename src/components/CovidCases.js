import React, { Component } from 'react';
import './CovidCases.css';

class CovidCases extends Component {

componentDidMount() {
    console.log(this.props)
}    

showCovidStats() {
    console.log(this.props.covidStats)
    
    let covidStats = this.props.covidStats ? this.props.covidStats : this.props.covidStats;
    return covidStats.map((eachStat) => {
        
        return (
            <li className="list-group-item" key={eachStat.country_name}>
                <p className="article-headline">{eachStat.country_name}</p>
                <p className="article-headline">{eachStat.cases}</p>
            </li>
        );
    });
}


    render() {
        return (
            <div>
                <ul className="list group col-8 article-list">
                    <h1>Covid Cases</h1>
                    {this.props.dataReady ? this.showCovidStats() : "Loading..."}
                </ul>
            </div>
        );
    }
}

export default CovidCases;