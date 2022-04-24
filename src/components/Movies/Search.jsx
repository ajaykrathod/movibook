import React, { useState } from 'react'
import searchStyles from 'components/Movies/Search.module.css'
import Modal from './Modal'

function Search(props) {
    const [search,setSearch] = useState()
    const [response,setResponse] = useState()
    const [modalVisible,setModalVisible] = useState(false)
    const [id, setId] = useState()
    const getMovies = (e) => {
       setResponse([])
        setSearch(e.target.value)
        var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_BEARER}`);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch(`https://api.themoviedb.org/3/search/multi?language=en-US&page=1&include_adult=false&query=${search}`, requestOptions)
            .then(response => response.json())
            .then(result => {setResponse(result.results)})
            .catch(error => console.log('error', error));
    }
  return (
    <div className={searchStyles.searchContainer}>
        <input type="search" name="" id="" placeholder='Search Movie Name' value={search} onChange={getMovies} />
        {/* <button onClick={getMovies}>Search</button> */}
        <div className={searchStyles.posterContainer}>
            {response?.map((value,index) => {
                return(
                    value?.poster_path && <div key={index} className={searchStyles.poster} onClick={() => {setModalVisible(true);setId(value.id)}}>
                        <img className={searchStyles.posterImage} src={`https://image.tmdb.org/t/p/original${value.poster_path}`} width="200" height={"300"}/>
                    </div>
                )
            })}
        </div>
        {modalVisible && id && <Modal modalVisible={modalVisible} id={id} setModalVisible={setModalVisible}/>}
    </div>
  )
}

export default Search