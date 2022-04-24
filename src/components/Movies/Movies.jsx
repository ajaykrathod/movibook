import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header'
import Recommend from 'components/Recommend/Recommend';
import RecentSearch from 'components/Search/RecentSearch';
import Trending from 'components/Trending/Trending';
import Upcoming from 'components/Upcoming/Upcoming';
import React from 'react'
import Search from './Search';

function Movies() {
  const fetchGenres = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_BEARER}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en-US", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  return (
    <div>
      <Header/>
      <Search/>
      <RecentSearch/>
      <Recommend/>
      <Trending/>
      <Upcoming/>
      <Footer/>
    </div>
  )
}

export default Movies