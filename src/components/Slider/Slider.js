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
    sliderActive: PropTypes.bool,
    activateSlider: PropTypes.func,
  }

  static propTypes = {
    postData: PropTypes.obj,
    sliderActive: PropTypes.bool,
    activateSlider: PropTypes.func,
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

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.sliderActive !== this.props.sliderActive) {
      this.toggle(true);
    }
  }

  toggle(callLocation) {
    if (callLocation === false) {
      this.props.activateSlider();
      return;
    }
    if (this.props.sliderActive === true) {
      $('#listWrap').css('max-height', '0px')
      $('#slideArea').css('height', '100%')
      $('#listWrap').css('overflow-y', 'hidden');
      // Rotate Arrow
      $('#upIcon').css('transform', 'rotate(0deg)');
      $('#upIcon').css('-webkit-transform': 'rotate(0deg)');
      $('#upIcon').css('-moz-transform': 'rotate(0deg)');
    } else {
      $('#listWrap').css('max-height', `${(window.innerHeight * 0.75) - 100}px`)
      $('#slideArea').css('height', '100%')
      $('#listWrap').css('overflow-y', 'scroll')
      // Rotate Arrow
      $('#upIcon').css('transform', 'rotate(180deg)');
      $('#upIcon').css('-webkit-transform': 'rotate(180deg)');
      $('#upIcon').css('-moz-transform': 'rotate(180deg)');
    }
  }

  render() {
    return (
      <div className={s.sliderContainer} id={'sliderContainer'}>
        <div
          className={s.slideArea}
          id={'slideArea'}
          onClick={() => { this.toggle(false) }}
        >
          <div className={s.default}>
            <img src={upIcon} className={s.upIcon} id={'upIcon'} />
          </div>
        </div>

        <div className={s.listWrap} id={'listWrap'}>
          {
            this.props.postData.map((post, index) => (
              post.authorName &&
              <div>
                { <hr className={s.line} /> }
                <Posts
                  key={index}
                  index={index}
                  mediaUrl={post.mediaUrl}
                  title={post.title.rendered}
                  authorName={post.authorName}
                  link={post.link}
                />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Slider);
