/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './Header.css';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry : 'Global'
    };
  }

  //------------------------------------------------------------------------//
  //------------------------------- General --------------------------------//
  //------------------------------------------------------------------------//
  /** Set the first letter of a string to uppercase **/
  upperCaseFirstChar(string){
    return string[0].toUpperCase() + string.substring(1);
  }

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//
  render() {

    return (
      <header className="header">
          {/* Title */}
          <h1 className="header-title">Overview - {this.upperCaseFirstChar(this.props.country)}</h1>
      </header>
    );
  }
}

export default Header;