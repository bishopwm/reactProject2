import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TopStories from './components/TopStories';
import axios from 'axios';

let baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
let query = "covid19";
let key = "kyYo208otidmmu0E7303fCGUBy5IbJhV";

class App extends Component {


  state = {
    stories: [],
    dataReady: false
  };

  componentDidMount = () => {
    this.getAllStories();
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

render() {
    return (
      <div>
        <h1>New York Times' Top World News</h1>

            <Switch>
              <Route exact path='/' render={(props) => <TopStories {...props} stories={this.state.stories} dataReady={this.state.dataReady}/>}></Route>
            </Switch>
            
      </div>
    );
  }
} 
export default App;
