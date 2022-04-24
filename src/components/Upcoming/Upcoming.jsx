import Modal from 'components/Movies/Modal'
import Scrollable from 'components/Recommend/Scrollable'
import React, { useEffect, useState } from 'react'
import upcomingStyles from './Upcoming.module.css'
function Upcoming() {
    const [upcoming,setUpcoming] = useState()
    const [id,setID] = useState()
    const [modalVisible,setModalVisible] = useState()
    
    const getUpcoming = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_BEARER}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=US", requestOptions)
        .then(response => response.json())
        .then(result => setUpcoming(result.results))
        .catch(error => console.log('error', error));
    }
    
    useEffect(() => {
        getUpcoming()
    },[])
  return (
    <div>
        <h2 className={upcomingStyles.title}>Upcoming Movies</h2>
        <Scrollable>
            {upcoming && upcoming?.map((movie,index) => {
                    return(
                        movie?.poster_path && <div key={index} className={upcomingStyles.poster} onClick={() => {setModalVisible(true);setID(movie?.id)}}>
                            <img className={upcomingStyles.posterImage} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} width="200" height={"300"}/>
                        </div>
                    )
                })
                }
        </Scrollable>
        {modalVisible && id && <Modal modalVisible={modalVisible} id={id} setModalVisible={setModalVisible}/>}
    </div>
  )
}

export default Upcoming