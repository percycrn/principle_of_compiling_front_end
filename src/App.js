import React, { Component } from "react";
import "./App.css";
import { Table, Icon, Divider } from "antd";

function SetTextClear() {
  document.getElementById("content").value = "";
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.getLexicalResult = this.getLexicalResult.bind(this);
  }

  getLexicalResult() {
    let parameters = { text: document.getElementById("content").value };
    fetch("http://localhost:8080/lexicalAnalyser", {
      method: "post",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parameters)
    })
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
          console.log(this.state.items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const rowslength = 15;
    const columns = [
      {
        title: "Number",
        dataIndex: "number",
        key: "number",
        width: 220
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: 220
      },
      {
        title: "Content",
        dataIndex: "name",
        key: "name",
        width: 220
      }
    ];
    const { items } = this.state;
    return (
      <div className="App-darea">
        <div className="App-ddarea">
          {/* input text */}
          <div className="App-dddarea">
            <textarea
              id="content"
              clos="20"
              rows={rowslength}
              className="App-textarea"
              placeholder="please input"
            />
          </div>
          <div className="App-buttonarea">
            <p className="App-welcome">Welcome!</p>
            <p className="App-happycoding">Happy Coding!</p>
            <input
              type="button"
              value="lexical analysis"
              onClick={this.getLexicalResult}
              className="App-button"
            />
            <input
              type="button"
              value="syntax analysis"
              className="App-button"
            />
            <input
              type="button"
              value="clear text"
              className="App-button"
            />
          </div>
        </div>

        {/* lexical analyser */}
        <div className="App-tablearea">
          <p>result of lexical analysis</p>
          <Table
            columns={columns}
            size="small"
            dataSource={items}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 150 }}
          />
        </div>

        {/* syntax analyser */}
        <div className="App-ddarea">
          <label className="App-syntax">result</label>
        </div>
      </div>
    );
  }
}
export default App;
