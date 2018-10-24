/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './Dashboard.css';

/** Logos **/
import foodIMG     from '../../../assets/images/logos/food.png';
import moneyIMG    from '../../../assets/images/logos/money.png';
import capacityIMG from '../../../assets/images/logos/capacity_strengthening.png';

/** Material UI **/
// import Typography       from '@material-ui/core/Typography';
// import Card             from '@material-ui/core/Card';
// import CardContent      from '@material-ui/core/CardContent';
import Grid             from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../../widget/Indicator';
import WidgetGraph     from '../../widget/Graph';
import CustomLabel     from '../../widget/CustomLabel';

/** Plugins **/
import { VictoryPie   }  from 'victory';
import { VictoryChart }  from 'victory';
import { VictoryLine  }  from 'victory';
import { VictoryBar   }  from 'victory';
import { VictoryAxis   }  from 'victory';
import { VictoryTooltip   }  from 'victory';
import { VictoryStack   }  from 'victory';
import { VictoryGroup   }  from 'victory';
import { VictoryScatter   }  from 'victory';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";

class Dashboard extends Component {
  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//
  render() {
    /**
     * This function is used to create the data for the graphs
     */
    const tableToData = function (data, customLabel, dataToShow, valueToShow, dataDisplayed, dissagregationLabel, dissagregationValue, sortingChoice) {
      let dataSort = function (a, b) {
        if (a.y < b.y) {
          return -1;
        } else if (a.y > b.y) {
          return 1;
        } else {
          return 0;
        }
      };
      let res = [];
      for (let i=data.length-1; i>=0; i--)
      {
        if (data[i][dataToShow] === valueToShow) {
          // if (data[i][dissagregationLabel] === dissagregationValue) {
            res.push({
              x: data[i][dissagregationLabel],
              y: data[i][dataDisplayed],
              label: data[i][dataDisplayed] + " " + data[i][dissagregationLabel] + " " + valueToShow + " " + customLabel
            });
          // }
        }
      }
      switch (sortingChoice) {
        case "data":
          res.sort(dataSort);
          break;
        default:
      }
      return res;
    };
    return (
      // The padding prevent the page to be too wide because of the option spacing
      <div style={{ padding: 12 }}>
        {/* We only show the dashboard if the matching data fetched from the rawdata is existing */}
        {this.props.importedData &&
        (
          <div className="content-row">
            {/* First column */}
            <Grid container spacing={24} className="content-column">  {/* Spacing = space between cards */}
              {/* A widdgetIndicator can be used to show an image and a value */}
              <Grid item> {/* item of the container that uses bootstrap breakpoints */}
                {/* We check again if the data displayed in the widget does exist. Then, we add the widget */}
                {this.props.importedData[0] && this.props.importedData[0].food
                && (<WidgetIndicator title="Metric tons of commodities provided to those in need" //The title is the text displayed above the data
                                                              img={foodIMG} //The image displayed on the left of the widget
                                                              data={this.props.importedData[0].food}/>)} {/* The data is the value */}
              </Grid>
              <Grid item>
                {this.props.importedData[0] && this.props.importedData[0].cbt
                && (<WidgetIndicator title="Amount of cash based transfers to beneficiaries"
                                                              img={moneyIMG}
                                                              data={this.props.importedData[0].cbt}/>
                )}
              </Grid>
              <Grid item>
                {this.props.importedData[1] && this.props.importedData[1].capacity_strengthening
                && (<WidgetIndicator title="Amount invested in strengthening capacities of national actors and supporting partners"
                                                              img={capacityIMG}
                                                              data={this.props.importedData[1].capacity_strengthening}/>)}
              </Grid>
            </Grid>
            {/* En of the first column */}

            {/* Second column */}
            <Grid container spacing={24} className="content-column">  {/* Spacing = space between cards */}
              {/* Double bar chart example */}
              <Grid item>
                {
                  (
                    <WidgetGraph  title = "Double bar chart example"
                                  graph = {
                                    <div>
                                      <VictoryGroup horizontal
                                                    domainPadding={50}
                                                    height={170}
                                                    domain={{ x: [0, 700000] }}
                                                    padding={{ top: 0, bottom: 0, left: 40, right: 0 }}
                                      >
                                        <VictoryBar labels={(d) => d.y}
                                                    labelComponent={<CustomLabel/>}
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
                                                          width: 70
                                                        }
                                                    }}
                                                    data   = {tableToData(this.props.importedData[2].raw, "assisted", "Age groups", "Children (< 5)", "Number of beneficiaries", "Sex")}
                                        />
                                        <VictoryLine style={{ data: { strokeWidth: 3, strokeDasharray: "5, 5" } }}
                                                     data={[
                                                       { x: 0, y: "Male" },
                                                       { x: 700000, y: "Male" }
                                                     ]}
                                        />
                                        <VictoryAxis style={{ tickLabels: { "padding": 10, "fill": "black", "stroke": "transparent" } }} dependentAxis
                                                     height={170}
                                        />
                                      </VictoryGroup>
                                      {/*<VictoryChart domainPadding={50}*/}
                                                    {/*height={170}*/}
                                                    {/*domain={{ x: [0, 700000] }}*/}
                                                    {/*padding={{ top: 0, bottom: 0, left: 40, right: 0 }}*/}
                                      {/*>*/}
                                        {/*<VictoryBar*/}
                                          {/*horizontal*/}
                                          {/*labels={(d) => d.y}*/}
                                          {/*labelComponent={<CustomLabel/>}*/}
                                          {/*style  = {{*/}
                                            {/*data:*/}
                                              {/*{ fill: (data) => {*/}
                                                {/*if (data.x === "Male") {*/}
                                                  {/*return "#19486a";*/}
                                                {/*}*/}
                                                {/*else if (data.x === "Female") {*/}
                                                  {/*return "#26bde2";*/}
                                                {/*}*/}
                                                {/*},*/}
                                                {/*width: 70,*/}
                                                {/*tickLabels: null*/}
                                              {/*}*/}
                                          {/*}}*/}
                                          {/*data   = {tableToData(this.props.importedData[2].raw, "assisted", "Age groups", "Children (5-18)", "Number of beneficiaries", "Sex")}*/}
                                        {/*/>*/}
                                      {/*</VictoryChart>*/}
                                      {/*<VictoryChart domainPadding={50}*/}
                                                    {/*height={170}*/}
                                                    {/*domain={{ x: [0, 700000] }}*/}
                                                    {/*padding={{ top: 0, bottom: 0, left: 40, right: 0 }}*/}
                                      {/*>*/}
                                        {/*<VictoryBar*/}
                                          {/*horizontal*/}
                                          {/*labels={(d) => d.y}*/}
                                          {/*labelComponent={<CustomLabel/>}*/}
                                          {/*style  = {{*/}
                                            {/*data:*/}
                                              {/*{ fill: (data) => {*/}
                                                {/*if (data.x === "Male") {*/}
                                                  {/*return "#19486a";*/}
                                                {/*}*/}
                                                {/*else if (data.x === "Female") {*/}
                                                  {/*return "#26bde2";*/}
                                                {/*}*/}
                                                {/*},*/}
                                                {/*width: 70,*/}
                                                {/*tickLabels: null*/}
                                              {/*}*/}
                                          {/*}}*/}
                                          {/*data   = {tableToData(this.props.importedData[2].raw, "assisted", "Age groups", "Adults (>18)", "Number of beneficiaries", "Sex")}*/}
                                        {/*/>*/}
                                      {/*</VictoryChart>*/}
                                      {/*data   = {tableToData(this.props.importedData[2].raw, "assisted", "Age groups", "Children (5-18)", "Number of beneficiaries", "Sex")}*/}
                                      {/*data   = {tableToData(this.props.importedData[2].raw, "assisted", "Age groups", "Adults (>18)", "Number of beneficiaries", "Sex")}*/}
                                    </div>
                                  }
                    />

                )}
              </Grid>
            </Grid>

            {/* Third column */}
            <Grid container spacing={24} className="content-column">  {/* Spacing = space between cards */}

            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
