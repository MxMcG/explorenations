/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import s from './Home.css';
import { countryOptions } from './tags'

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };

  componentDidMount() {
    let location;
    if (window.google) {
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: location,
      });
      geocoder.geocode({ 'address': 'germany'}, (results, status) => {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }

  selectLocation (e, { value }) {
    console.log('PROPSS', this.props.data);
    const option = _.find(this.props.data, { value });
    console.log('OPTION', option)
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Dropdown placeholder='Select Country' fluid search selection options={countryOptions} onChange={this.selectLocation}/>
          <div id="map" className={s.map} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
