import React, { Component } from 'react';

class TravelAdvisories extends Component {
    showAdvisories = () => {      
        let advisories = this.props.travelAdvisories 
        console.log("hollller", advisories)
        if(this.props.query === "UK"){
            return (
                <li className="list-group-item"></li> 
            )
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
                    <ul className="list group">
                        <h3>Travel Advisories</h3>
                        {this.props.dataReady ? this.showAdvisories() : "Loading..."}
                    </ul>
                </div>
            );
        }
    }

export default TravelAdvisories;