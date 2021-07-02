import QueryBuilderWrapper from "./QueryBuilderComponent";
import React from "react";
import {connect} from 'react-redux';
import queryActions from '../actions/actions';

import TreeQueryBuilder from 'tree-query-builder';
import PathQueryBuilder from 'path-query-builder';

const query = {
  "id": "1",
  "rules": [
    {
      "id": "1",
      "field": "address",
      "value": "",
      "operator": "="
    },
    {
      "id": "2",
      "rules": [
        {
          "id": "1",
          "field": "twitter",
          "value": "",
          "operator": "<"
        },
      ],
      "combinator": "or"
    },
    {
      "id": "3",
      "field": "twitter",
      "value": "",
      "operator": "!="
    }
  ],
  "combinator": "and"
};

class App extends React.Component {
  componentDidMount() {
    this.initBuilder(true, query);
    this.initBuilder(false, query);
    this.fileRef = React.createRef();
    this.fileRef2 = React.createRef();
  }
  showQuery = (query) => () =>{
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(query)], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = 'query.json';
    a.click();
  }

  initBuilder = (isTreeBuilder, query) => {
    if (isTreeBuilder) {
      this.builderTree = new TreeQueryBuilder(query);
      this.builderTree.subscribe((query) => {
        this.props.dispatch(queryActions.updateQuery2(query));
      });
    } else {
      this.builder = new PathQueryBuilder(query);
      this.builder.subscribe((query) => {
        this.props.dispatch(queryActions.updateQuery1(query));
      });
    }
  }

  upload = (isTreeBuilder) => () => {
    let file = '';
    isTreeBuilder ? [file] = this.fileRef.current.files : [file] = this.fileRef2.current.files;
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onloadend = () => {
      this.initBuilder(isTreeBuilder, JSON.parse(fileReader.result))
    }
  }

  render() {
    return (
      <div className="row">
        <div className="column">
          <div className="wrapper">
            <QueryBuilderWrapper query={this.props.query} root={true} builder={this.builder}/>
            <button className="export-btn" onClick={this.showQuery(this.props.query)}>Export JSON</button>
            <input className="import-file" type="file" onChange={this.upload(false)} ref={this.fileRef2}/>
          </div>
        </div>
        <div className="column">
          <div className="wrapper">
            <QueryBuilderWrapper query={this.props.query2} root={true} builder={this.builderTree}/>
            <button className="export-btn" onClick={this.showQuery(this.props.query2)}>Export JSON</button>
            <input className="import-file" type="file" onChange={this.upload(true)} ref={this.fileRef}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {query, query2} = state;
  return {query, query2};
};
export default connect(mapStateToProps)(App);
