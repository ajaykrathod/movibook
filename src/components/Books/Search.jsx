import React, { useState } from 'react'
import searchStyles from 'components/Books/Search.module.css'
import Modal from './Modal'
import axios from 'axios'

function Search(props) {
    const [search,setSearch] = useState()
    const [response,setResponse] = useState([])
    const [modalVisible,setModalVisible] = useState(false)
    const [selfLink, setSelfLink] = useState()
    
    const getMovies = (e) => {
        setSearch(e.target.value)
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.REACT_APP_GOOGLE_BOOKS}`)
            .then(result => {setResponse(result?.data.items)})
            .catch(error => console.log('error', error));
    }

  return (
    <div className={searchStyles.searchContainer}>
        <input type="search" name="" id="" placeholder='Search Book Name' value={search} onChange={getMovies} />
        {/* <button onClick={getMovies}>Search</button> */}
        <div className={searchStyles.posterContainer}>
            {response?.map((value,index) => {
                return(
                    value?.volumeInfo && <div key={index} className={searchStyles.poster} onClick={() => {setModalVisible(true);setSelfLink(value?.selfLink)}}>
                        <img className={searchStyles.posterImage} src={value?.volumeInfo?.imageLinks?.thumbnail} width="200" height={"300"}/>
                    </div>
                )
            })}
        </div>
        {modalVisible && selfLink && <Modal modalVisible={modalVisible} selfLink={selfLink} setModalVisible={setModalVisible}/>}
    </div>
  )
}

export default Search