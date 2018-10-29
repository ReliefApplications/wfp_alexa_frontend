/** Natives **/
import React from 'react';

/** Containers **/
import Header             from '../../components/header/Header'
import Dashboard        from '../../components/content/demo/Dashboard'

/** CSS **/
import './Home.css';

/** Logos **/
import wfpLOGO        from '../../assets/images/logos/world-food-programme.jpg';

/** Material **/
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import CircularProgress from '@material-ui/core/CircularProgress';

/** API/socket **/
import { subscribeToDashboardChanges, subscribeToDashboardFocus } from '../../core/utils/api';


/**
 * This component will be composed of multiple parts
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content                  : Dashboard,
      // The global country is the home of the website
      country     : 'Global',
      number      : 0,
      loading     : true, // In order to use the loader
      importedData: {}
    };
    subscribeToDashboardChanges((userId, country, data) => {
      if (data !== {}) {
        this.setState({
          country: country,
          importedData: data,
          loading: false,
          number: 0
        });
      }
    });
    subscribeToDashboardFocus((userId, number) => {
      console.log(number);
      if (number !== {}) {
        this.setState({
          number: number,
          loading: false
        });
      }
    });
  }
  //------------------------------------------------------------------------//
  //---------------------------------- Init --------------------------------//
  //------------------------------------------------------------------------//
  async componentDidMount() {
    this.setState({
      loading: false
    });
  }

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//
  render() {
    const { importedData }                    = this.state;

    return (
      <div className="Home">
        {/* Header */}
        <Header sendToHome={this.selectProjectFromHeader} country={this.state.country}/>

        {/* Loader waiting for the data */}
        {this.state.loading               && (<CircularProgress id="loader" className={"loader"} thickness={7} />)}
        {/* Content */}
        {!this.state.loading              && this.state.country !== "Global"
                                          && (<this.state.content number={this.state.number} importedData = {importedData} background={this.state.country.toLowerCase() + ".png"}/>)}

        {/* Home Content */}
        {this.state.country === "Global"  && (
          <div>
            <Card className="indicator-container">
              <CardContent className="widget-text">
                <CardMedia className={"widget-home-image"}
                           image     = {wfpLOGO}
                />
                <Typography>
                  Welcome on the brand new WFP dashboard controlled by Alexa
                </Typography>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
