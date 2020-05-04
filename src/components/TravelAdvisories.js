import React, { Component } from 'react';
import './TravelAdvisories.css';
import govuk from '../govuk.png';
import travel from '../travel.jpg';

class TravelAdvisories extends Component {

    componentDidMount() {
    
        const script = document.createElement("script");
        script.src="https://widgets.skyscanner.net/widget-server/js/loader.js";
        script.async = true;

        document.body.appendChild(script);
    }

    showAdvisories = () => {      
        let advisories = this.props.travelAdvisories 
        // console.log("query ", this.props.query)
        if(advisories.title === undefined){
            return (
                <li className="list-group-item">No advisory information available</li> 
            )
        } else if (this.props.query === "UK" || this.props.query === "" || this.props.query === null) {
            return <li className="list-group-item">No advisory information available</li>
        } else {
            return ( 
                <li className="list-group-item all-advisories">
                    <p><strong>{advisories.title.toUpperCase()}</strong></p>
                    <div className="logo-container">
                            <h6 id="api-author">Provided by</h6>
                            <img id="govuk" src={(govuk)} alt=""></img>
                        </div>
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
                        <img src={(travel)} id="travel-img" alt=""></img>
                        {this.props.dataReady ? this.showAdvisories() : "Loading..."}
                    </ul>
                </div>
            );
        }
    }

export default TravelAdvisories;

