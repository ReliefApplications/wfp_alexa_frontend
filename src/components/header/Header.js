/** Natives **/
import React, { Component } from 'react';

/** Material UI **/
import Button       from '@material-ui/core/Button';
import Menu         from '@material-ui/core/Menu';
import MenuItem     from '@material-ui/core/MenuItem';

/** CSS **/
import './Header.css';


class Header extends Component {
  constructor(props) {
    super(props);
    this.openMiniMenu              = this.openMiniMenu.bind(this);
    this.closeMiniMenu             = this.closeMiniMenu.bind(this);
    this.selectProjectFromMiniMenu = this.selectProjectFromMiniMenu.bind(this);
    this.state = {
      anchorProject              : null,
      selectedProject : 'Global'
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
  //------------------------------ Mini Menu -------------------------------//
  //------------------------------------------------------------------------//
  /** Open Mini Menu **/
  openMiniMenu = event => {
    this.setState({
      anchorProject: event.currentTarget
    });
  };

  /** Close Mini Menu **/
  closeMiniMenu = () => {
    this.setState({ anchorProject: null });
  };


  /** When a project is selected in the menu **/
  selectProjectFromMiniMenu = (projectName) => () => {
    // Close the mini menu
    this.setState({
      anchorProject   : null,
      selectedProject : projectName
    });

    // Sending the project
    this.props.sendToHome(projectName)
  };

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//
  render() {
    const { anchorProject } = this.state;

    // var projectsList = Object.keys(this.props.importedProjects).map((item) => {
    //   return (
    //     <MenuItem key={item} onClick={this.selectProjectFromMiniMenu(item)}> {this.upperCaseFirstChar(item)} </MenuItem>
    //   );
    // });

    return (
      <header className="header">
          {/* Title */}
          <h2 className="header-title">Overview - {this.upperCaseFirstChar(this.props.projectName)}</h2>
      </header>
    );
  }
}

export default Header;