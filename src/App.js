import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import dropdownNames from './dropdownNames.json';
import Pulse from './components/Pulse';
import MyStuff from './components/MyStuff';


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
  query: "",
  travelAdvisories: [],
  homeButtonClicked: false,
  articles: [],
  homeSelectionMade: false,
  queryReady: false,
  country: "Country"
};

componentDidMount = () => {
  this.getAllStories();
  this.getCovidStats();
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

getStories = () => {
  axios.get("https://ironrest.herokuapp.com/willbcollection").then(response => {
      this.setState({
          articles: response.data
      })
  })
}

saveStories = (eachStory) => {
  axios.post("https://ironrest.herokuapp.com/willbcollection", {eachStory}).then(response => {
      console.log(response)
      let articles = [...this.state.articles]
      articles.push(response.data.ops[0])
      this.setState({
          articles
      })
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
      this.setState({
        query: undefined
      })
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

handleRedirect = () => {
  this.setState({
    homeButtonClicked: true
  })
  console.log("current url: ", this.props.history.location.pathname);
  this.props.history.location.pathname = '/pulse'
}

handleSelection = (e) => {
  this.setState({
    query: e.target.value,
    queryReady: true,
    country: e.target.value
  })
}

render() { 
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link className="nav-link" to={`/`}>Home</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to={`/pulse`}>Pulse</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/my-stuff`}>My Stuff</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="jumbotron">
          <div className="search-container">
            <h1 className="display-4">{this.state.country} Pulse</h1>
            <p className="lead">A succinct summary of a country's top news, outbreak information, and travel tools.</p>
            <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              </div>
              <div className="input-group mb-3">
                <form onSubmit={(e) => this.handleSubmission(e)}>
                  <select onChange={(e)=>this.handleSelection(e)} className="custom-select" id="inputGroupSelect02">
                    <option>Choose...</option>
                    {this.getDropdownNames()}
                  </select>
                  {this.state.query.length > 0 ? <button className="btn btn-info" id="submit-button" type="submit" onClick={() => this.handleRedirect()}>Let's Go</button> : <button disabled className="btn btn-info" id="submit-button" type="submit" onClick={() => this.handleRedirect()}>Make selection</button>}
                  {/* <button className="btn btn-info" id="submit-button" type="submit" onClick={() => this.handleRedirect()}>Let's Go</button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      <Switch>
        <Route exact path='/pulse' render={(props) => <Pulse {...props} 
          stories={this.state.stories} 
          covidStats={this.state.covidStats}         
          dataReady={this.state.dataReady} 
          query={this.state.query}
          articles={this.state.articles}
          getStories={this.getStories}
          saveStories={this.saveStories}
          cityStat={this.state.cityStat}
          travelAdvisories={this.state.travelAdvisories}
          />}></Route>
        <Route exact path='/my-stuff' render={(props) => <MyStuff {...props} articles={this.state.articles}/>} ></Route>
      </Switch>
      </div>
    )
  }
} 
export default withRouter(App);
