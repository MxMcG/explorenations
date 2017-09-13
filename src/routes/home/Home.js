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

  constructor(props) {
    super(props);
    this.setInitialLocation = this.setInitialLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.getCountryData = this.getCountryData.bind(this);
    this.updatePostLinks = this.updatePostLinks.bind(this);
    this.state = {
      activeCountry: null,
      map: {},
      geocoder: {},
      countryData: null,
      postLinks: [],
      fusionTable: null,
    };
  }

  componentWillMount() {
    if (this.state.activeCountry === null) {
      const initialCountry = countryOptions[Math.floor(Math.random() * countryOptions.length)];
      this.setState({
        activeCountry: initialCountry.text,
        activeCountryAbvr: initialCountry.value,
      });
    }
  }

  componentDidMount() {
    this.setInitialLocation();
  }

  setInitialLocation() {
    if (window.google) {
      const geocoder = new google.maps.Geocoder();
      let map;
      geocoder.geocode({ 'address': this.state.activeCountry }, (results, status) => {
        if (status == 'OK') {
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: results[0].geometry.location,
            zoomControl: false,
            mapTypeControl: true,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
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

  selectLocation(e, { value }) {
    const selectedValue = _.find(countryOptions, { value });
    const activeCountry = selectedValue.text;
    const activeCountryAbvr = selectedValue.value;
    this.setState({ activeCountry, activeCountryAbvr });
    this.updateLocation(activeCountry);
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
          this.updatePostLinks(posts);
        });
      }).catch(err => {
        this.setState({
          countryData: null,
          postLinks: null,
        });
        console.log("Error", err.message);
      });
  }

  updateLocation(location) {
    this.state.fusionTable.setMap(null);
    this.getCountryData(location);
    this.state.geocoder.geocode({ 'address': location }, (results, status) => {
      if (status === 'OK') {
        this.state.map.setCenter(results[0].geometry.location);
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

  updatePostLinks(posts) {
    const postLinks = [];
    for (let i = 0; i < posts.length; i += 2) {
      postLinks.push(
        <div className={s.linkElement} key={i}>
          <img
            src={posts[i].mediaUrl}
            alt="Nations Foundation"
            className={s.image} />
          <a
            href={posts[i].link}
            target="_blank"
            className={`${s.link} ${s.hide}`}
            key={i}
          >
            {posts[i].title.rendered}
          </a>
          {posts[i + 1] &&
            <div>
              <img
                src={posts[i + 1].mediaUrl}
                alt="Nations Foundation"
                className={s.image} />
              <a
                href={posts[i + 1].link}
                target="_blank"
                className={`${s.link} ${s.hide}`}
                key={i + 1}
              >
                {posts[i + 1].title.rendered}
              </a>
            </div>}
        </div>
      );
    }
    Promise.all(postLinks).then(array => {
      this.setState({ postLinks: array });
    }).catch(err => {
      console.log(err)
    })
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
            placeholder={`${this.state.activeCountry}`}
            className={s.dropdownOveride} />
          <div id="map" className={s.map} />
          <div className={s.linkContainer}>
            { this.state.postLinks }
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);

// for (let i = 0; i < posts.length; i++) {
//   // Obtain media url for each post
//   wp.media().id(posts[i].featured_media).then(media => {
//     // Add media source to post object
//     posts[i]["mediaSrc"] = media.source_url;
//   });
//   if (typeof posts[i+1] === 'undefined') {
//     console.log("DDDD")
//     resolve(posts);
//   }
// }
