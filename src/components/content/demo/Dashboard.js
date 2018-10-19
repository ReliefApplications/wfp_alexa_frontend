/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './Dashboard.css';

/** Logos **/
import mapIMG        from '../../../assets/images/logos/map.png';
import mapathonsIMG  from '../../../assets/images/logos/mapathons.png';
import projectsIMG   from '../../../assets/images/logos/projects.png';
import trainingIMG   from '../../../assets/images/logos/training.png';

/** Material UI **/
// import Typography       from '@material-ui/core/Typography';
// import Card             from '@material-ui/core/Card';
// import CardContent      from '@material-ui/core/CardContent';
import Grid             from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../../widget/Indicator';
import WidgetGraph     from '../../widget/Graph';

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
    console.log(this.props.importedData);
    return (
      // The padding prevent the page to be too wide because of the option spacing
      <div style={{ padding: 12 }}>
        {/* We only show the dashboard if the matching data fetched from the rawdata is existing */}
        {this.props.importedData &&
        (
          <div>
            {/* First row */}
            <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
              {/* A widdgetIndicator can be used to show an image and a value */}
              <Grid item xs={12} sm={6} md={3}> {/* item of the container that uses bootstrap breakpoints */}
                {/* We check again if the data displayed in the widget does exist. Then, we add the widget */}
                {this.props.importedData[0] && this.props.importedData[0][0] && this.props.importedData[0][0]['Planned food']
                && (<WidgetIndicator title="Planned food" //The title is the text displayed above the data
                                                              img={mapIMG} //The image displayed on the left of the widget
                                                              data={parseInt(this.props.importedData[0][0]['Planned food'].replace(/\s/g, ''), 10)}/>)} {/* The data is the value */}
                {/* {this.props.importedData.global.main.totalProjects && (<WidgetIndicator title={this.props.importedData.global.main.totalProjects.title}*/}
                {/*img={projectsIMG}*/}
                {/*data={this.props.importedData.global.main.totalProjects.data}/>)}*/}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {this.props.importedData[0] && this.props.importedData[0][0] && this.props.importedData[0][0]['Actual food']
                && (<WidgetIndicator title="Actual food"
                                                              img={trainingIMG}
                                                              data={parseInt(this.props.importedData[0][0]['Actual food'].replace(/\s/g, ''), 10)}/>)}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {this.props.importedData[0] && this.props.importedData[0][0] && this.props.importedData[0][0]['Planned CBT']
                && (<WidgetIndicator title="Planned CBT"
                                                              img={projectsIMG}
                                                              data={parseInt(this.props.importedData[0][0]['Planned CBT'].replace(/\s/g, ''), 10)}/>)}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                {this.props.importedData[0] && this.props.importedData[0][0] && this.props.importedData[0][0]['Actual CBT']
                && (<WidgetIndicator title="Actual CBT"
                                                              img={mapathonsIMG}
                                                              data={parseInt(this.props.importedData[0][0]['Actual CBT'].replace(/\s/g, ''), 10)}/>)}
              </Grid>
            </Grid>
            {/* En of the first row */}

            <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
              <Grid item xs={12} sm={6} md={3}> {/* item of the container that uses bootstrap breakpoints */}
                {/* We check again if the data displayed in the widget does exist. Then, we add the widget */}
                {this.props.importedData[1] && this.props.importedData[1][0] && this.props.importedData[1][0]['Total Capacity Strengthening (USD)']
                && (<WidgetIndicator title="Total Capacity Strengthening (USD)" //The title is the text displayed above the data
                                     img={mapIMG} //The image displayed on the left of the widget
                                     data={parseInt(this.props.importedData[1][0]['Total Capacity Strengthening (USD)'].replace(/\s/g, ''), 10)}/>)} {/* The data is the value */}
              </Grid>
          </Grid>

            {/* Second row */}
            <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
              {/*/!* Double bar chart example *!/*/}
              {/*<Grid item xs={12} sm={6} md={4}>*/}
                {/*{this.props.importedData[2] && this.props.importedData[2][0] && this.props.importedData[2][0]['Planned food']*/}
                {/*(<WidgetGraph title = "Double bar chart example"*/}
                              {/*graph = {<VictoryChart domainPadding={15}>*/}
                                {/*<VictoryGroup offset={20} style={{ data: { width: 15 } }}>*/}
                                  {/*<VictoryStack>*/}
                                    {/*{<VictoryBar*/}
                                      {/*labelComponent={<VictoryTooltip/>}*/}
                                      {/*style  = {{ data: { fill: "#D73F3F" } }}*/}
                                      {/*data   = {[*/}
                                        {/*{ x: "Women",*/}
                                          {/*y: 15*/}
                                        {/*},*/}
                                      {/*]}*/}
                                    {/*/>}*/}
                                  {/*</VictoryStack>*/}
                                  {/*<VictoryStack>*/}
                                    {/*{<VictoryBar*/}
                                      {/*labelComponent={<VictoryTooltip/>}*/}
                                      {/*style  = {{ data: { fill: "#FAA71E" } }}*/}
                                      {/*data   = {[*/}
                                        {/*{ x: "Men",*/}
                                          {/*y: 7*/}
                                        {/*},*/}
                                      {/*]}*/}
                                    {/*/>}*/}
                                  {/*</VictoryStack>*/}
                                {/*</VictoryGroup>*/}
                              {/*</VictoryChart>*/}
                              {/*}/>*/}

                {/*)}*/}
              {/*</Grid>*/}

              {/*/!* Pie chart example *!/*/}
              {/*<Grid item xs={12} sm={6} md={4}>*/}
                {/*{this.props.importedData.global && (*/}
                  {/*<WidgetGraph title = "Pie chart example"*/}
                               {/*graph = {<VictoryPie domainPadding={15}*/}
                                                    {/*padAngle    = {2}*/}
                                                    {/*innerRadius = {100}*/}
                                                    {/*width       = {475}*/}
                                                    {/*colorScale  = {[ "#FAA71E", "#D73F3F"]}*/}
                                                    {/*style={{ labels: {fontSize: 18} }}*/}
                                                    {/*data = {[*/}
                                                      {/*{ x: "Women", y: 51 },*/}
                                                      {/*{ x: "Men",   y: 49 },*/}
                                                    {/*]}*/}
                               {/*/>}/>)}*/}
              {/*</Grid>*/}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
