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
import s from './Posts.css';
import $ from 'jquery';
import arrowRight from './arrowRight.png';

class Posts extends React.Component {
  static defaultProps = {
    data: PropTypes.object,
  }

  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    console.log(this.props.data)
    return (
      <div
        onClick={() => {}}
        className={s.container}
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
        <img
          src={arrowRight}
          alt="Nations Foundation"
          className={s.arrowRight}
        />
      </div>
    );
  }
}

export default withStyles(s)(Posts);
