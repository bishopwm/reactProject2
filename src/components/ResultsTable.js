import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeaderColumn from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import nytLogo from '../nyt_logo.png';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

class ResultsTable extends Component {

getArticleData = () => {
    // let newsImage = document.createElement('img');
    // newsImage.src = {nytLogo};
    const articleData = [];
    let stories = this.props.stories ? this.props.stories : this.props.stories;
    articleData.push(stories.map((eachStory, i) => {
        return (
            {   
                //id: i,
                newsProvider: "https://www.stlawu.edu/library/sites/default/files/styles/jumbo/public/nyt-logo.png?itok=sgGkny6o",
                headline: eachStory.headline.main,
                brief: eachStory.lead_paragraph.substring(0, 400) + " [...]"
            }
        );
    }));
    return articleData.shift();
}

    getColumns = () => {
        const columns = [
            {
            dataField: "newsProvider",
            text: "Source",
            formatter: (cell) => {
                return ( 
                    <img src={cell} style={{width: '90%'}}></img>
                )}
            },
            // {
            // dataField: 'id',
            // text: 'ID'
            // }, {
            {
            dataField: 'headline',
            text: 'Article Headline',
            sort: true
            }, {
            dataField: 'brief',
            text: 'Article Snippet',
            sort: true
            }
        ];
        return columns;
    }

    // imageFormatter = (cell) => {
    //     return `<img src=${cell}></img>`
    // }

    getPaginationOptions = () => {
        const pagination = paginationFactory({
            sizePerPage: 2
        });
        return pagination;
    }

    getExpansionOptions = () => {
        const expandRow = {
            renderer: row => (
            <div>
                  <h3>Surprise, Betch!</h3>
                  <img src={nytLogo} alt="nyt"></img>
            </div>
            )
          };
        return expandRow;
    }

    render() {
        return (
            <div>
                
                <BootstrapTable keyField='headline' 
                data={ this.getArticleData() } 
                columns={ this.getColumns() } 
                pagination={ this.getPaginationOptions() } 
                expandRow={ this.getExpansionOptions() }
                ></BootstrapTable>
            </div>
        );
    }
}

export default ResultsTable;