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
import WPAPI from 'wpapi';
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import s from './Home.css';
import { countryOptions } from './countries'
const wp = new WPAPI({ endpoint: 'https://www.nationsfoundation.org/wp-json' });

class Home extends React.Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.updateLocation = this.updateLocation.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.getCountryData = this.getCountryData.bind(this);
    this.state = {
      activeCountry: null,
      map: {},
      geocoder: {},
      countryData: null,
    };
  }

  componentDidMount() {
    if (window.google) {
      const geocoder = new google.maps.Geocoder();
      const initialCountry = countryOptions[Math.floor(Math.random() * countryOptions.length)].text
      let map;
      geocoder.geocode({ 'address': initialCountry }, (results, status) => {
        if (status == 'OK') {
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: results[0].geometry.location,
          });
          this.setState({
            map,
            geocoder,
            activeCountry: initialCountry,
          });
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }

  updateLocation(location) {
    this.getCountryData(location)
    this.state.geocoder.geocode({ 'address': location }, (results, status) => {
      if (status === 'OK') {
        this.state.map.setCenter(results[0].geometry.location);
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  selectLocation(e, { value }) {
    const selectedValue = _.find(countryOptions, { value });
    const activeCountry = selectedValue.text;
    this.setState({ activeCountry });
    this.updateLocation(activeCountry);
  }

  getCountryData(name) {
    let countryData;
    async function fetchTagBySearch(name) {
      return new Promise((resolve, reject) => {
        wp
          .tags()
          .param('search', name)
          .then(tags => {
            if (tags.length > 0) {
              resolve(tags[0].id);
            } else {
              reject({ message: 'No Countries Found' });
            }
            // do something with the returned posts
          })
          .catch(err => {
            reject(err);
            // handle error
          });
      });
    }

    async function getPosts(id) {
      return new Promise((resolve, reject) => {
        wp
          .posts()
          .param('tags', id)
          .then(posts => {
            resolve(posts);
          })
          .catch(err => {
            reject(err);
            // handle error
          });
      });
    }

    fetchTagBySearch(name)
      .then(id => {
        getPosts(id).then(posts => {
          this.setState({ countryData: posts });
        });
      }).catch(err => {
        this.setState({ countryData: null });
        console.log("Error", err.message);
      });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Dropdown
            placeholder="Select Country"
            fluid
            search
            selection
            options={countryOptions}
            onChange={this.selectLocation}
            placeholder={`${this.state.activeCountry}`} />
          <div id="map" className={s.map} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
