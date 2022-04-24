import Modal from 'components/Movies/Modal'
import Scrollable from 'components/Recommend/Scrollable'
import React, { useEffect, useState } from 'react'
import trendingStyles from './Trending.module.css'
function Trending() {

  const [trending,setTrending] = useState()
  const [id,setID] = useState()
  const [modalVisible,setModalVisible] = useState()
    
  useEffect(() => {
      getTrending();
  },[])
  const getTrending = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_BEARER}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&region=IN", requestOptions)
      .then(response => response.json())
      .then(result => setTrending(result.results))
      .catch(error => console.log('error', error));
  }
  return (
    <div>
    <h2 className={trendingStyles.title}>Trending Movies</h2>
      <Scrollable>
          {trending && trending?.map((movie,index) => {
                    return(
                        movie?.poster_path && <div key={index} className={trendingStyles.poster} onClick={() => {setModalVisible(true);setID(movie?.id)}}>
                            <img className={trendingStyles.posterImage} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} width="200" height={"300"}/>
                        </div>
                    )
                })
                }
      </Scrollable>
      {modalVisible && id && <Modal modalVisible={modalVisible} id={id} setModalVisible={setModalVisible}/>}
    </div>
  )
}

export default Trending