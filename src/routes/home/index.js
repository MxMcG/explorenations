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

import { Dropdown } from 'semantic-ui-react'
import { countryOptions } from './tags'
import 'semantic-ui-css/semantic.min.css';

const WPAPI = require('wpapi');

const wp = new WPAPI({ endpoint: 'https://www.nationsfoundation.org/wp-json' });

const fetchTagBySearch = new Promise((resolve, reject) => {
  wp
    .tags()
    .param('search', 'Germany')
    .then(tags => {
      resolve(tags[0].id);
      // do something with the returned posts
    })
    .catch(err => {
      reject(err);
      // handle error
    });
});

async function getPosts(id) {
  return new Promise((resolve, reject) => {
    wp
      .posts()
      .param('tags', id)
      .then(post => {
        resolve(post);
      })
      .catch(err => {
        reject(err);
        // handle error
      });
  });
}

// call our promise
async function allPosts() {
  try {
    const id = await fetchTagBySearch;
    const posts = await getPosts(id);
    console.log('ID', id)
    return posts;
  } catch (error) {
    console.log(error.message);
  }
}
// const { data } = await resp.json();
// if (!data || !data.news) throw new Error('Failed to load the news feed.');
async function action() {
  const data = await allPosts();
  console.log('BIG DATA', data);
  return {
    chunks: ['home'],
    title: 'React Starter Kit',
    component: (
      <Layout>
        <Home data={data} />
        <Dropdown placeholder='Select Country' fluid search selection options={countryOptions} />
      </Layout>
    ),
  };
}

export default action;
