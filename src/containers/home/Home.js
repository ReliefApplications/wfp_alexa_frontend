/** Natives **/
import React from 'react';

/** Containers **/
import Header             from '../../components/header/Header'
import MappingContentGlobal        from '../../components/content/demo/Dashboard'

/** CSS **/
import './Home.css';

/** Services **/
import Reader from "../../core/utils/Reader";

/** Material **/
import CircularProgress from '@material-ui/core/CircularProgress';

// This will be used to retrieve the stored data
const reader = new Reader();

/**
 * This component will be composed of multiple parts
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.selectProjectFromHeader     = this.selectProjectFromHeader.bind(this);
    this.selectContentFromFilterTabs = this.selectContentFromFilterTabs.bind(this);
    this.state = {
      MappingContent                  : MappingContentGlobal, // Only one component for the global project
      mappingContentSelected          : true,     // When Mapping Content is selected (selected by default)

      //By default, the global project and the main content are displayed
      projectName : 'Global', // Name of the actual project

      selectedDashboard : "",
      loading          : true, // In order to use the loader
    };
  }

  //------------------------------------------------------------------------//
  //---------------------------------- Init --------------------------------//
  //------------------------------------------------------------------------//
  /** Call the data from the amazon bucket once the page is rendered **/
  async componentDidMount() {
    this.setState({selectedDashboard : await new Promise((resolve,reject) => {
        // Getting data from the preprocessed file
        reader.getJsonFromAWS()
          .then((data) =>{
            this.setState({
              loading: false
            });
            console.log(data);
            resolve(data);
          })
          .catch((error) =>{
            reject(error);
          });
      })
    });
  }

  //------------------------------------------------------------------------//
  //---------------------- Project & Content display -----------------------//
  //------------------------------------------------------------------------//
  /** Selecting the project from the header button **/
  async selectProjectFromHeader(selectedProjectFromHeader){
    // Because the title can have spaces, the names are stored in an object that is used as a mapper
    // with the right attributes
    const projectSelected = this.state.importedData.projectNames[selectedProjectFromHeader];
    this.setState({
      loading: true
    });
    try {
      await import('../../components/content/'+projectSelected+'/Dashboard')
        .then((res) => this.setState({MappingContent : res.default}));
    }
    catch (e){
      // console.error(e);
    }
    try {
      await import('../../components/content/'+projectSelected+'/CapacityBuildingContent')
        .then((res) => this.setState({CapacityBuildingContent : res.default}));
    }
    catch (e){
      // console.error(e);
    }
    try {
      await import('../../components/content/'+projectSelected+'/CommunityContent')
        .then((res) => this.setState({CommunityContent : res.default}));
    }
    catch (e){
      // console.error(e);
    }
    try {
      await import('../../components/content/'+projectSelected+'/AwarenessContent')
        .then((res) => this.setState({AwarenessContent : res.default}));
    }
    catch (e){
      // console.error(e);
    }
    projectSelected === "global" ?
      this.setState({
        contentName                     : 'Main',
        mappingContentSelected          : true,
        projectName                     : selectedProjectFromHeader,
        loading: false
      }) :
      this.setState({
        contentName                     : 'Mapping',
        mappingContentSelected          : true,
        projectName                     : selectedProjectFromHeader,
        loading: false
      });
  }

  /** Selecting the new content chosen in the filter tabs component **/
  async selectContentFromFilterTabs(selectedContent){
    this.setState({
      loading: true
    });
    this.setState({
      contentName                     : selectedContent[0].contentName,
      mappingContentSelected          : selectedContent[0].mappingContent,
      loading: false
    });
  }

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//
  render() {
    const { mappingContentSelected }          = this.state;
    const { importedData }                    = this.state;

    return (
      <div className="Home">
        {/* Header */}
        <Header sendToHome={this.selectProjectFromHeader} projectName={this.state.projectName} importedProjects={this.state.importedProjects}/>

        {/* Loader waiting for the data */}
        {this.state.loading          && (<CircularProgress id="loader" className={"loader"} thickness={7} />)}
        {/* Content */}
        {!this.state.loading         && mappingContentSelected          && (<this.state.MappingContent          importedData = {importedData}/>)}
      </div>
    );
  }
}

export default Home;
