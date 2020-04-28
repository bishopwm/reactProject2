import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import TopStories from './components/TopStories';
import CovidCases from './components/CovidCases';
import axios from 'axios';


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
  query: "miami"
};

componentDidMount = () => {
  this.getAllStories();
  this.getCovidStats();
};

handleSubmission = (e) => {
  e.preventDefault();
  console.log(e.target[0].name + " " + e.target[0].value)
  let submittedQuery = e.target[0].value
  console.log(submittedQuery);
  this.setState({
    query: submittedQuery
  }, this.getAllStories)
  console.log(this.state)
}

getAllStories = () => {
  console.log(this.state)
  console.log(baseUrl + "q=" + this.state.query + "&api-key=" + key)
  axios.get(baseUrl + "q=" + this.state.query + "&api-key=" + key)
  .then(response => {
      console.log(response)
      this.setState({
          stories: response.data.response.docs, 
          dataReady: true
      })
  })
  .catch(err => {
      console.log(err)
  })
}

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




render() {
  console.log(this.state.covidStats)
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
              <Link className="nav-link" to={`/`}>Home<span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to={`/stories`}>Top Stories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/cases`}>Cases</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="jumbotron">
          <div className="search-container">
            <h1 className="display-4">Local Pulse</h1>
            <p className="lead">A succinct summary of a region's top news, outbreak information, and travel tools.</p>
            <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              </div>
              <form onSubmit={(e) => this.handleSubmission(e)}>
                <input name="query" type="text" className="form-control" placeholder="City, Region, or Country"></input>
                <button className="btn btn-info" type="submit">Submit</button>
              </form>
            </div>
          </div>
      </div>
        <Switch>
          <Route exact path='/stories' render={(props) => 
            <TopStories 
              {...props} 
              stories={this.state.stories} 
              dataReady={this.state.dataReady} 
              covidStats={this.state.covidStats}
            />}>
          </Route>
          <Route exact path='/cases' render={(props) =>
            <CovidCases
            {...props}
            stories={this.state.stories} 
            dataReady={this.state.dataReady} 
            covidStats={this.state.covidStats}
            />}>
          </Route>
        </Switch>
      </div>
    );
  }
} 
export default App;
