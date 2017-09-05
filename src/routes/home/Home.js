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
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };

  componentDidMount() {
    console.log('PROPS', this.props);
    const uluru = { lat: -25.363, lng: 131.044 };
    if (window.google) {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru,
      });
      // const marker = new google.maps.Marker({
      //   position: uluru,
      //   map: map
      // });
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div id="map" className={s.map} />
        </div>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB9XyyFEV2xYcPGtr6x3j97HX4-Mnq_Lto" />
      </div>
    );
  }
}

export default withStyles(s)(Home);
