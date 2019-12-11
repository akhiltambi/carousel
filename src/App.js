import React from 'react';
import { CarouselSlidesData } from './shared/CarouselSlidesData';
import Carousel from './components/CarouselComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        
        {/*  Carousel with all options enabled */}
        <Carousel className="height half-width adjust-content-height"
          wrap={true}
          autoplay={true}
          controls={true}
          slideshowSpeed={4000}
          defaultActiveIndex={3}
          pauseOnHover={true}
          indicators={true}
        >
          {CarouselSlidesData.map((item, index) =>
            <Carousel.Item key={index}>
              <img src={item.image}
                alt={item.info + ', ' + item.source} />
              <Carousel.Caption>
                <p>
                  <strong className="info">{item.info}</strong>
                  {" "}
                  <small className="source">{item.source}</small>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>

        {/*  Carousel with autoplay off and wrap off */}
        <Carousel className="height half-width adjust-content-height"
          wrap={false}
          autoplay={false}
          controls={true}
          slideshowSpeed={4000}
          defaultActiveIndex={0}
          indicators={true}
        >
          {CarouselSlidesData.map((item, index) =>
            <Carousel.Item key={index}>
              <img src={item.image}
                alt={item.info + ', ' + item.source} />
              <Carousel.Caption>
                <p>
                  <strong className="info">{item.info}</strong>
                  {" "}
                  <small className="source">{item.source}</small>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>

        {/*  Carousel with autoplay off but wrap on and with controls and indicators visibles */}
        <Carousel className="height half-width adjust-content-height"
          wrap={true}
          autoplay={false}
          controls={true}
          slideshowSpeed={0}
          defaultActiveIndex={CarouselSlidesData.length-1}
          indicators={true}
        >
          {CarouselSlidesData.map((item, index) =>
            <Carousel.Item key={index}>
              <img src={item.image}
                alt={item.info + ', ' + item.source} />
              <Carousel.Caption>
                <p>
                  <strong className="info">{item.info}</strong>
                  {" "}
                  <small className="source">{item.source}</small>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>

        {/*  Carousel with autoplay on and wrap on but controls and indicators hidden */}
        <Carousel className="height half-width adjust-content-height"
          wrap={true}
          autoplay={true}
          controls={false}
          slideshowSpeed={3000}
          defaultActiveIndex={0}
          pauseOnHover={true}
          indicators={false}
        >
          {CarouselSlidesData.map((item, index) =>
            <Carousel.Item key={index}>
              <img src={item.image}
                alt={item.info + ', ' + item.source} />
              <Carousel.Caption>
                <p>
                  <strong className="info">{item.info}</strong>
                  {" "}
                  <small className="source">{item.source}</small>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default App;
