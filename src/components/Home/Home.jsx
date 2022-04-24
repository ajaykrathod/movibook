import 'App.css';
import Header from 'components/Header/Header';
import Landing from 'components/Landing/Landing';
import Modal from 'components/Modal/Modal';
import { useFeatureContext } from 'Context/NavigationContext';
import { useEffect, useState } from 'react';
import homeStyles from 'components/Home/Home.module.css'
import { BooksGenres } from 'components/Movies/Genres';
import Recommend from 'components/Recommend/Recommend';
import RecentSearch from 'components/Search/RecentSearch';
import RecentBookSearch from 'components/RecentBooks/RecentBookSearch';
import Footer from 'components/Footer/Footer';



function Home() {
  const [features,dispatch] = useFeatureContext()
  const [modalVisible,setModalVisible]  = useState(true)
  const [optionsSelected, setOptionsSelected] = useState(false)
  const [genreSelected, setGenreSelected] = useState()
  const [selectedOption, setSelectedOption] = useState()
  const [genres,setGenres] = useState([])
  const [genresID, setGenresID] = useState({})
  const [booksGenres, setBooksGenres] = useState({})
  const [booksGenreSelected,setBooksGenreSelected] = useState(false)
  const [moviesGenreSelected,setMoviesGenreSelected] = useState(false)
  const [bookClicked,setBookClicked]  = useState(false)
  useEffect(() => {
  },[genres])
  const fetchGenres = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_BEARER}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en-US", requestOptions)
      .then(response => response.json())
      .then(result => setGenres(result.genres))
      .catch(error => console.log('error', error));
  }

  const handleNext = async () => {
      setGenreSelected(true)
      setMoviesGenreSelected(true)
  }
  const handleBooksNext = async () => {
    setModalVisible(false)
    localStorage.setItem('moviesids',JSON.stringify(genresID))
    localStorage.setItem('booksids',JSON.stringify(booksGenres))
  }
  const handleSkip = () => {
      setGenreSelected(true)
  }
  return (
    <>
      {features?.userCreated && !features?.preferenceSelected && modalVisible && 
        <Modal 
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          {!optionsSelected && <div className={homeStyles.modalContent}>
            <h2>Hey Folks, Welcome to MoviBook</h2>
            <div className={homeStyles.optionContainer}>
              <div className={homeStyles.movies} onClick={() => {setOptionsSelected(true);setSelectedOption("movies");fetchGenres()}}>
                <img src="https://img.icons8.com/fluency/100/000000/movies-tv.png"/>
                <h3>Movies</h3>
              </div>
            </div>
          </div>}
          {!moviesGenreSelected && !genreSelected && 
            <div className={homeStyles.modalContent}>
                <h2 className={homeStyles.selectText}>Select Movie genre so that we can recommend you some !!</h2>
                <div className={homeStyles.genreList}>
                  {genres && genres?.map((value,key) => {
                        return(
                          <div className={homeStyles.genre} style={value?.id in genresID ? {backgroundColor:'skyblue'}:{backgroundColor:'white'}} onClick={() => {
                            if(!(value?.id in genresID)){
                              setGenresID({...genresID,[value.id]:value.name})
                            }
                            else{
                                const list = genresID
                                delete list[value?.id]
                                setGenresID(list)
                            }
                          }} key={key}>{value.name}</div>
                        )
                      })}
                </div>
                <div className={homeStyles.buttons}>
                  {/* <button onClick={handleSkip}>skip</button> */}
                  <button onClick={handleNext}>Next</button>
                </div>
            </div>
          }
          {moviesGenreSelected && !bookClicked &&
            <div className={homeStyles.modalContent}>
            <h2>Hey Folks, Welcome to MoviBook</h2>
            <div className={homeStyles.optionContainer}>
              <div className={homeStyles.books} onClick={() => {setSelectedOption("books");setBookClicked(true)}}>
                <img src="https://img.icons8.com/cute-clipart/100/000000/ibooks.png"/>
                <h3>Books</h3>
              </div>
            </div>
          </div>
          }
          {!booksGenreSelected && selectedOption == "books" &&
            <div className={homeStyles.modalContent}>
                <h2 className={homeStyles.selectText}>Select Books genre so that we can recommend you some !!</h2>
                <div className={homeStyles.genreList}>
                  {BooksGenres?.map((value,key) => {
                        return(
                          <div className={homeStyles.genre} style={value in booksGenres ? {backgroundColor:'skyblue'}:{backgroundColor:'white'}} onClick={() => {
                            if(!(value in booksGenres)){
                              setBooksGenres({...booksGenres,[value]:value})
                            }
                            else{
                                const list = booksGenres
                                delete list[value]
                                setBooksGenres(list)
                            }
                          }} key={key}>{value}</div>
                        )
                      })}
                </div>
                <div className={homeStyles.buttons}>
                  {/* <button onClick={handleSkip}>skip</button> */}
                  <button onClick={handleBooksNext}>Next</button>
                </div>
            </div>
          }
        </Modal>}
      <Header/>
      <Landing/>
      <Recommend/>
      <RecentSearch/>
      <RecentBookSearch/>
      <Footer/>
    </>
  );
}

export default Home;
