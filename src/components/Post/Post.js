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
import s from './Post.css';

class Post extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    console.log("POST")
    return (
      <div className={s.linkWrap}>
        <div
          className={s.linkElement}
          onClick={() => {

          }}
          >
          <img
            src={this.props.data.mediaUrl}
            alt="Nations Foundation"
            className={s.image} />
          <a
            href={this.props.data.link}
            target="_blank"
            className={`${s.link}`}
            >
            {this.props.data.title.rendered}
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Post);
