import React, { Component } from 'react';
import './TravelAdvisories.css';

class TravelAdvisories extends Component {
    showAdvisories = () => {      
        let advisories = this.props.travelAdvisories 
        if(this.props.query === undefined){
            return (
                <li className="list-group-item">No advisory information available</li> 
            )
        } else if (this.props.query === "UK" || this.props.query === "" || this.props.query === null) {
            return <li className="list-group-item">No advisory information available</li>
        } else {
            return ( 
                <li className="list-group-item">
                    <p><strong>{advisories.title.toUpperCase()}</strong></p>
                    <p><strong>Last Update: </strong>{advisories.updated_at.replace(/T.*$/,"")}</p>
                    <p><strong>Summary: </strong>{advisories.description.replace(/ and information on returning to the UK./ig, '.')}</p>
                    <p><strong>Details: </strong>{advisories.details.summary.replace( /(<([^>]+)>)/ig, '')}</p>
                </li> 
        )};
    }
    
    
        render() {
            return (
                <div>
                    <ul className="list group article-list">
                        <h3>Travel Advisories</h3>
                        {/* <img src='../src/images/govuk.png' alt="UK government logo"></img> */}
                        {this.props.dataReady ? this.showAdvisories() : "Loading..."}
                    </ul>
                </div>
            );
        }
    }

export default TravelAdvisories;

