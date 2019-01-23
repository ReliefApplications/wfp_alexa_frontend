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
      let userIdCache = this.getCookie("userId");
        if (userIdCache === userId) {
          if (data !== {}) {
            this.setState({
              country: country,
              importedData: data,
              loading: false,
              column: ""
            });
          }
        } else {
          console.error("You're not connected, please log in with amazon.")
        }
    });
    subscribeToDashboardFocus((userId, column, country, data) => {
      let userIdCache = this.getCookie("userId");
      if (userIdCache === userId) {
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

  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//
  render() {
    let AmzLogin = function() {
      let options = { scope : 'profile' };
      if (document.getElementById('amazon-root')) {
        window.amazon.Login.authorize(options, function (response) {
          if ( response.error ) {
            console.error('oauth error ' + response.error);
            return;
          }
          window.amazon.Login.retrieveProfile(response.access_token, function(response) {
            let d = new Date();
            d.setTime(d.getTime() + (24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = "userId" + "=" + response.profile.CustomerId + ";" + expires + ";path=/";
          });
        });
      }
    };

    let AmzLogout = function() {
      if (document.getElementById('amazon-root')) {
        window.amazon.Login.logout();
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          document.cookie = c + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
      }
    };
    const { importedData } = this.state;

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
                  <div>
                    Is it your first time ? Connect yourself here :
                    <a id="LoginWithAmazon" onClick={AmzLogin}>
                    <img border="0" alt="Login with Amazon"
                         src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_76x32.png"
                         width="76" height="32" />
                    </a>
                  </div>
                  <div>
                    Disconnect yourself here :
                    <button onClick={AmzLogout}>
                      Logout
                    </button>
                  </div>
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
