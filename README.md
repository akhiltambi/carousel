This project is for the carousel implementation using react.

## Carousel in React


![](recording.gif)


The logic of carousel implementation is present in CarouselComponent.js:
``src/components/CarouselComponent.js``

Some sample use of this component are given in 
``src/App.js``

Following is sample piece of code snip to show how to use the carousel component.
```javascript
import React from 'react';
import Carousel from './components/CarouselComponent';
import './App.css';

function App() {
    return (
        <Carousel className="height"
          autoplay={true}
          slideshowSpeed={4000}
          pauseOnHover={true}
          controls={true}
          indicators={true}
          wrap={true}
          defaultActiveIndex={3}
        >
            <Carousel.Item className="your-class-for-item">
                <img src={'/image-source.jpg'}
                alt={'alt'} />
                <Carousel.Caption>
                <p>{'caption for the image'}</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item className="your-class-for-item">
                <p>{'your text for the slide'}</p>
                <Carousel.Caption>
                <p>{'caption for the text'}</p>
                </Carousel.Caption>
            </Carousel.Item>
            
            {/* ... more items */}
        </Carousel>
    );
}

export default App;
```

Caoursel Component accepts following props:

1) ``className`` (type: string, default: empty string) 
    - This prop can be used to apply any other css class. Accepts space separated cass classes.

2) ``autoplay `` (type: boolean, default: true)
    - This prop can be used to enable or diable autoplay of the slides.

3) ``slideshowSpeed`` (type: number, default: 4000 (ms))
    - This prop can be used to adjust the speed of slideshow. Accepts value in ms. If set to 0, autoplay will stop.

4) ``pauseOnHover`` (type: boolean, default: true)
    - This prop can be used to pause on hover of slide in autoplay. It will work only when ``autoplay=true``

5) ``controls`` (type: boolean, default: true)  
    - This prop can be used to hide/unhide left-right controls.

6) ``indicators`` (type: boolean, default: true)  
    - This prop can be used to hide/unhide indicators, which can be used to navigate to particular slide.

7) ``wrap`` (type: boolean, default: true)
    - This prop can be used to whether enable or disable the slide show in circular motion. Note, if autoplay=true, slide show will go in circular but left and right arrows will be disabled.

8) ``defaultActiveIndex`` (type: number, default: 0)
    - This prop can be used to set the slide show start from a particular slide.



## Installation information:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

You may clone the directory using ``git clone https://github.com/akhiltambi/carousel.git`` command in cmd prompt/terminal. 

After go inside the project directory and run

### `yarn install`

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
