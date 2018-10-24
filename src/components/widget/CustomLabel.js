/** Natives **/
import React from 'react';

import { VictoryLabel   }  from 'victory';
import { VictoryTooltip   }  from 'victory';

class CustomLabel extends React.Component {
  render() {
    console.log("hey", this.props);
    return (
      <g>
        <VictoryLabel
          {...this.props}
          text={this.props.data[this.props.index].y}
          dx={-70}
          style={{ fill: "white" }}
        />
        <VictoryTooltip
          {...this.props}
        />
      </g>
    );
  }
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;
export default CustomLabel;