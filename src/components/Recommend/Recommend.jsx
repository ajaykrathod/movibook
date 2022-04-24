import { useFeatureContext } from 'Context/NavigationContext'
import { collection, getDocs, getFirestore, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import app from 'Utilities/firebase'
import Scrollable from './Scrollable'
import recommendStyles from './Recommend.module.css'
import Modal from 'components/Movies/Modal'
function Recommend() {
    const db = getFirestore(app)
    const [Features,dispatch] = useFeatureContext()
    const [recommendations,setRecommendations] = useState()
    const [search,setSearch] = useState()
    const [id,setID] = useState()
    const [modalVisible,setModalVisible] = useState()
    const getSearch = async () => {
        const querySnapshot = await getDocs(collection(db,Features?.user?.uid))
        querySnapshot.forEach(doc => {
            console.log(doc.data())
        })
    }

    const getRecommendedMovies = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_BEARER}`);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`https://api.themoviedb.org/3/movie/${Features?.movie?.id}/recommendations?language=en-US&page=1`, requestOptions)
          .then(response => response.json())
          .then(result => setRecommendations(result.results))
          .catch(error => console.log('error', error));
    }
    useEffect(() => {
        setID(Features?.movie?.id)
        getRecommendedMovies();
    },[Features?.movie])
  return (
    <div>
        <h2 className={recommendStyles.title}>Recommended Movies</h2>
        <Scrollable>
            {/* <div> */}
                {recommendations && recommendations?.map((movie,index) => {
                    // console.log(movie)
                    return(
                        movie?.poster_path && <div key={index} className={recommendStyles.poster} onClick={() => {setModalVisible(true);setID(movie?.id)}}>
                            <img className={recommendStyles.posterImage} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} width="200" height={"300"}/>
                        </div>
                    )
                })
                }
            {/* </div> */}
        </Scrollable>
        {modalVisible && id && <Modal modalVisible={modalVisible} id={id} setModalVisible={setModalVisible}/>}
    </div>
  )
}

export default Recommend