/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './Dashboard.css';
import '../../widget/Widget.css';

/** Logos **/
import foodIMG     from '../../../assets/images/logos/food.png';
import moneyIMG    from '../../../assets/images/logos/money.png';
import capacityIMG from '../../../assets/images/logos/capacity_strengthening.png';
import afghanistanDIFF from '../../../assets/images/dashboard/afghanistan.jpg';
import bangladeshDIFF from '../../../assets/images/dashboard/bangladesh.jpg';
import bhutanDIFF from '../../../assets/images/dashboard/bhutan.jpg';
import cambodiaDIFF from '../../../assets/images/dashboard/cambodia.jpg';
import dprkDIFF from '../../../assets/images/dashboard/dprk.jpg';
import indiaDIFF from '../../../assets/images/dashboard/india.jpg';
import indonesiaDIFF from '../../../assets/images/dashboard/indonesia.jpg';
import laosDIFF from '../../../assets/images/dashboard/laos.jpg';
import myanmarDIFF from '../../../assets/images/dashboard/myanmar.jpg';
import nepalDIFF from '../../../assets/images/dashboard/nepal.jpg';
import pakistanDIFF from '../../../assets/images/dashboard/pakistan.jpg';
import philippinesDIFF from '../../../assets/images/dashboard/philippines.jpg';
import srilankaDIFF from '../../../assets/images/dashboard/srilanka.jpg';
import timorlesteDIFF from '../../../assets/images/dashboard/timorleste.jpg';

/** Material UI **/
import Typography       from '@material-ui/core/Typography';
import Card             from '@material-ui/core/Card';
import CardContent       from "@material-ui/core/CardContent/CardContent";
import Grid             from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../../widget/Indicator';
import WidgetGraph     from '../../widget/Graph';
import {CustomLabelAge, CustomLabelStatus}     from "../../widget/CustomLabel";

/** Plugins **/
import { VictoryChart }  from 'victory';
import { VictoryBar   }  from 'victory';
import { VictoryAxis   }  from 'victory';
import CardMedia from "@material-ui/core/CardMedia/CardMedia";

class Dashboard extends Component {
  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//
  render() {
    /**
     * This function is used to create the data for the graphs
     */
    const tableToData = function (data, customLabel, dataToShow, valueToShow, dataDisplayed, dissagregationLabel, sortingChoice) {
      let dataSortDesc = function (a, b) {
        if (a.y < b.y) {
          return -1;
        } else if (a.y > b.y) {
          return 1;
        } else {
          return 0;
        }
      };
      let dataSortAsc = function (a, b) {
        if (a.y < b.y) {
          return 1;
        } else if (a.y > b.y) {
          return -1;
        } else {
          return 0;
        }
      };
      let res = [];
      for (let i=data.length-1; i>=0; i--) {
        if (!dataToShow && !valueToShow) {
          res.push({
            x: data[i][dissagregationLabel],
            y: data[i][dataDisplayed],
            label: data[i][dataDisplayed] + " " + data[i][dissagregationLabel] + " " + customLabel
          });
        }
        else if (data[i][dataToShow] === valueToShow) {
          res.push({
            x: data[i][dissagregationLabel],
            y: data[i][dataDisplayed],
            label: data[i][dataDisplayed] + " " + data[i][dissagregationLabel] + " " + valueToShow + " " + customLabel
          });
        }
      }
      switch (sortingChoice) {
        case "asc":
          res.sort(dataSortAsc);
          break;
        case "desc":
          res.sort(dataSortDesc);
          break;
        default:
      }
      return res;
    };
    const calculMaxValue = function(data, attribute) {
      let maxValue = 0;
      data.forEach((row) => {
        if (row[attribute] > maxValue) {
          maxValue = row[attribute];
        }
      });
      return maxValue;
    };
    this.props.importedData[2].max = Math.round(calculMaxValue(this.props.importedData[2].raw, "Number of beneficiaries")/100000)*100000+100000;
    this.props.importedData[3].max = Math.round(calculMaxValue(this.props.importedData[3].raw, "Number of beneficiaries")/100000)*100000+200000;
    const getDifferenceImage = function(country) {
      let img = '';
      let backgroundImg = '';
      switch (country) {
        case "afghanistan":
          img = afghanistanDIFF;
          backgroundImg = require('../../../assets/images/logos/afghanistan.png');
          break;
         case "bangladesh":
           img = bangladeshDIFF;
           backgroundImg = require('../../../assets/images/logos/bangladesh.png');
           break;
         case "bhutan":
           img = bhutanDIFF;
           backgroundImg = require('../../../assets/images/logos/nepal.png');
           break;
         case "cambodia":
           img = cambodiaDIFF;
           backgroundImg = require('../../../assets/images/logos/myanmar.png');
           break;
         case "dprk":
           img = dprkDIFF;
           backgroundImg = require('../../../assets/images/logos/dprk.png');
           break;
         case "india":
           img = indiaDIFF;
           backgroundImg = require('../../../assets/images/logos/india.png');
           break;
         case "indonesia":
           img = indonesiaDIFF;
           backgroundImg = require('../../../assets/images/logos/indonesia.png');
           break;
        case "laos":
           img = laosDIFF;
          backgroundImg = require('../../../assets/images/logos/laos.png');
           break;
         case "myanmar":
           img = myanmarDIFF;
           backgroundImg = require('../../../assets/images/logos/myanmar.png');
           break;
         case "nepal":
           img = nepalDIFF;
           backgroundImg = require('../../../assets/images/logos/nepal.png');
           break;
         case "pakistan":
           img = pakistanDIFF;
           backgroundImg = require('../../../assets/images/logos/pakistan.png');
           break;
         case "philippines":
           img = philippinesDIFF;
           backgroundImg = require('../../../assets/images/logos/philippines.png');
           break;
         case "srilanka":
           img = srilankaDIFF;
           backgroundImg = require('../../../assets/images/logos/india.png');
           break;
         case "timor-leste":
           img = timorlesteDIFF;
           backgroundImg = require('../../../assets/images/logos/indonesia.png');
           break;
        default:
          backgroundImg = require('../../../assets/images/logos/afghanistan.png');
      }
      document.body.style = 'background: #F0EFEF url("' + backgroundImg + '") no-repeat center center fixed; background-size: cover;';
      return img;
    };
    return (
      // The padding prevent the page to be too wide because of the option spacing
      <div>
        {/* We only show the dashboard if the matching data fetched from the rawdata is existing */}
        {this.props.importedData &&
        (
          <div>
            <Grid container spacing={24}>  {/* Spacing = space between cards */}
              {/* First column */}
              <Grid container direction="column" item xs={12} sm={1} md={3}
                    className={"gender " + (this.props.column !=="" && this.props.column !== "assistance").toString()}>
                <Grid item>
                  <Card>
                    <CardContent style={{background: "#97d700"}}>
                      <Typography color="primary"
                                  variant={"title"}
                      >
                        What assistance did we provide ?
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item> {/* item of the container that uses bootstrap breakpoints */}
                  {/* We check again if the data displayed in the widget does exist. Then, we add the widget */}
                  {this.props.importedData[0] && this.props.importedData[0].food
                  && (<WidgetIndicator  title="Metric tons of commodities provided to those in need" //The title is the text displayed above the data
                                        img={foodIMG} //The image displayed on the left of the widget
                                        data={this.props.importedData[0].food}/>)} {/* The data is the value */}
                </Grid>
                <Grid item>
                  {this.props.importedData[0] && this.props.importedData[0].cbt
                  && (<WidgetIndicator  title="Amount of cash based transfers to beneficiaries"
                                        img={moneyIMG}
                                        data={this.props.importedData[0].cbt}/>
                  )}
                </Grid>
                <Grid item>
                {this.props.importedData[1] && this.props.importedData[1].capacity_strengthening
                && (<WidgetIndicator   title="Amount invested in strengthening capacities of national actors and supporting partners"
                                       img={capacityIMG}
                                       data={this.props.importedData[1].capacity_strengthening}/>)}
              </Grid>
              </Grid>

              {/* Second column */}
              <Grid container direction="column" item xs={12} sm={7} md={5}
                    className={"gender " + (this.props.column !=="" && this.props.column !== "helped").toString()}>
                <Grid item>
                  <Card>
                    <CardContent style={{background: "#0a6eb4"}}>
                      <Typography color="primary"
                                  variant={"title"}
                      >
                        Who are the {this.props.importedData[2].total} people that we directly assisted ?
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                    <WidgetGraph  graph = {
                                      <div>
                                        <div className={"stacked-charts"}>
                                          <VictoryChart domainPadding={10}
                                                      height={55}
                                                      domain={{ x: [0, this.props.importedData[2].max] }}
                                                      padding={{ top: 5, bottom: 5, left: 100, right: 0 }}
                                        >
                                          <VictoryBar horizontal
                                                      labels={(d) => d.y}
                                                      labelComponent={<CustomLabelAge max={this.props.importedData[2].max}/>}
                                                      style  = {{
                                                        data:
                                                          { fill: (data) => {
                                                              if (data.x === "Male") {
                                                                return "#19486a";
                                                              }
                                                              else if (data.x === "Female") {
                                                                return "#26bde2";
                                                              }
                                                            },
                                                            width: 22
                                                          }
                                                      }}
                                                      animate={{
                                                        onEnter: {
                                                          duration: 300,
                                                          before: () => ({
                                                            _y: 0,
                                                          })
                                                        }
                                                      }}
                                                      data   = {tableToData(this.props.importedData[2].raw, "assisted", "Age groups", "Children (< 5)", "Number of beneficiaries", "Sex")}
                                          />
                                          <VictoryAxis dependentAxis
                                                       height={55}
                                                       label="Children (< 5)"
                                                       style={{
                                                         axis: {stroke: "#c0c0c0", strokeWidth: 2},
                                                         axisLabel: {fill: "#0a6eb4", fontSize: 10, padding: 50, angle: 360 },
                                                         tickLabels: {fontSize: 0}
                                                       }}
                                          />
                                          <VictoryAxis style={{
                                                          axis: {stroke: "#c0c0c0", strokeWidth: 1, strokeDasharray: '4,4'},
                                                          tickLabels: {fontSize: 0}
                                                        }}
                                                       offsetY={0}
                                          />
                                          <VictoryAxis  dependentAxis
                                                        orientation="top"
                                                        offsetY={0}
                                                        style={{
                                                          axis: {stroke: "#c0c0c0", strokeWidth: 1, strokeDasharray: '4,4'},
                                                          tickLabels: {fontSize: 0}
                                                        }}
                                          />
                                        </VictoryChart>

                                          <VictoryChart domainPadding={10}
                                                      height={55}
                                                      domain={{x: [0, this.props.importedData[2].max]}}
                                                      padding={{top: 5, bottom: 5, left: 100, right: 0}}
                                        >
                                          <VictoryBar horizontal
                                                      labels={(d) => d.y}
                                                      labelComponent={<CustomLabelAge max={this.props.importedData[2].max}/>}
                                                      style  = {{
                                                        data:
                                                          {
                                                            fill: (data) => {
                                                              if (data.x === "Male") {
                                                                return "#19486a";
                                                              }
                                                              else if (data.x === "Female") {
                                                                return "#26bde2";
                                                              }
                                                            },
                                                            width: 22
                                                          }
                                                      }}
                                                      animate={{
                                                        onEnter: {
                                                          duration: 300,
                                                          before: () => ({
                                                            _y: 0,
                                                          })
                                                        }
                                                      }}
                                                      data   = {tableToData(this.props.importedData[2].raw, "assisted", "Age groups", "Children (5-18)", "Number of beneficiaries", "Sex")}
                                          />
                                          <VictoryAxis  dependentAxis
                                                        height={55}
                                                        label="Children (5-18)"
                                                        style={{
                                                          axis: {stroke: "#c0c0c0", strokeWidth: 2},
                                                          axisLabel: {fill: "#0a6eb4", fontSize: 10, padding: 50, angle: 360},
                                                          tickLabels: {fontSize: 0}
                                                        }}
                                          />
                                          <VictoryAxis  offsetY={0}
                                                        style={{
                                                          axis: {stroke: "#c0c0c0", strokeWidth: 1, strokeDasharray: '4,4'},
                                                          tickLabels: {fontSize: 0}
                                                        }}
                                          />
                                        </VictoryChart>

                                          <VictoryChart domainPadding={10}
                                                      height={55}
                                                      domain={{ x: [0, this.props.importedData[2].max] }}
                                                      padding={{ top: 5, bottom: 5, left: 100, right: 0 }}
                                        >
                                          <VictoryBar horizontal
                                                      labels={(d) => d.y}
                                                      labelComponent={<CustomLabelAge max={this.props.importedData[2].max}/>}
                                                      style  = {{
                                                        data:
                                                          { fill: (data) => {
                                                              if (data.x === "Male") {
                                                                return "#19486a";
                                                              }
                                                              else if (data.x === "Female") {
                                                                return "#26bde2";
                                                              }
                                                            },
                                                            width: 22
                                                          }
                                                      }}
                                                      animate={{
                                                        onEnter: {
                                                          duration: 300,
                                                          before: () => ({
                                                            _y: 0,
                                                          })
                                                        }
                                                      }}
                                                      data   = {tableToData(this.props.importedData[2].raw, "assisted", "Age groups", "Adults (>18)", "Number of beneficiaries", "Sex")}
                                          />
                                          <VictoryAxis dependentAxis
                                                       height={55}
                                                       label="Adults (>18)"
                                                       style={{
                                                         axis: {stroke: "#c0c0c0", strokeWidth: 2},
                                                         axisLabel: {fill: "#0a6eb4", fontSize: 10, padding: 50, angle: 360 },
                                                         tickLabels: {fontSize: 0}
                                                       }}
                                          />
                                          <VictoryAxis  offsetY={0}
                                                        style={{
                                                          axis: {stroke: "#c0c0c0", strokeWidth: 1, strokeDasharray: '4,4'},
                                                          tickLabels: {fontSize: 0}
                                                        }}
                                          />
                                        </VictoryChart>
                                        </div>
                                        <div>
                                          <img src={require('../../../assets/images/logos/men.png')} alt={""} />
                                          <img src={require('../../../assets/images/logos/women.png')} alt={""} />
                                        </div>
                                      </div>

                                      }/>
                    <WidgetGraph  graph = {
                                      <VictoryChart domainPadding={10}
                                                      height={150}
                                                      domain={{ x: [0, this.props.importedData[3].max] }}
                                                      padding={{ top: 5, bottom: 5, left: 100, right: 0 }}
                                        >
                                          <VictoryBar horizontal
                                                      labels={(d) => d.y}
                                                      labelComponent={<CustomLabelStatus/>}
                                                      style  = {{
                                                        data:
                                                          { fill: (data) => {
                                                              if (data.x === "Refugees") {
                                                                return "#dd1367";
                                                              }
                                                              else if (data.x === "IDP") {
                                                                return "#97d700";
                                                              }
                                                              else if (data.x === "Residents") {
                                                                return "#0a6eb4";
                                                              }
                                                              else if (data.x === "Returnees") {
                                                                return "#67737c";
                                                              }
                                                            },
                                                            width: 22
                                                          }
                                                      }}
                                                      animate={{
                                                        onEnter: {
                                                          duration: 300,
                                                          before: () => ({
                                                            _y: 0,
                                                          })
                                                        }
                                                      }}
                                                      data   = {tableToData(this.props.importedData[3].raw, "assisted", null, null, "Number of beneficiaries", "Residence Status", "desc")}
                                          />
                                          <VictoryAxis dependentAxis
                                                       height={150}
                                                       style={{
                                                         axis: {stroke: "#c0c0c0", strokeWidth: 2},
                                                         axisLabel: {fill: "#0a6eb4", fontSize: 10, padding: 50, angle: 360 },
                                                         tickLabels: {fill: (data) => {
                                                           let sortedArray = this.props.importedData[3].raw.sort(function (a, b) {
                                                             if (a['Number of beneficiaries'] < b['Number of beneficiaries']) {
                                                               return -1;
                                                             } else if (a['Number of beneficiaries'] > b['Number of beneficiaries']) {
                                                               return 1;
                                                             } else {
                                                               return 0;
                                                             }
                                                           });
                                                             if (sortedArray[data-1]['Residence Status'] === "Refugees") {
                                                               return "#dd1367";
                                                             }
                                                             else if (sortedArray[data-1]['Residence Status'] === "IDP") {
                                                               return "#97d700";
                                                             }
                                                             else if (sortedArray[data-1]['Residence Status'] === "Residents") {
                                                               return "#0a6eb4";
                                                             }
                                                             else if (sortedArray[data-1]['Residence Status'] === "Returnees") {
                                                               return "#67737c";
                                                             }
                                                           }
                                                           ,
                                                           fontSize: 8
                                                         }
                                                       }}
                                          />
                                        </VictoryChart>
                                      }/>
                </Grid>
              </Grid>

              {/* Third column */}
              <Grid container direction="column" item xs={12} sm={2} md={4}
                    className={"gender " + (this.props.column !=="" && this.props.column !== "difference").toString()}>
                <Grid item>
                  <Card>
                    <CardContent style={{background: "#dd1367"}}>
                      <Typography color="primary"
                                  variant={"title"}
                      >
                        What difference did we make ?
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card className="indicator-container">
                    <CardContent className="widget-difference">
                      <CardMedia className="widget-difference-image"
                                 image     = {getDifferenceImage(this.props.importedData[4].raw[0].Country.toLowerCase().replace(/\s/g, ''))}
                      />
                      <Typography>
                        {this.props.importedData[4].narrative}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
