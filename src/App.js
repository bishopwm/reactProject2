import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TopStories from './components/TopStories';
import axios from 'axios';


// --> API credentials for Stories-NYTs
let baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
let query = "covid";
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
  covidStats: []
};

componentDidMount = () => {
  this.getAllStories();
  this.getCovidStats();
};

getAllStories = () => {
  axios.get(baseUrl + "q=" + query + "&api-key=" + key)
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
        <h1>Local Pulse</h1>
            <Switch>
              <Route exact path='/' render={(props) => 
                <TopStories 
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
