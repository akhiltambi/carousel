import React, { Component } from 'react';
import './CarouselComponent.css';

class CarouselLeftArrow extends Component {
  render() {
    return (
      <div
        // href="#"
        className="carousel-arrow carousel-arrow-left"
        onClick={this.props.onClick}
      >
        <span className="fa fa-2x fa-angle-left margin-5px" />
      </div>
    );
  }
}

class CarouselRightArrow extends Component {
  render() {
    return (
      <div
        className="carousel-arrow carousel-arrow-right"
        onClick={this.props.onClick}
      >
        <span className="fa fa-2x fa-angle-right margin-5px"></span>
      </div>
    );
  }
}

class CarouselIndicator extends Component {
  render() {
    return (
      <li>
        <a
          className={
            this.props.index === this.props.activeIndex
              ? "carousel-indicator carousel-indicator-active"
              : "carousel-indicator"
          }
          onClick={this.props.onClick}
        />
      </li>
    );
  }
}

class CarouselSlide extends Component {
  render() {
    const isActive = this.props.index === this.props.activeIndex;
    const isPrev = this.props.index === (this.props.activeIndex - 1);
    const isNext = this.props.index === (this.props.activeIndex + 1);
    let jsf = (
      <li
        className={
          isActive ? "carousel-slide carousel-slide-active" //+ (this.props.by === 'prev'? 'carousel-slide--by-prev':(this.props.by === 'jump'?''))
            : (isPrev? "carousel-slide carousel-slide-prev" 
            : (isNext? "carousel-slide carousel-slide-next" 
            : "carousel-slide"))
        }
      >
        { this.props.slide.content.image? <img className="carousel-slide-content" src={this.props.slide.content.image}></img> : <p className="carousel-slide-content">{this.props.slide.content.text}</p>}
        <p>
          <strong className="carousel-slide-author">
            {this.props.slide.author}
          </strong>,
          {" "}
          <small className="carousel-slide-source">
            {this.props.slide.source}
          </small>
        </p>
      </li>
    );
    return jsf;
    // if(this.props.activeIndex - 1 < 0) {
    //   jsf=(<li className="carousel-slide carousel-slide-prev" ></li>) + jsf
    // } 
    // if(this.props.activeIndex + 1 >= this.props.slidesLength) {
    //   jsf+=(<li className="carousel-slide carousel-slide-next" ></li>) 
    // }
    // return jsf;
    // {(this.props.activeIndex + 1) > this.props.slidesLength ? <li className="carousel-slide carousel-slide-prev" ></li> : '');}

  }
}

// Carousel wrapper component
class CarouselSandbox extends Component {
  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0,
      by:'jump'
    };
  }

  goToSlide(index) {
    this.setState({
      activeIndex: index,
      by: 'jump'
    });
  }

  goToPrevSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index,
      by:'prev'
    });
  }

  goToNextSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index,
      by:'next'
    });
  }

  render() {
    return (
      <div className="carousel">
        <CarouselLeftArrow onClick={e => this.goToPrevSlide(e)} />
        <ul className="carousel-slides">
        <li className={"carousel-slide"+ (this.state.activeIndex===0? " carousel-slide-prev": "")}>
        { this.props.slides[this.props.slides.length-1].content.image? <img className="carousel-slide-content" src={this.props.slides[this.props.slides.length-1].content.image}></img> : <p className="carousel-slide-content">{this.props.slides[this.props.slides.length-1].content.text}</p>}

        {/* <p>
          <strong className="carousel-slide-author">
            {this.props.slide.author}
          </strong>,
          {" "}
          <small className="carousel-slide-source">
            {this.props.slide.source}
          </small>
        </p> */}
      </li>
          {this.props.slides.map((slide, index) =>
            <CarouselSlide
              key={index}
              index={index}
              slidesLength={this.props.slides.length}
              activeIndex={this.state.activeIndex}
              by={this.state.by}
              slide={slide}
            />
          )}
          <li className={"carousel-slide"+ (this.state.activeIndex+1==this.props.slides.length?" carousel-slide-next":"")}>
        { this.props.slides[0].content.image? <img className="carousel-slide-content" src={this.props.slides[0].content.image}></img> : <p className="carousel-slide-content">{this.props.slides[0].content.text}</p>}

        {/* <p>
          <strong className="carousel-slide-author">
            {this.props.slide.author}
          </strong>,
          {" "}
          <small className="carousel-slide-source">
            {this.props.slide.source}
          </small>
        </p> */}
      </li>
        </ul>

        <CarouselRightArrow onClick={e => this.goToNextSlide(e)} />

        <ul className="carousel-indicators">
          {this.props.slides.map((slide, index) =>
            <CarouselIndicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              isActive={this.state.activeIndex===index} 
              onClick={e => this.goToSlide(index)}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default CarouselSandbox;
