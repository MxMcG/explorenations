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
import Posts from '../Posts';
import revealBrowser from '../../helpers/revealBrowser'
import upIcon from './upIcon.png';

class Slider extends React.Component {
  static defaultProps = {
    postData: PropTypes.object,
  }

  static propTypes = {
    postData: PropTypes.obj,
  }

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeList: 'stories',
      browser: null,
    };
  }

  componentWillMount() {
    const browser = revealBrowser();

    this.setState({ browser });
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
        $('#listWrap').css('max-height', `${(window.innerHeight * 0.75) - 100}px`)
        $('#slideArea').css('height', '100%')
        $('#listWrap').css('overflow-y', 'scroll')
        // Rotate Arrow
        $('#upIcon').css('transform', 'rotate(180deg)');
        $('#upIcon').css('-webkit-transform': 'rotate(180deg)');
        $('#upIcon').css('-moz-transform': 'rotate(180deg)');
      });

      hammertime.on('pandown', function(ev) {
      	$('#listWrap').css('max-height', '0px')
        $('#slideArea').css('height', '100%')
        $('#listWrap').css('overflow-y', 'hidden');
        // Rotate Arrow
        $('#upIcon').css('transform', 'rotate(0deg)');
        $('#upIcon').css('-webkit-transform': 'rotate(0deg)');
        $('#upIcon').css('-moz-transform': 'rotate(0deg)');
      });
    }
  }

  toggle() {
    if (this.state.open === true) {
      $('#listWrap').css('max-height', '0px')
      $('#slideArea').css('height', '100%')
      $('#listWrap').css('overflow-y', 'hidden');
      // Rotate Arrow
      $('#upIcon').css('transform', 'rotate(0deg)');
      $('#upIcon').css('-webkit-transform': 'rotate(0deg)');
      $('#upIcon').css('-moz-transform': 'rotate(0deg)');

      this.setState({ open: false });
    } else {
      $('#listWrap').css('max-height', `${(window.innerHeight * 0.75) - 100}px`)
      $('#slideArea').css('height', '100%')
      $('#listWrap').css('overflow-y', 'scroll')
      // Rotate Arrow
      $('#upIcon').css('transform', 'rotate(180deg)');
      $('#upIcon').css('-webkit-transform': 'rotate(180deg)');
      $('#upIcon').css('-moz-transform': 'rotate(180deg)');

      this.setState({ open: true });
    }
  }

  render() {
    return (
      <div className={s.sliderContainer} id={'sliderContainer'}>
        <div
          className={s.slideArea}
          id={'slideArea'}
          onClick={() => { this.toggle() }}
        >
          <div className={s.default}>
            <img src={upIcon} className={s.upIcon} id={'upIcon'} />
          </div>
        </div>
        <div className={s.listWrap} id={'listWrap'}>
          {
            this.props.postData &&
            this.props.postData.map((post, index) => (
              <Posts
                key={index}
                index={index}
                data={post}
              />
            ))
          }
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


// <div className={s.filter}>
//   <div
//     className={`${s.boxLeft} ${this.state.activeList === 'reformers' ? s.activeList : s.inactiveList}`}
//     onClick={() => { this.toggleList('reformers'); }}
//   >
//       Reformers
//   </div>
//   <div
//     className={`${s.boxRight} ${this.state.activeList === 'stories' ? s.activeList : s.inactiveList}`}
//     onClick={() => { this.toggleList('stories'); }}
//   >
//     Stories
//   </div>
// </div>
