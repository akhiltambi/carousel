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
      let rowClass = "carousel-slide";
      return (
        <div key={index}
          className={rowClass}>
          {child}
        </div>
      );
    };

    let processedItems = children.map((child, index) => {
      return createItem(child, index);
    });

    return (
      <div className="carousel-slides">
        <div className="carousel-slide-dummy"></div>
        {processedItems}
        <div className="carousel-slide-dummy"></div>
      </div>
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
    slideshowSpeed: 4000,
    defaultActiveIndex: 0,
    wrap: true,
    autoplay: true,
    children: [],
    className: "",
    pauseOnHover: true
  };

  carousel = React.createRef();

  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: props.defaultActiveIndex || 0,
    };

  }

  scrollTo(index) {
    let elem = this.carousel.current.querySelector('.carousel-slides');
    let children = elem.children;
    elem.scrollTo({
      top: 0,
      left: children[index+1].offsetLeft - children[0].offsetWidth,
      behavior: 'smooth'
    });
    // scrollIntoView flickers the screen if more than 2-3 carousels on autoplay, when animation happens. 
    // As it tries to bring that element in view.
    // this.carousel.current.querySelector('.carousel-slides').children[index+1].scrollIntoView({
    //   behaviour: 'smooth',
    //   // block: 'center',
    //   inline: 'center'
    // });
  }

  goToSlide(index) {
    
    this.scrollTo(index);

    this.setState({
      activeIndex: index
    });
  }

  goToPrevSlide(e) {
    e && e.preventDefault();

    let index = this.state.activeIndex;
    let { children } = this.props;
    let childrenLength = children.length;

    if (index < 1) {
      index = childrenLength;
    }

    --index;
    
    this.scrollTo(index);
    
    this.setState({
      activeIndex: index
    });
  }

  goToNextSlide(e) {
    e && e.preventDefault();

    let index = this.state.activeIndex;
    let { children } = this.props;
    let childrenLength = children.length - 1;

    if (index >= childrenLength) {
      index = -1;
    }

    ++index;
    
    this.scrollTo(index);
    
    this.setState({
      activeIndex: index
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
    this.goToSlide(this.state.activeIndex);
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
    if(!children || children.length === 0) {
      return (
        <div className={`carousel ${className || ''}`}>
          <strong>No slides to display.</strong>
        </div>
      )
    }
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
        onMouseOut={this.handleMouseOut}
        ref={this.carousel}>
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
