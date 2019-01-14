/** Natives **/
import React from 'react';

/** Containers **/
import Header             from '../../components/header/Header'
import Dashboard        from '../../components/content/demo/Dashboard'

/** CSS **/
import './Home.css';

/** Logos **/
import wfpLOGO        from '../../assets/images/logos/world-food-programme.jpg';
import wfpHOME        from '../../assets/images/dashboard/WFP_AsiaPacific.jpg';

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
          column: ""
        });
      }
    });
    subscribeToDashboardFocus((userId, column, country, data) => {
      if (column !== "") {
        this.setState({
          column: column,
          loading: false
        });
      }
      if (country !== "") {
        this.setState({
          country: country,
          importedData: data
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
    if (document.getElementById('amazon-root')) {
      (function(d) {
        let a = d.createElement('script');
        a.type = 'text/javascript';
        a.async = true;
        a.id = 'amazon-login-sdk';
        a.src = 'https://assets.loginwithamazon.com/sdk/na/login1.js';
        d.getElementById('amazon-root').appendChild(a);
      })(document);
      window.onAmazonLoginReady = function() {
        window.amazon.Login.setClientId('amzn1.application-oa2-client.68279c5edda344f5b43c55d836d7e883');
      };
    }
  }

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//
  render() {

    let AMZlogin = function() {
      let options = { scope : 'profile' };
      if (document.getElementById('amazon-root')) {
        window.amazon.Login.authorize(options, 'https://wfp-alexa-front.test.humanitarian.tech/');
      }
      return false;
    };
    const { importedData }                    = this.state;

    document.body.style = 'background: #F0EFEF';
    return (
      <div id="Home">

        <div id="amazon-root" />
        {/* Header */}
        <Header sendToHome={this.selectProjectFromHeader} country={this.state.country}/>

        {/* Loader waiting for the data */}
        {this.state.loading               && (<CircularProgress id="loader" className={"loader"} thickness={7} />)}
        {/* Content */}
        {!this.state.loading              && this.state.country !== "Global"
                                          && (<this.state.content column={this.state.column} importedData = {importedData} background={this.state.country.toLowerCase() + ".png"}/>)}

        {/* Home Content */}
        {this.state.country === "Global"  && (
          <div>
            <Card className="indicator-container">
              <CardContent className="widget-text-home">
                <CardMedia className={"widget-home-image"}
                           image     = {wfpLOGO}
                />
                <Typography>
                  Welcome on the brand new WFP dashboard controlled by Alexa
                  <br/>
                  It's your first time ? Connect yourself here :
                    <a id="LoginWithAmazon" onClick={AMZlogin}>
                    <img border="0" alt="Login with Amazon"
                         src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_76x32.png"
                         width="76" height="32" />
                    </a>
                </Typography>
              </CardContent>
            </Card>
            <Card className="indicator-container">
              <CardContent className="widget-text-home">
                <CardMedia className={"widget-difference-image-home"}
                           image     = {wfpHOME}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
