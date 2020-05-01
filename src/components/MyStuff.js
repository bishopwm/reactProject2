import React, { Component } from 'react';
import '../components/MyStuff.css';
import axios from 'axios';

class MyStuff extends Component {

    // state = {
    //     removeClicked: false
    // }

    // componentDidMount(){
    //     console.log("propssss", this.props.articles)
    // }

    removeArticle = async (i) => {
        console.log("remove article", i)
        let articlesRetrieved = this.props.articles;
        console.log(articlesRetrieved[i]._id)
        await axios.delete("https://ironrest.herokuapp.com/willbcollection/" + articlesRetrieved[i]._id).then(response => {
            console.log(response)
        });
        //console.log("this.props.articles during remove", this.props.articles)
        this.props.articles.splice(i, 1);
        this.forceUpdate();
    }

    // getSavedArticles = () => {
    //     console.log(this)
    //     let articlesRetrieved = this.props.articles;
    //     return articlesRetrieved.map((eachArticle, i) => {
    //         if(articlesRetrieved.length <= 1){
    //             return( <p>No articles saved yet</p> )
    //         } else {
    //             return (
    //             <li className="list-group-item" key={eachArticle._id}>
    //                 <p className="article-headline">{eachArticle.eachStory.headline.main}</p>
    //                 <button onClick={() => this.removeArticle(i)}>Remove</button>
    //             </li>
    //             )
    //         }
    //     });
    // }

    showArticles= () => {
        return this.props.articles.map((eachArticle, i) => {
            return (
                <li key={i}>{eachArticle.eachStory.headline.main}
                <button onClick={() => this.removeArticle(i)}>Remove</button>
                </li>
            )
        })
    }

    render() {
        console.log("this:", this)
        return (
            <div>
                <div>
                    <ul>
                    <h3 id="saved-articles">My Saved Articles</h3>
                    {/* {this.getSavedArticles()} */}
                    {this.showArticles()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default MyStuff;