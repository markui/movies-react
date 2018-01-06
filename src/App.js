import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'


class App extends Component {

  // Render: componentWillMount() => render() => componentDidMount()
  // When the component starts to exist in the Real World
  // for ex) make request to API => render() => we do sth with the data
  // Notified that~
  // 1. component is going to exist now
  // 2. component exists now
  // 3. evth is successful and you can see component in React Universe


  // Update: componentWillRecieveProps() => shouldComponentUpdate() => componentWillUpdate() => render() => componentDidUpdate()
  // 1. Component gets new props
  // 2. React looks at the old props/new props
  //  - if old props and new props are different => shouldComponentUpdate() == true
  //  - if it is same, don't update
  // 3. Notifies you that component will Update
  // 4. evth is successful and you can see component in React Universe

  state = {
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       movies: [
  //         {
  //           title: "Matrix",
  //           poster: "https://metrouk2.files.wordpress.com/2017/02/the-matrix.jpg?quality=80&strip=all&strip=all"
  //         },
  //         {
  //           title: "Superman",
  //           poster: "https://i.ytimg.com/vi/fa549RILAWo/maxresdefault.jpg"
  //         },
  //         {
  //           title: "Batman",
  //           poster: "http://digitalspyuk.cdnds.net/17/30/768x576/gallery-1500912633-batman-george-clooney.jpg"
  //         },
  //         {
  //           title: "Spiderman",
  //           poster: "https://lumiere-a.akamaihd.net/v1/images/image_ccc4b657.jpeg"
  //         }
  //       ]
  //     })
  //   }, 5000);
  // }

  componentDidMount() {
    this._getMovies();
  }

  _getMovies = async () => {
    const movies = await this._callApi();
    this.setState({
      movies
    })
  }
  _callApi = () => {
    return fetch("https://yts.am/api/v2/list_movies.json?sort_by=rating")
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie =>
      <Movie
      title={movie.title_english}
      poster={movie.small_cover_image}
      genres={movie.genres}
      key={movie.id}
      synopsis={movie.synopsis}
      />)
    return movies
  }


  render() {
    const {movies} = this.state;
    console.log(movies);
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
