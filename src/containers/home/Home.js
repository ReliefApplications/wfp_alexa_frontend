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
// import { subscribeToDashboardChanges, subscribeToDashboardFocus } from '../../core/utils/api';


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
    // subscribeToDashboardChanges((userId, country, data) => {
    //   if (data !== {}) {
    //     this.setState({
    //       country: country,
    //       importedData: data,
    //       loading: false,
    //       number: 0
    //     });
    //   }
    // });
    // subscribeToDashboardFocus((userId, number) => {
    //   console.log(number);
    //   if (number !== {}) {
    //     this.setState({
    //       number: number,
    //       loading: false
    //     });
    //   }
    // });

    // if ('serviceWorker' in navigator) {
    //   console.log('Registering service worker');
    //
    //   this.run().catch(error => console.error(error));
    // }
    if (navigator.serviceWorker) {
      // navigator.serviceWorker.register('/service-worker-custom.js').then(function () {
      //   return navigator.serviceWorker.ready;
      // })
      //   .then(function (registration) {
      //     console.log(registration); // service worker is ready and working...
      //   });
      // navigator.serviceWorker.addEventListener('message', function (event) {
      //   console.log("Hello!", event.data.message); // Hello World !
      // });
    }

    // this.urlB64ToUint8Array = this.urlB64ToUint8Array.bind(this);
    // this.run = this.run.bind(this);
  }

  // urlB64ToUint8Array(base64String) {
  //   const padding = '='.repeat((4 - base64String.length % 4) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/-/g, '+')
  //     .replace(/_/g, '/');
  //
  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);
  //
  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // }
  //
  // async run() {
  //   const publicVapidKey = 'BEqB-4zEh1XYhbNbphXKyQuIgYzReVw6uNhKnZkW_pEtdy1_5cvkqsHFXcKYd-SY_z9-SGMNEn4GLqfhAJW9tgk';
  //   console.log('Registering service worker');
  //   const registration = await navigator.serviceWorker.
  //     register('/service-worker-custom.js', {scope: '/'});
  //   console.log('Registered service worker');
  //
  //   console.log('Registering push');
  //   const subscription = await registration.pushManager.
  //     subscribe({
  //       userVisibleOnly: true,
  //       // The `urlBase64ToUint8Array()` function is the same as in
  //       // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
  //       applicationServerKey: this.urlB64ToUint8Array(publicVapidKey)
  //     });
  //   console.log('Registered push');
  //
  //   console.log('Sending push');
  //   await fetch('http://localhost:12113/subscribe', {
  //     method: 'POST',
  //     body: JSON.stringify(subscription),
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   }).then((res) => {console.log("ok", res)})
  //     .catch((err) => console.error("error: ", err));
  //   console.log('Sent push');
  // }

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
