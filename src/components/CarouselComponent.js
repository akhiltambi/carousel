import React, { Component } from 'react';
import './CarouselComponent.css';

class CarouselLeftArrow extends Component {
  render() {
    return (
      <div className={`carousel-arrow carousel-arrow-left ${this.props.classNames}`}
        onClick={this.props.onClick}>
        <span className="fa fa-2x fa-angle-left margin-5px" />
      </div>
    );
  }
}

class CarouselRightArrow extends Component {
  render() {
    return (
      <div className={`carousel-arrow carousel-arrow-right ${this.props.classNames}`}
        onClick={this.props.onClick}>
        <span className="fa fa-2x fa-angle-right margin-5px"></span>
      </div>
    );
  }
}

class CarouselIndicator extends Component {
  render() {
    const { children } = this.props;
    const indicators = children.map((child, index) =>
      <li key={index}>
        <div className={
          index === this.props.activeIndex
            ? "carousel-indicator carousel-indicator-active"
            : "carousel-indicator"
        }
          onClick={e => this.props.onClick(e, index)}
        />
      </li>
    );
    return (
      <ul className="carousel-indicators">
        {indicators}
      </ul>
    );
  }
}

class CarouselSlide extends Component {
  render() {

    const { children } = this.props;

    const createItem = (child, index) => {
      const isActive = index === this.props.activeIndex;
      const isPrev = index === (this.props.activeIndex - 1);
      const isNext = index === (this.props.activeIndex + 1);
      let rowClass = "carousel-slide";
      if (isActive) {
        rowClass += " carousel-slide-active"
      } else if (isPrev) {
        rowClass += " carousel-slide-prev"
      } else if (isNext) {
        rowClass += " carousel-slide-next"
      }
      return (
        <li key={index}
          className={rowClass}>
          {child}
        </li>
      );
    };

    let processedItems = children.map((child, index) => {
      return createItem(child, index);
    });

    // if (!(children.length === 1 || children.length === 2)) {
    //   processedItems = (
    //   <>
    //     {createItem(children[children.length - 1], -1)}
    //     {processedItems}
    //     {createItem(children[0], children.length)}
    //   </>
    //   );
    // }

    return (
      <ul className="carousel-slides">
        {processedItems}
      </ul>
    );
  }
}

class CarouselItem extends Component {
  render() {
    return (
      <div className={`carousel-slide-content ${this.props.className || ''}`}>
        {this.props.children}
      </div>
    );
  }
}

class CarouselCaption extends Component {
  render() {
    return (
      <div className={`carousel-slide__caption ${this.props.className || ''}`}>
        {this.props.children}
      </div>
    );
  }
}

// Carousel wrapper component
class Carousel extends Component {

  static defaultProps = {
    indicators: true,
    controls: true,
    slideshowSpeed: 400,
    defaultActiveIndex: 5,
    wrap: true,
    autoplay: true,
    children: [],
    className: "",
    pauseOnHover: true
  };

  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: props.defaultActiveIndex || 0,
    };

  }

  goToSlide(index) {
    this.setState({
      activeIndex: index,
      by: 'jump'
    });
  }

  goToPrevSlide(e) {
    e && e.preventDefault();

    let index = this.state.activeIndex;
    let { children } = this.props;
    let slidesLength = children.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index,
      by: 'prev'
    });
  }

  goToNextSlide(e) {
    e && e.preventDefault();

    let index = this.state.activeIndex;
    let { children } = this.props;
    let slidesLength = children.length - 1;

    if (index >= slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index,
      by: 'next'
    });
  }

  pause() {
    this._isPaused = true;
    clearInterval(this._interval);
    this._interval = null;
  }

  autoplay() {
    this._isPaused = false;

    clearInterval(this._interval);
    this._interval = null;

    if (this.props.slideshowSpeed
      && this.props.autoplay
      && !this._isPaused) {
      this._interval = setInterval(this.goToNextSlide,
        this.props.slideshowSpeed,
      );
    }
  }

  handleMouseOut = () => {
    this.autoplay();
  };

  handleMouseOver = () => {
    if (this.props.pauseOnHover) this.pause();
  };

  componentDidMount() {
    this.autoplay();
  }

  render() {
    const {
      children,
      wrap,
      controls,
      indicators,
      className
    } = this.props;

    let leftControl = <></>;
    let rightControl = <></>;

    if (controls) {
      let controlClassName = (this.state.activeIndex === 0 && !wrap ? 'carousel-arrow-disable' : '');
      leftControl =
        <CarouselLeftArrow
          classNames={controlClassName}
          onClick={e => this.goToPrevSlide(e)}
        />;

      controlClassName = ((this.state.activeIndex === (children.length - 1) && !wrap) ? 'carousel-arrow-disable' : '');
      rightControl =
        <CarouselRightArrow
          classNames={controlClassName}
          onClick={e => this.goToNextSlide(e)}
        />;

    }
    return (
      <div className={`carousel ${className || ''}`}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        {leftControl}
        {rightControl}
        <CarouselSlide
          activeIndex={this.state.activeIndex}
        >
          {children}
        </CarouselSlide>
        {indicators
          ? <CarouselIndicator
            activeIndex={this.state.activeIndex}
            onClick={(e, index) => this.goToSlide(index)}
          >
            {children}
          </CarouselIndicator>
          : <></>}

      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this._interval);
    this._interval = null;
    console.log('unmounting');
  }

}

Carousel.Item = CarouselItem;
Carousel.Caption = CarouselCaption;

export default Carousel;
