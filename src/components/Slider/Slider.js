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
import Authors from '../Authors';

class Slider extends React.Component {
  static defaultProps = {
    postData: PropTypes.object,
    authorData: PropTypes.object,
  }

  static propTypes = {
    postData: PropTypes.object,
    authorData: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeList: 'stories',
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
      	$('#sliderContainer').css('height', '60%')
        $('#sliderContainer').css('top', '40%')
        $('#slideArea').css('height', '20%')
        $('#listWrap').css('overflow', 'scroll')
      });

      hammertime.on('pandown', function(ev) {
      	$('#sliderContainer').css('height', '20%')
        $('#sliderContainer').css('top', '80%')
        $('#listWrap').css('overflow', 'hidden')
        $('#slideArea').css('height', '80%')
      });
    }
  }

  toggleList(list) {
    this.setState({ activeList: list });
  }

  list() {
    // if (this.state.activeList === 'stories' && this.props.postData.length > 0) {
    //   return (this.props.postData.map((post, index) => (
    //     <Posts />
    //   ))
    // } else {
    //   return (this.props.authorData.map((author, index) => (
    //     <Authors data={author} />
    //   ))
    // }
  }

  render() {
    return (
        <div className={s.sliderContainer} id={'sliderContainer'}>
          <div className={s.slideArea} id={'slideArea'}>
            <div className={s.arrow}>^</div>
            <div className={s.filter}>
              <div
                className={`${s.boxLeft} ${this.state.activeList === 'reformers' ? s.activeList : s.inactiveList}`}
                onClick={() => { this.toggleList('reformers'); }}
              >
                  Reformers
              </div>
              <div
                className={`${s.boxRight} ${this.state.activeList === 'stories' ? s.activeList : s.inactiveList}`}
                onClick={() => { this.toggleList('stories'); }}
              >
                Stories
              </div>
            </div>
          </div>

          <div className={s.listWrap} id={'listWrap'}>
            {
              this.state.activeList === 'stories' ?
                this.props.postData &&
                this.props.postData.map((post, index) => (
                  <Posts
                    key={index}
                    data={post}
                  />
                ))
              :
                this.props.authorData &&
                this.props.authorData.map((author, index) => (
                  <Posts
                    key={index}
                    data={author}
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
