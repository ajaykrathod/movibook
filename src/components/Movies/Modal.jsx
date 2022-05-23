import React, { useEffect, useState } from 'react'
import modalStyles from 'components/Movies/Modal.module.css'
import { useFeatureContext } from 'Context/NavigationContext';
import { addDoc, arrayUnion, collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import app from 'Utilities/firebase';
import YouTube from 'react-youtube-embed';

function Modal({id,modalVisible,setModalVisible}) {
  
  const [movie, setMovie] = useState()
  const [providers, setProviders] = useState()
  const [buy, setBuy] = useState([])
  const [rent, setRent] = useState([])
  const [moviesVideos, setMoviesVideos] = useState([]);

  const [cast, setCast] = useState([])
  const [Features,dispatch] = useFeatureContext()
  const db = getFirestore(app)
  const fetchMovieDetails = async() => {
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
          fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`,requestOptions)
          .then(res => res.json())
          .then(get => {
            setBuy(get.results?.IN?.buy)
            setRent(get.results?.IN?.rent)
          })
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?&language=en-US`,requestOptions)
          .then(res => res.json())
          .then(get => {
            setCast(get.cast)
          })
          .catch(err => console.log(err))
          
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, requestOptions)
          .then(response => response.json())
          .then(result => setMoviesVideos(result.results))
          .catch(error => console.log('error', error));

          const docs = await getDocs(query(collection(db,"Search")),where("uid","==",Features?.user?.uid))
          if(docs.docs.length <= 1) {
            docs.docs.forEach(snapshot => {    
              updateDoc(doc(db,"Search",snapshot.id),{
                    movies: arrayUnion(id)
              })
            }) 
          }
          setMovie(result);
          dispatch({
            type:'movie',
            movie: {
              id
            }
          })
        })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    id && fetchMovieDetails();
  },[id]);
  return (
    <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modal}>
                <div className={modalStyles.close}>
                <img 
                    src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png" 
                    onClick={() => setModalVisible(!modalVisible)}
                />
                </div>
                {movie && 
                <div className={modalStyles.posterContainer}>
                  <img className={modalStyles.posterImage} src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}/>
                  <div className={modalStyles.infomovie}>
                      <h2>{movie?.title}</h2>
                      <h3>{movie?.tagline}</h3>
                      {/* <strong>Released On</strong> */}
                      <h3>{movie?.release_date}</h3>
                      <strong>Overview</strong>
                      <h4>{movie?.overview}</h4>
                      {/* <strong>Status</strong>
                      <h3>{movie?.status}</h3> */}
                      <div>
                        <strong>Rating</strong>
                        <h3>{movie?.vote_average}({movie?.vote_count})</h3>
                      </div>
                  </div>
                </div>}
                <div className={modalStyles.trailerDiv}>
                  <strong>Trailer</strong>
                  <div className={modalStyles.trailerHorizontal}>
                  {moviesVideos && moviesVideos?.map((value,index) => {
                    return(
                        <div key={index} className={modalStyles.trailerContainer}>
                          {value && value?.type === "Trailer" && value?.site === "YouTube"  && value?.official === true && 
                          <YouTube id={value?.key} className={modalStyles.youtube}/>}
                        </div>
                    )
                  })}
                  </div>
                </div>
                {/* <strong>Cast</strong>
                <div className={modalStyles.castContainer}>
                  {cast && cast.map((value,index) => {
                    console.log(value)
                    return(
                      <div key={index}>
                          {value && <img className={modalStyles.buyIcon} src={`https://image.tmdb.org/t/p/original${value.profile_path}`}/>}
                          <h4>{value?.name}</h4>
                      </div>
                    )
                  })}
                </div> */}
                <strong>Buy At</strong>
                <div className={modalStyles.buyRentContainer} >
                  {buy?.map((value,index) => {
                    // console.log(value)
                    return(
                      <div key={index}>
                          <img className={modalStyles.buyIcon} src={`https://image.tmdb.org/t/p/original${value?.logo_path}`}/>
                          <h4>{value?.provider_name}</h4>
                      </div>
                    )
                  })}
                  {rent?.map((value,index) => {
                    // console.log(value)
                    return(
                      <div></div>
                    )
                  })}
                  </div>
        </div>
    </div>
  )
}

export default Modal