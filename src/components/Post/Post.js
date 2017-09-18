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
  static deafultProps = {
    data: PropTypes.object,
  }

  static propTypes = {
    index: PropTypes.string.isRequired,
    activatePost: PropTypes.func.isRequired,
    activePost: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isActive: true
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if ((nextProps.activePost === this.props.index) || (this.props.activePost === null)) {
      this.setState({ isActive: true });
    }
  }

  render() {
    console.log("POST")
    return (
      <div className={s.linkWrap}>
        {(this.props.activePost === this.props.index) ? (

          <div
            className={
              `${s.linkElement}
               ${s.activePost}`
            }
          >
            <div
              className={`${s.clear} ${this.state.isActive ? s.activeClear : s.inactiveClear}`}
              onClick={() => {
                this.props.activatePost(null);
              }}
            >X</div>
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
            <div className={s.sideCarrot}>></div>
          </div>

        ) : (this.props.activePost === null) ? (

          <div
            className={
              `${s.linkElement}
               ${s.inactivePost}`
            }
            onClick={() => {
              this.props.activatePost(this.props.index);
            }}
            >
            <img
              src={this.props.data.mediaUrl}
              alt="Nations Foundation"
              className={s.image} />
          </div>

        ) : false}
      </div>
    );
  }
}

export default withStyles(s)(Post);

// : (
//   <div
//     className={
//       `${s.linkElement}
//        ${this.state.isActive || this.props.activePost === null ? s.activePost : s.inactivePost}`
//     }
//     onClick={() => {
//       this.props.activatePost(this.props.index);
//     }}
//     >
//
//     <div
//       className={`${s.clear} ${this.state.isActive ? s.activeClear : s.inactiveClear}`}
//       onClick={() => {
//         this.props.activatePost(null);
//       }}
//     >X</div>
//     <img
//       src={this.props.data.mediaUrl}
//       alt="Nations Foundation"
//       className={s.image} />
//     <a
//       href={this.props.data.link}
//       target="_blank"
//       className={`${s.link}`}
//       >
//       {this.props.data.title.rendered}
//     </a>
//     <div className={s.sideCarrot}>></div>
//   </div>
// )
