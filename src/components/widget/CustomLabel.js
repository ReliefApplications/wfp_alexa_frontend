/** Natives **/
import React from 'react';

import { VictoryLabel   }  from 'victory';
import { VictoryTooltip   }  from 'victory';

class CustomLabelAge extends React.Component {
  render() {
    return (
      <g>
        <VictoryLabel
          {...this.props}
          text={this.props.data[this.props.index].y}
          x={(this.props.data[this.props.index].y/this.props.max)*175+100}
          textAnchor={"middle"}
          style={{ fill: "white", fontSize: 8 }}
        />
        <VictoryTooltip
          {...this.props}
          style={{ fontSize: 8 }}
          dx={-10}
          overflow={true}
        />
      </g>
    );
  }
}

CustomLabelAge.defaultEvents = VictoryTooltip.defaultEvents;

class CustomLabelStatus extends React.Component {
  render() {
    return (
      <g>
        <VictoryLabel
          {...this.props}
          text={this.props.data[this.props.index].y}
          style={{ fill: (data) => {
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
            fontSize: 8
          }}
        />
        <VictoryTooltip
          {...this.props}
          style={{ fontSize: 8 }}
          dx={-10}
          overflow={true}
        />
      </g>
    );
  }
}

CustomLabelStatus.defaultEvents = VictoryTooltip.defaultEvents;

export {CustomLabelAge, CustomLabelStatus};