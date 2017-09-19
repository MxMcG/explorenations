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
import s from './Slider.css';
import $ from 'jquery';

class Slider extends React.Component {
  static deafultProps = {

  }

  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const myElement = window.document.getElementById('slideArea');
      const hammertime = new Hammer.Manager(myElement, {
        recognizers: [
          [Hammer.Pan,{ direction: Hammer.DIRECTION_VERTICAL }],
        ]
      });
      hammertime.on('panup', function(ev) {
        $('#sliderContainer').css('bottom', '0')
      });

      hammertime.on('pandown', function(ev) {
        $('#sliderContainer').css('bottom', '-40%')
      });
    }
  }

  render() {
    return (
      <div>
        <div className={s.sliderContainer} id={'sliderContainer'}>
          <div className={s.slideArea} id={'slideArea'}>
            <div className={s.arrow}>^</div>
          </div>

          <div className={s.filter}>
            <div className={s.boxLeft}></div>
            <div className={s.boxRight}></div>
          </div>

          <div className={s.listWrap}>
            <ul>
              <li>First Post</li>
              <li>Second Post</li>
              <li>Third Post</li>
              <li>First Post</li>
              <li>Second Post</li>
              <li>Third Post</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Slider);

// : (
//   <div
//     classNameName={
//       `${s.linkElement}
//        ${this.state.isActive || this.props.activePost === null ? s.activePost : s.inactivePost}`
//     }
//     onClick={() => {
//       this.props.activatePost(this.props.index);
//     }}
//     >
//
//     <div
//       classNameName={`${s.clear} ${this.state.isActive ? s.activeClear : s.inactiveClear}`}
//       onClick={() => {
//         this.props.activatePost(null);
//       }}
//     >X</div>
//     <img
//       src={this.props.data.mediaUrl}
//       alt="Nations Foundation"
//       classNameName={s.image} />
//     <a
//       href={this.props.data.link}
//       target="_blank"
//       classNameName={`${s.link}`}
//       >
//       {this.props.data.title.rendered}
//     </a>
//     <div classNameName={s.sideCarrot}>></div>
//   </div>
// )
//
//
// <div classNameName={s.linkWrap}>
//   {(this.props.activePost === this.props.index) ? (
//
//     <div
//       classNameName={
//         `${s.linkElement}
//          ${s.activePost}`
//       }
//     >
//       <div
//         classNameName={`${s.clear} ${this.state.isActive ? s.activeClear : s.inactiveClear}`}
//         onClick={() => {
//           this.props.activatePost(null);
//         }}
//       >X</div>
//       <img
//         src={this.props.data.mediaUrl}
//         alt="Nations Foundation"
//         classNameName={s.image} />
//       <a
//         href={this.props.data.link}
//         target="_blank"
//         classNameName={`${s.link}`}
//         >
//         {this.props.data.title.rendered}
//       </a>
//       <div classNameName={s.sideCarrot}>></div>
//     </div>
//
//   ) : (this.props.activePost === null) ? (
//
//     <div
//       classNameName={
//         `${s.linkElement}
//          ${s.inactivePost}`
//       }
//       onClick={() => {
//         this.props.activatePost(this.props.index);
//       }}
//       >
//       <img
//         src={this.props.data.mediaUrl}
//         alt="Nations Foundation"
//         classNameName={s.image} />
//     </div>
//
//   ) : false}
// </div><div classNameName={s.linkWrap}>
//   {(this.props.activePost === this.props.index) ? (
//
//     <div
//       classNameName={
//         `${s.linkElement}
//          ${s.activePost}`
//       }
//     >
//       <div
//         classNameName={`${s.clear} ${this.state.isActive ? s.activeClear : s.inactiveClear}`}
//         onClick={() => {
//           this.props.activatePost(null);
//         }}
//       >X</div>
//       <img
//         src={this.props.data.mediaUrl}
//         alt="Nations Foundation"
//         classNameName={s.image} />
//       <a
//         href={this.props.data.link}
//         target="_blank"
//         classNameName={`${s.link}`}
//         >
//         {this.props.data.title.rendered}
//       </a>
//       <div classNameName={s.sideCarrot}>></div>
//     </div>
//
//   ) : (this.props.activePost === null) ? (
//
//     <div
//       classNameName={
//         `${s.linkElement}
//          ${s.inactivePost}`
//       }
//       onClick={() => {
//         this.props.activatePost(this.props.index);
//       }}
//       >
//       <img
//         src={this.props.data.mediaUrl}
//         alt="Nations Foundation"
//         classNameName={s.image} />
//     </div>
//
//   ) : false}
// </div>
