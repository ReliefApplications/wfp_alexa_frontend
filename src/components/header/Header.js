/** Natives **/
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

/** CSS **/
import './Header.css';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry : 'Global',
      open: false,
      openArray: [
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
    };
    this.handleClickOpenMenu = this.handleClickOpenMenu.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
  }

  //------------------------------------------------------------------------//
  //------------------------------- General --------------------------------//
  //------------------------------------------------------------------------//
  /** Set the first letter of a string to uppercase **/
  upperCaseFirstChar(string){
    return string[0].toUpperCase() + string.substring(1);
  }

  handleClickOpenMenu(){
    console.log("ici");
    this.setState(state => ({ open: !state.open }));
  };

  handleClickMenu(i, e){
    e.stopPropagation();
    this.setState(state => {
      const openArray = state.openArray.map((item, j) => {
        if (j === i) {
          return !item;
        } else {
          return item;
        }
      });

      return {
        openArray
      };
    });
  };

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//
  render() {

    return (
      <header className="header">
          {/* Title */}
          <h1 className="header-title">Overview - {this.upperCaseFirstChar(this.props.country)}</h1>
          {/* Questions that the user can ask */}
          <div className="test">
            <List component="nav" >
              <ListItem button onClick={this.handleClickOpenMenu}>
                <ListItemText inset primary="What can I ask ?" />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div">
                  <ListItem>
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(0, e)}>
                        <ListItemText primary="Starred" />
                        {this.state.openArray[0] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.openArray[0]} timeout="auto" unmountOnExit>
                        <List component="div">
                          <ListItem>
                            <ListItemText primary="nested"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                  <ListItem>
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(1, e)}>
                        <ListItemText primary="Displaying the dashboard" />
                        {this.state.openArray[1] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.openArray[1]} timeout="auto" unmountOnExit>
                        <List component="div">
                          <ListItem>
                            <ListItemText primary="Pull out the information for Afghanistan and show it to me"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Get me the data for Afghanistan"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Show me the home page"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                  <ListItem>
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(2, e)}>
                        <ListItemText primary="Food & Cash distribution" />
                        {this.state.openArray[2] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.openArray[2]} timeout="auto" unmountOnExit>
                        <List component="div">
                          <ListItem>
                            <ListItemText primary="How much did WFP spend on food in Nepal?"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="How much did we spend in Pakistan?"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="What is the planned amount of cash to be distributed in Cambodia?"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="What's the value of food distributed in Bhutan?"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                  <ListItem>
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(3, e)}>
                        <ListItemText primary="Starred" />
                        {this.state.open[0] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.open[0]} timeout="auto" unmountOnExit>
                        <List component="div">
                          <ListItem>
                            <ListItemText primary="nested"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                  <ListItem>
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(4, e)}>
                        <ListItemText primary="Starred" />
                        {this.state.open[0] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.open[0]} timeout="auto" unmountOnExit>
                        <List component="div">
                          <ListItem>
                            <ListItemText primary="nested"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                  <ListItem>
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(5, e)}>
                        <ListItemText primary="Starred" />
                        {this.state.open[0] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.open[0]} timeout="auto" unmountOnExit>
                        <List component="div">
                          <ListItem>
                            <ListItemText primary="nested"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                  <ListItem>
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(6, e)}>
                        <ListItemText primary="Starred" />
                        {this.state.open[0] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.open[0]} timeout="auto" unmountOnExit>
                        <List component="div">
                          <ListItem>
                            <ListItemText primary="nested"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </div>
      </header>
    );
  }
}

export default Header;