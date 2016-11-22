import React from 'react';
import { render } from 'react-dom';
import { Button, Jumbotron, ListGroup, ListGroupItem, ProgressBar } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Main extends React.Component {

  constructor(props) {
      super(props);
      this.state = {data : null};
      this.options = {
        defaultSortName: 'datemilli',
        defaultSortOrder: 'desc',
        noDataText: 'No quizzes found!'
      };
      this.getQuizData = this.getQuizData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("Will recieve props");
  }

  componentWillMount() {
    console.log("Will mount");
  }

  componentDidMount() {
    console.log("Did mount");
    this.getQuizData();
  }

  getQuizData() {
    const thisStuff = this;
    fetch('/results')
      .then(function(response) {
      return response.json();
      })
      .then(function(data) {
        console.log("resolved");
        thisStuff.setState({data: data})
    });
  }

  componentWillUpdate() {
    console.log("Will update");
  }

  percFormatter(cell, row){
    return <ProgressBar now={cell} bsStyle={cell >= 25 ? "success" : "danger"} label={`${cell}%`} />;
  }

  render() {
    let content = null;
    if (this.state.data) {
      content = (
        <BootstrapTable exportCSV data={this.state.data} options={this.options} striped={true} hover={true}>
          <TableHeaderColumn dataField="id" isKey={true} hidden>ID</TableHeaderColumn>
          <TableHeaderColumn dataField="datemilli" dataSort={true} hidden>datemilli</TableHeaderColumn>
          <TableHeaderColumn dataField="name" width="150" dataSort={true}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="email" width="150" dataSort={true}>Email</TableHeaderColumn>
          <TableHeaderColumn dataField="class" width="150" dataSort={true}>Class</TableHeaderColumn>
          <TableHeaderColumn dataField="title" width="150" dataSort={true}>Title</TableHeaderColumn>
          <TableHeaderColumn dataField="date" width="100" dataSort={true}>Date</TableHeaderColumn>
          <TableHeaderColumn dataField="grade" width="50" dataSort={true} dataAlign='center'>Mark</TableHeaderColumn>
          <TableHeaderColumn dataField="percentage" width="150" dataFormat={this.percFormatter} dataSort={true}>%</TableHeaderColumn>
          <TableHeaderColumn dataField="score" width="50" dataSort={true} dataAlign='center'>Score</TableHeaderColumn>
          <TableHeaderColumn dataField="maxscore" width="50" dataSort={true} dataAlign='center'>Max</TableHeaderColumn>
          <TableHeaderColumn dataField="time" width="100" dataSort={true}>Time</TableHeaderColumn>
        </BootstrapTable>
      );
    }
    return(
      <div>
        <Jumbotron>
          <h1>Quiz results</h1>
        </Jumbotron>
        {content ? content : <div className="loading">Loading ...</div>}
      </div>
    );
  }
}

export default Main;
