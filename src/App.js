import React from 'react';
import { CarouselSlidesData } from './shared/CarouselSlidesData';
// import CarouselSandbox from './components/CarouselSandboxComponent';
import Carousel from './components/CarouselComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <CarouselSandbox slides={CarouselSlidesData} />  */}
      <br></br>
      <Carousel className="img height"
        wrap={true}
        autoplay={true}
        controls={true}
        slideshowSpeed={3000}
        defaultActiveIndex={3}
        pauseOnHover={true}
      >
        {CarouselSlidesData.map((item, index) =>
          <Carousel.Item key={index}>
            <img src={item.content.image}
              alt={item.author + ', ' + item.source} />
            <Carousel.Caption>
              <p>
                <strong className="author">{item.author}</strong>
                {" "}
                <small className="source">{item.source}</small>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
}

export default App;
