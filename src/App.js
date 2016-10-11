import React from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import './styles/Styles.css';

//to-do block pinterest plugin

let App = React.createClass ({

  getInitialState() {
    return {
      data: [],
      photos: ["loading"]
    }
  },

  getPhotos() {
    axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6d169abba1c0afe3002ea6c9a5549924&tags=iceland&accuracy=62.00%2C+64.00%2C+18.00%2C+21.00&per_page=50&format=json&nojsoncallback=1&auth_token=72157673746422511-9255a2ac10975a54&api_sig=d92d88f49dff674c923c39b531142fe6')
      .then((response) =>{
        this.setState({
          data: response.data.photos.photo,
          photos: []
        })
      })
      .catch(function (error) {
        console.log('there was an error');
      });
  },

  componentDidMount() {
    this.getPhotos();
  },

  render() {

    for (let key in this.state.data) {
      if(this.state.data.hasOwnProperty(key)) {
        let farm = this.state.data[key].farm;
        let serverID = this.state.data[key].server;
        let photoID = this.state.data[key].id;
        let secret = this.state.data[key].secret;
        let title = this.state.data[key].title;
        let url = `https://farm${farm}.staticflickr.com/${serverID}/${photoID}_${secret}_b.jpg`;
        let backgroundStyle = {
            backgroundImage: `url(${url})`
        }
        this.state.photos.push(<div><div className="slide-slide__backgroundImage" style={backgroundStyle}></div><img src={`${url}`} key={key} data-title={`${title}`} alt={`${title}`}/></div>);
      }
    };


    let items = this.state.photos.map(function (photo, index) {
        return (<div key={index}>{photo}</div>);
    });


    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };


    return (
      <div className='container'>
        <h1>React Flickr Slideshow</h1>
        <Slider {...settings}>{items}</Slider>
        <a href="https://github.com/chrisburkedev/react-flickr-spa" target="_blank" className="sourceLink">Github Source</a>
      </div>
    );
  }
});

module.exports = App;
