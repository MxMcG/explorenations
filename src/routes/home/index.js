/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
const WPAPI = require('wpapi');
const wp = new WPAPI({ endpoint: 'https://www.nationsfoundation.org/wp-json' });
import { countryOptions } from './countries'

async function fetchTagBySearch(name) {
  return new Promise((resolve, reject) => {
    wp
      .tags()
      .param('search', name)
      .then(tags => {
        console.log('TAGS', tags.length)
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

// call our promise
async function allPosts(country) {
  try {
    const id = await fetchTagBySearch(country);
    const posts = await getPosts(id);
    return posts;
  } catch (error) {
    console.log(error.message);
  }
}

async function action() {
  // fetch initial country data
  // send function to fetch new country data
  const randomCountry = countryOptions[Math.floor(Math.random() * countryOptions.length)].text;
  const data = await allPosts(randomCountry);

  return {
    chunks: ['home'],
    title: 'React Starter Kit',
    component: (
      <Layout>
        <Home />
      </Layout>
    ),
  };
}

export default action;
