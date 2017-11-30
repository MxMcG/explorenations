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
    data: PropTypes.func.isRequired,
    link: PropTypes.string.isRequired,
    mediaUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }

  static propTypes = {
    data: PropTypes.func.isRequired,
    link: PropTypes.string.isRequired,
    mediaUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  openLink(url) {
    window.open(url, '_blank');
  }

  render() {
    return (
      <div
        onClick={() => { this.openLink(this.props.link); }}
        className={s.container}
      >

      <div
        style={{
          background: `url(${this.props.mediaUrl}) scroll no-repeat center/cover`,
        }}
        className={s.image}
      >

      </div>
        <div className={s.titleWrap}>
          <p
            className={`${s.link}`}
          >
            {this.props.title}
          </p>
          <p
            target="_blank"
            className={`${s.authorLink}`}
          >
            {this.props.authorName}
          </p>
        </div>
        <img
          src={arrowRight}
          alt="Nations Foundation"
          className={s.sideCarrot}
        />
      </div>
    );
  }
}

export default withStyles(s)(Posts);

// <img
//   src={this.props.mediaUrl}
//   alt="Nations Foundation"
//   className={s.image}
//   style={{ background: this.props.mediaUrl }}
// />
