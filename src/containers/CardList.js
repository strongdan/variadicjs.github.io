import React, { Component } from 'react';
import FuncCard from "../components/FuncCard";
import NavBar from "../components/NavBar";
import variadic from 'variadic.js';

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: "Type numbers to test function",
      funcNames: Object.keys(variadic),
      currentFunc: ""
    };
  }

  handleClick = (func, e) => {
    this.setState({currentFunc: func})
  }

  render() {
    const flexContainer = {
      marginTop: "20px",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap"
    }

    const {
      subtitle,
      funcNames,
      currentFunc
    } = this.state;

    let funcCards = funcNames.map((funcName, i) => (
        <FuncCard
          key={i}
          funcName={funcName}
          func={variadic[funcName]}
          subtitle={subtitle}
          onClickHandler={this.handleClick}
          currentFunc={currentFunc}
        />
    ));

    return (
      <div>
        <NavBar />
        <div style={flexContainer}>
          {funcCards}
        </div>
      </div>
    );
  }
}

export default CardList;
