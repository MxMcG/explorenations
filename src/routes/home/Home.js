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
import Slider from '../../components/Slider';
import { countryOptions } from './countries'
const wp = new WPAPI({
  endpoint: 'https://www.nationsfoundation.org/wp-json',
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.activateSlider = this.activateSlider.bind(this);
    this.setInitialLocation = this.setInitialLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.setZoom = this.setZoom.bind(this);
    this.getCountryData = this.getCountryData.bind(this);
    // this.togglePostView = this.togglePostView.bind(this);
    this.state = {
      sliderActive: false,
      activeCountry: null,
      activePost: null,
      map: {},
      geocoder: {},
      countryData: null,
      postLinks: [],
      fusionTable: null,
      zoom: 4,
    };
  }

  componentWillMount() {
    if (this.state.activeCountry === null) {
      const initialCountry = countryOptions[Math.floor(Math.random() * countryOptions.length)];
      const isClient = typeof window !== 'undefined' ? true : false
      this.setState({
        activeCountry: initialCountry.text,
        activeCountryAbvr: initialCountry.value,
        isClient,

      });
    }
  }

  componentDidMount() {
    this.setInitialLocation();
  }

  setZoom() {
    const largeCountries = [
      'United States',
      'Canada',
      'Russia',
      'China',
    ]
    largeCountries.filter((country) => {
      if (this.state.map.setZoom) {
        if (this.state.activeCountry === country) {
          this.state.map.setZoom(3);
        } else {
          this.state.map.setZoom(4);
        }
      }
    });
  }

  setInitialLocation() {
    if (window.google) {
      let map;
      const geocoder = new google.maps.Geocoder();
      this.getCountryData(this.state.activeCountry);
      this.setZoom();
      geocoder.geocode({ 'address': this.state.activeCountry }, (results, status) => {
        if (status == 'OK') {
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: this.state.zoom,
            center: results[0].geometry.location,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            gestureHandling: 'greedy',
          });
          const fusionTable = new google.maps.FusionTablesLayer({
            query: {
              select: 'geometry',
              from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
              where: `ISO_2DIGIT IN ('${this.state.activeCountryAbvr.toUpperCase()}')`,
            },
            map,
            suppressInfoWindows: true,
            styles: [{
              where: `ISO_2DIGIT IN ('${this.state.activeCountryAbvr.toUpperCase()}')`,
              markerOptions: {
                iconName: "supported_icon_name"
              },
              polygonOptions: {
                fillColor: "#rrggbb",
                strokeColor: "#rrggbb",
                strokeWeight: "int"
              },
              polylineOptions: {
                strokeColor: "#rrggbb",
                strokeWeight: "int"  }
            }],
          });
          this.setState({
            map,
            geocoder,
            fusionTable,
          });
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }

  getCountryData(name) {
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
            const linksWithMedia = [];
            for (let i = 0; i < posts.length; i += 1) {
              linksWithMedia.push(
                wp.media().id(posts[i].featured_media).then(media => {
                  wp.users().id(posts[i].author).then(author => {
                    posts[i]['authorName'] = author.name;
                  });
                  posts[i]['mediaUrl'] = media.source_url;
                  return posts[i];

                })
              )
            }
            Promise.all(linksWithMedia).then(array => {
              resolve(array);
            }).catch(err => {
              console.log(err)
            })
            // resolve(posts);
          })
          .catch(err => {
            reject(err);
          });
      });
    }

    fetchTagBySearch(name)
      .then(id => {
        getPosts(id).then(posts => {
          this.setState({ countryData: posts });
        });
      }).catch(err => {
        this.setState({
          countryData: null,
          postLinks: null,
        });
        console.log("Error", err.message);
      });
  }

  selectLocation(e, { value }) {
    const selectedValue = _.find(countryOptions, { value });
    const activeCountry = selectedValue.text;
    const activeCountryAbvr = selectedValue.value;
    this.setState({ activeCountry, activeCountryAbvr });
    this.updateLocation(activeCountry);
  }

  // togglePostView(index) {
  //   // hide all other posts
  //   // show image, fully formatted div along bottom screen
  //   if (this.state.showPost === true) {
  //     this.setState({
  //       showPost: false
  //     })
  //   } else {
  //     this.setState({
  //       showPost: true
  //     })
  //   }
  // }

  updateLocation(location) {
    this.state.fusionTable.setMap(null);
    this.getCountryData(location);
    this.state.geocoder.geocode({ 'address': location }, (results, status) => {
      if (status === 'OK') {
        this.setZoom();
        this.state.map.panTo(results[0].geometry.location);
        const fusionTable = new google.maps.FusionTablesLayer({
          query: {
            select: 'geometry',
            from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
            where: `ISO_2DIGIT IN ('${this.state.activeCountryAbvr.toUpperCase()}')`,
          },
          map: this.state.map,
          suppressInfoWindows: true,
          styles: [{
            where: `ISO_2DIGIT IN ('${this.state.activeCountryAbvr.toUpperCase()}')`,
            markerOptions: {
              iconName: "supported_icon_name"
            },
            polygonOptions: {
              fillColor: "#rrggbb",
              strokeColor: "#rrggbb",
              strokeWeight: "int"
            },
            polylineOptions: {
              strokeColor: "#rrggbb",
              strokeWeight: "int"  }
          }],
        });
        fusionTable.setMap(this.state.map);
        this.setState({ fusionTable });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  activateSlider() {
    if (this.state.sliderActive === true) {
      this.setState({ sliderActive: false });
    } else {
      this.setState({ sliderActive: true });
    }
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.mapWrap}>
          <Dropdown
            placeholder="Select Country"
            fluid
            search
            selection
            options={countryOptions}
            onChange={this.selectLocation}
            placeholder={`${this.state.activeCountry}`}
            className={s.dropdownOveride}
          />
          <div id="map" className={s.map} />
        </div>
        <div
          className={s.countryOverlay}
          onClick={() => { this.activateSlider(); }}
        />
        { this.state.countryData &&
          <Slider
            sliderActive={this.state.sliderActive}
            activateSlider={this.activateSlider}
            postData={this.state.countryData}
          />
        }
      </div>
    );
  }
}

export default withStyles(s)(Home);
