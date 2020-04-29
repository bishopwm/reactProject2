import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import TopStories from './components/TopStories';
import CovidCases from './components/CovidCases';
import axios from 'axios';
import dropdownNames from './dropdownNames.json';
import TravelAdvisories from './components/TravelAdvisories';

// --> API credentials for Stories-NYTs
let baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
let key = "kyYo208otidmmu0E7303fCGUBy5IbJhV";

// --> API credentials for COVID-19 stats
let c_baseUrl = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php"
let config = {
  headers: {
    "X-RapidAPI-Key": "8e983a8afemsh48d560cda2e9f8bp1cfb60jsn5380fb86e94b",
    "X-RapidAPI-Host": "coronavirus-monitor.p.rapidapi.com"
  }
}

class App extends Component {

state = {
  stories: [],
  dataReady: false,
  covidStats: [],
  query: "usa",
  travelAdvisories: []
};

componentDidMount = () => {
  this.getAllStories();
  this.getCovidStats();
  this.getTravelAdvisories();
};

// Handle submission on main form & use .find() method to match form input with covid stats
handleSubmission = async (e) => {
  e.preventDefault();
  console.log(e.target[0].name + " " + e.target[0].value)
  let submittedQuery = e.target[0].value
  console.log(submittedQuery);
  let cityStat = await this.state.covidStats.find((specificStat) => {
    return specificStat.country_name.toLowerCase() === submittedQuery.toLowerCase();
  })  
  this.setState({
    query: submittedQuery,
    cityStat: cityStat
  }, this.getAllStories)
this.getTravelAdvisories(); //call all query-based components again after query is submitted.
}


// Call NYT API and save response to state
getAllStories = () => {
  console.log(this.state)
  console.log(baseUrl + "q=" + this.state.query + "&api-key=" + key)
  axios.get(baseUrl + "q=" + this.state.query + "&api-key=" + key)
  .then(response => {
      console.log("heyhey", response.data.response.docs)
      this.setState({
          stories: response.data.response.docs, 
          dataReady: true
      })
  })
  .catch(err => {
      console.log(err)
  })
}

// Call COVID API and save response to state
getCovidStats = () => {  
  axios.get(c_baseUrl, config)
  .then(response => {
    console.log(response)
      this.setState({
          covidStats: response.data.countries_stat, 
      })
  })
  .catch(err => {
      console.log(err)
  })
}

getTravelAdvisories = () => {
  axios.get("https://cors-anywhere.herokuapp.com/https://www.gov.uk/api/content/foreign-travel-advice/" + this.state.query.toLowerCase())
  .then(response => {
    console.log(response)
      this.setState({
          travelAdvisories: response.data, 
      })
  })
  .catch(err => {
      console.log(err)
  })
}

// Map country_name field from Covid API response to country options list
getDropdownNames = () => {  
  let names = dropdownNames;
  let namesList = names.map((eachName) => {
    return <option key={eachName.country_name}>{eachName.country_name}</option>
  })
  let alphaSorted = namesList.sort(function(a,b){
      if (a.key < b.key) return -1;
      else if (a.key > b.key) return 1;
      return 0;
    })
  return alphaSorted;
}

render() {  
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
              <Link className="nav-link" to={`/`}>Home<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to={`/`}>Link</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/`}>Link</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="jumbotron">
          <div className="search-container">
            <h1 className="display-4">Country Pulse</h1>
            <p className="lead">A succinct summary of a country's top news, outbreak information, and travel tools.</p>
            <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              </div>
              <div className="input-group mb-3">
                <form onSubmit={(e) => this.handleSubmission(e)}>
                  <select className="custom-select" id="inputGroupSelect02">
                    <option>Choose...</option>
                    {this.getDropdownNames()}
                  </select>
                  <button className="btn btn-info" id="submit-button" type="submit">Let's Go!</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="content-container">
          <div className="col-3">
            <TopStories 
            stories={this.state.stories} 
            dataReady={this.state.dataReady} 
            covidStats={this.state.covidStats}
            query={this.state.query}
            />
          </div>
          <div className="col-3">
            <CovidCases 
            cityStat={this.state.cityStat}
            dataReady={this.state.dataReady} 
            covidStats={this.state.covidStats}
            query={this.state.query}
            />
          </div>
          <div className="col-5">
            <TravelAdvisories 
            dataReady={this.state.dataReady} 
            query={this.state.query}
            travelAdvisories={this.state.travelAdvisories}
            />
          </div>
        </div>
      </div>
    );
  }
} 
export default App;
