import React, { Component } from "react";
import "./App.css";
import { Table } from "antd";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      lexical_items: [],
      syntax_items: []
    };
    this.getLexicalResult = this.getLexicalResult.bind(this);
    this.getSyntaxResult = this.getSyntaxResult.bind(this);
  }

  getLexicalResult() {
    document.getElementById("syntax").style.display = "none";
    document.getElementById("lexical").style.display = "inline";
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
            lexical_items: result,
            syntax_items: []
          });
          //console.log(this.state.lexical_items);
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

  getSyntaxResult() {
    document.getElementById("syntax").style.display = "inline";
    document.getElementById("lexical").style.display = "none";
    let parameters = { text: document.getElementById("content").value };
    fetch("http://localhost:8080/syntaxAnalyser", {
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
            syntax_items: result,
            lexical_items: []
          });
          //console.log(this.state.syntax_items);
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

  clearText() {
    document.getElementById("content").value = "";
  }

  render() {
    const rowslength = 15;
    const lexical = [
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
        dataIndex: "content",
        key: "content",
        width: 220
      }
    ];
    const syntax = [
      {
        title: "ErrorLine",
        dataIndex: "line",
        key: "line",
        width: 330
      },
      {
        title: "ErrorType",
        dataIndex: "type",
        key: "type",
        width: 330
      }
    ];
    const { lexical_items, syntax_items } = this.state;
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
              placeholder="please input codes here"
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
              onClick={this.getSyntaxResult}
              className="App-button"
            />
            <input
              type="button"
              value="clear text"
              className="App-button"
              onClick={this.clearText}
            />
          </div>
        </div>

        {/* lexical analyser */}
        <div className="App-tablearea" id="lexical">
          <p>result of lexical analysis</p>
          <Table
            columns={lexical}
            size="small"
            dataSource={lexical_items}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 250 }}
          />
        </div>

        {/* syntax analyser */}
        <div className="App-tablearea" id="syntax">
          <p>result of syntax analysis</p>
          <Table
            columns={syntax}
            size="small"
            dataSource={syntax_items}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 250 }}
          />
        </div>
      </div>
    );
  }
}
export default App;
