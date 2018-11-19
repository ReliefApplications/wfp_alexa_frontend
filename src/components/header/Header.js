/** Natives **/
import React, { Component } from 'react';

/** Material **/
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from "@material-ui/core/Divider/Divider";

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
    this.setState(state => {
      const openArray = state.openArray.map(() => {
        return false;
      });

      return {
        openArray,
        open: !state.open
      };
    });
  };

  handleClickMenu(i, e){
    e.stopPropagation();
    this.setState(state => {
      const openArray = state.openArray.map((item, j) => {
        if (j === i) {
          return !item;
        } else {
          return false;
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
            <List component="nav">
              <ListItem button onClick={this.handleClickOpenMenu}>
                <ListItemText inset primary="What can I ask ?"/>
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit className="test2">
                <List component="div">
                  <ListItem>
                    {/*Beneficiaries*/}
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(0, e)}>
                        <ListItemText primary="Beneficiaries"/>
                        {this.state.openArray[0] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.openArray[0]} timeout="auto" unmountOnExit>
                        <List component="div" className="test3">
                          <ListItem>
                            <ListItemText primary="How many men over 19 got food assistance in DPRK?"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="How many beneficiaries received direct assistance in the Philippines?"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="How many women from 5 to 16 years old did WFP serve in Bhutan?"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="What type of beneficiaries do we have in Laos?"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="How many children did we serve in Bangladesh?"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                  <ListItem>
                    {/*Food&Cash*/}
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(1, e)}>
                        <ListItemText primary="Food & Cash distribution"/>
                        {this.state.openArray[1] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.openArray[1]} timeout="auto" unmountOnExit>
                        <List component="div" className="test3">
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
                    {/*Capacity Building*/}
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(2, e)}>
                        <ListItemText primary="Capacity building data"/>
                        {this.state.openArray[2] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.openArray[2]} timeout="auto" unmountOnExit>
                        <List component="div" className="test3">
                          <ListItem>
                            <ListItemText primary="What is the total budget of capacity building in Cambodia"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="What's the total budget of technical assistance in Nepal"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                  <ListItem>
                    {/*Achievement ratio*/}
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(3, e)}>
                        <ListItemText primary="Achievement ratio"/>
                        {this.state.openArray[3] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.openArray[3]} timeout="auto" unmountOnExit>
                        <List component="div" className="test3">
                          <ListItem>
                            <ListItemText primary="Calculate the achievement ratio of cash distribution in Sri Lanka"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Calculate the achievement ratio of food distribution in Timor-Leste"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    {/*Dashboard*/}
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(4, e)}>
                        <ListItemText primary="Show me the dashboard"/>
                        {this.state.openArray[4] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.openArray[4]} timeout="auto" unmountOnExit>
                        <List component="div" className="test3">
                          <ListItem>
                            <ListItemText primary="Pull out the information for Afghanistan and show it to me"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Focus on what difference did we make in Pakistan"/>
                          </ListItem>
                          <ListItem>
                            <ListItemText primary="Go back to the home page"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    {/*Annual reports*/}
                    <List component="nav">
                      <ListItem button onClick={(e) => this.handleClickMenu(5, e)}>
                        <ListItemText primary="Email - Annual reports"/>
                        {this.state.openArray[5] ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={this.state.openArray[5]} timeout="auto" unmountOnExit>
                        <List component="div" className="test3">
                          <ListItem>
                            <ListItemText primary="Send me the 2017 report for Pakistan"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </ListItem>
                  {/*<ListItem>*/}
                    {/*/!*Focus*!/*/}
                    {/*<List component="nav">*/}
                      {/*<ListItem button onClick={(e) => this.handleClickMenu(1, e)}>*/}
                        {/*<ListItemText primary="Focus in the dashboard"/>*/}
                        {/*{this.state.openArray[1] ? <ExpandLess /> : <ExpandMore />}*/}
                      {/*</ListItem>*/}
                      {/*<Collapse in={this.state.openArray[1]} timeout="auto" unmountOnExit>*/}
                        {/*<List component="div" className="test3">*/}
                          {/*<ListItem>*/}
                            {/*<ListItemText primary="Who are the thousands people that we directly assisted"/>*/}
                          {/*</ListItem>*/}
                          {/*<ListItem>*/}
                            {/*<ListItemText primary="Focus on who did we help"/>*/}
                          {/*</ListItem>*/}
                          {/*<ListItem>*/}
                            {/*<ListItemText primary="What assistance did we provide"/>*/}
                          {/*</ListItem>*/}
                          {/*<ListItem>*/}
                            {/*<ListItemText primary="Focus on what difference did we make"/>*/}
                          {/*</ListItem>*/}
                        {/*</List>*/}
                      {/*</Collapse>*/}
                    {/*</List>*/}
                  {/*</ListItem>*/}
                </List>
              </Collapse>
            </List>
          </div>
      </header>
    );
  }
}

export default Header;