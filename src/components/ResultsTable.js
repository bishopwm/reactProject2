import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';



class ResultsTable extends Component {

componentDidMount = () => {
    console.log("table", this.props)
}

getProducts = () => {
    const products = [];
    let stories = this.props.stories ? this.props.stories : this.props.stories;
    products.push(stories.map((eachStory) => {
        // console.log("inside table map function", eachStory.headline.main, eachStory.lead_paragraph);
        return (
            {
                headline: eachStory.headline.main,
                brief: eachStory.lead_paragraph
            }
        );
    }));
    return products.shift();

    // const products = [
    //     {
    //         headline: "Article",
    //         brief: "An interesting snippet about the article"
    //     }  
    // ];
    // return products;
}

getColumns = () => {
    const columns = [{
        dataField: 'headline',
        text: 'Article Headline'
        }, {
        dataField: 'brief',
        text: 'Article Snippet'
        }];
    return columns;
}
    

    

    render() {
        return (
            <div>
                {/* {this.getProducts()} */}
                <BootstrapTable keyField='headline' data={ this.getProducts() } columns={ this.getColumns() }/>
            </div>
        );
    }
}

export default ResultsTable;