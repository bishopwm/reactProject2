import React, { Component } from 'react';

class TravelAdvisories extends Component {
    showAdvisories = () => {      
        let advisories = this.props.travelAdvisories 
        console.log("hollller", advisories)
        return <p>{advisories.description}</p>
        // return advisories.map((eachAdvisory) => {
        //     return (
        //         <li className="list-group-item">
        //             <p>{eachAdvisory.description}</p>
        //         </li>
        //     );
        // });
    };
    
    
        render() {
            return (
                <div>
                    <ul className="list group">
                        <h1>Travel Advisories</h1>
                        {this.props.dataReady ? this.showAdvisories() : "Loading..."}
                    </ul>
                </div>
            );
        }
    }

export default TravelAdvisories;