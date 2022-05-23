import Modal from 'components/Movies/Modal'
import Scrollable from 'components/Recommend/Scrollable'
import { useFeatureContext } from 'Context/NavigationContext'
import { arrayRemove, collection, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import app from 'Utilities/firebase'
import recentSearchStyles from './RecentSearch.module.css'

function RecentSearch() {
    const [search,setSearch] = useState()
    const [movies, setMovies] = useState([])
    const [id, setID] = useState()
    const [modalVisible, setModalVisible] = useState()
    const [Features,dispatch] = useFeatureContext()
    const db = getFirestore(app)

    const getRecent = () => {
            const q = query(collection(db,"Search"),where("uid","==",Features?.user?.uid))
            const unsubscribe = onSnapshot(q, snapshot => {
                snapshot.forEach(doc => {
                    setMovies([])
                    doc.data()?.movies?.map((value,index) => {
                        fetchMovieDetails(value)
                    })
                })
            })
    }

    const fetchMovieDetails = async(id) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_BEARER}`);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, requestOptions)
          .then(response => response.json())
          .then(async result => {
                // setMovies(movies?.filter(movie => movie?.id === id))
                setMovies(prev => [...prev,result])
            })
          .catch(error => console.log('error', error));
      };

    useEffect(() => {
        (Features?.user?.uid) &&
        getRecent()
    },[Features?.user?.uid,Features?.movie?.id])

  return (
    <div>
        <h2 className={recentSearchStyles.title}>Recent Search</h2>
        <Scrollable>
            {movies && movies?.map((movie,index) => {
                    // console.log(movie)
                    return(
                        movie?.poster_path && <div key={index} className={recentSearchStyles.poster} onClick={() => {setModalVisible(true);setID(movie?.id)}}>
                            <img className={recentSearchStyles.posterImage} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} width="200" height={"300"}/>
                        </div>
                    )
                })
                }
        </Scrollable>
        {modalVisible && id && <Modal modalVisible={modalVisible} id={id} setModalVisible={setModalVisible}/>}
    </div>
  )
}

export default RecentSearch