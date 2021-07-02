import React, { Component } from 'react';
import RuleComponent from "./RuleComponent";
import {connect} from 'react-redux';

class QueryBuilderComponent extends Component {
  constructor(props) {
    super(props);
    this.combinatorChange = this.combinatorChange.bind(this);
    this.addRule = this.addRule.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
  }

  combinatorChange(event) {
    this.props.builder.update({id: this.props.query.id, combinator: event.target.value});
  }

  addRule() {
    this.props.builder.add(this.props.query.id, {field: 'Address', value: '', operator: '='});
  }

  addGroup() {
    this.props.builder.add(this.props.query.id, {rules: [], combinator: 'and'});
  }

  removeGroup() {
    this.props.builder.delete(this.props.query.id);
  }

  render() {
    const {query: {rules}, root, builder} = this.props;
    return (
      <div className="query-builder-wrapper">
        <div className="group-wrapper pl-10">
          <select value={this.props.query.combinator} onChange={this.combinatorChange}>
            <option value="and">AND</option>
            <option value="or">OR</option>
          </select>
          <button className="ml-10" onClick={this.addRule}>+RULE</button>
          <button className="ml-10" onClick={this.addGroup}>+GROUP</button>
          {!root && <button className="ml-10" onClick={this.removeGroup}>X</button>}
          {rules && rules.map(function (rule) {
            return rule.rules ?
              <QueryBuilderWrapper query={rule} key={Date.now() + rule.id} builder={builder}/> :
              <RuleComponent query={rule} key={Date.now() + rule.id} builder={builder}/>
          })}
        </div>
      </div>
    );
  }
}

const QueryBuilderWrapper = connect()(QueryBuilderComponent);
export default QueryBuilderWrapper;