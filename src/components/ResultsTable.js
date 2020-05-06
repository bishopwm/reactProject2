import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import nytLogo from '../nyt_logo.png';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

class ResultsTable extends Component {

getArticleData = () => {
    const articleData = [];
    let stories = this.props.stories ? this.props.stories : this.props.stories;
    articleData.push(stories.map((eachStory) => {
        return (
            {   
                newsProvider: "https://www.stlawu.edu/library/sites/default/files/styles/jumbo/public/nyt-logo.png?itok=sgGkny6o",
                headline: eachStory.headline.main,
                brief: eachStory.lead_paragraph.substring(0, 400) + " [...]",
                webUrl: eachStory.web_url,
                save: eachStory
            }
        );
    }));
    return articleData.shift();
}

    saveArticle = (eachStory) => {
        //Save individual article (cell)
        this.props.saveStories(eachStory.cell);

    }

    getColumns = () => {
        const columns = [
            {
            dataField: "newsProvider",
            text: "Source",
            formatter: (cell) => {
                return ( 
                    <img src={cell} style={{width: '90%'}} alt="new york times"></img>
                )}
            },
            {
            dataField: 'headline',
            text: 'Article',
            sort: true
            }, 
            {
            dataField: 'brief',
            text: 'Brief',
            sort: true
            },
            {
            dataField: 'webUrl', 
            text: "Link",
            formatter: (cell) => {
                return (
                    <a href={cell}>View Article</a>
                )}
            }, 
            {
            dataField: 'save',
            text: "Save",
            formatter: (cell) => {
                return (
                    <button className="btn btn-info" id="save-button" onClick={() => this.saveArticle({cell})}>Save</button>
                )}
            }
        ];
        return columns;
    }

    

    getPaginationOptions = () => {
        const pagination = paginationFactory({
            sizePerPage: 2,
            sizePerPageList: [ {
                text: '4', value: 4
              } ]
        });
        return pagination;
    }

    getExpansionOptions = () => {
        const expandRow = {
            renderer: row => (
            <div>
                <h3>Surprise, Betch!</h3>
                <img src={nytLogo} alt="nyt" style={{width: '90%'}}></img>
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