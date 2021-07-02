import React, { Component } from 'react';
import '../index.css';

class RuleComponent extends Component {
  constructor(props) {
    super(props);
    this.fieldChange = this.fieldChange.bind(this);
    this.operatorChange = this.operatorChange.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.removeRule = this.removeRule.bind(this);
    this.localValueChange = this.localValueChange.bind(this);

    this.state = {
      value : this.props.query.value
    }
  }

  fieldChange(event) {
    this.props.builder.update({id: this.props.query.id, field: event.target.value});
  }

  operatorChange(event) {
    this.props.builder.update({id: this.props.query.id, operator: event.target.value});
  }

  valueChange(event) {
    this.props.builder.update({id: this.props.query.id, value: event.target.value});
  }

  localValueChange(event) {
    this.setState({value: event.target.value});
  }

  removeRule() {
    this.props.builder.delete(this.props.query.id);
  }

  render() {
    return (
      <div className="rule-wrapper mt-10 mb-5 ml-5">
        <select value={this.props.query.field} onChange={this.fieldChange}>
          <option value="address">Address</option>
          <option value="twitter">Twitter</option>
        </select>
        <select className="ml-10" value={this.props.query.operator} onChange={this.operatorChange}>
          <option value="=">=</option>
          <option value="<">{"<"}</option>
          <option value=">">></option>
          <option value="!=">!=</option>
        </select>
        <input
          className="ml-10"
          name="value"
          type="text"
          value={this.state.value}
          onBlur={this.valueChange}
          onChange={this.localValueChange}/>
        <button onClick={this.removeRule} className="ml-10">X</button>
      </div>
    );
  }
}

export default RuleComponent;