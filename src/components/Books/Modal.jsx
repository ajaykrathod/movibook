import React, { useEffect, useState } from 'react'
import modalStyles from './Modal.module.css'
import { useFeatureContext } from 'Context/NavigationContext';
import { addDoc, arrayUnion, collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import app from 'Utilities/firebase';
import axios from 'axios';

function Modal({selfLink,modalVisible,setModalVisible}) {
  
  const [book, setBook] = useState()
  const [author, setAuthor] = useState()
  const [Features,dispatch] = useFeatureContext()
  const db = getFirestore(app)

  const fetchMovieDetails = () => {
    axios.get(selfLink)
      .then(async result => {
        result.data?.volumeInfo?.authors && result.data?.volumeInfo?.authors.length >= 1 && setAuthor(result.data?.volumeInfo?.authors[0])
        setBook(result.data)
          const docs = await getDocs(query(collection(db,"Search")),where("uid","==",Features?.user?.uid))
          if(docs.docs.length <= 1) {
            docs.docs.forEach(snapshot => {    
              updateDoc(doc(db,"Search",snapshot.id),{
                    books: arrayUnion(selfLink),
                    authors :result.data?.volumeInfo?.authors.length >= 1 && arrayUnion(result.data?.volumeInfo?.authors[0])
              })
            }) 
          }
          dispatch({
            type:'selfLink',
           selfLink:selfLink
          })
          dispatch({
            type:'author',
           author:result.data?.volumeInfo?.authors.length >= 1 && result.data?.volumeInfo?.authors[0]
          })
        })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    selfLink && fetchMovieDetails();
  },[selfLink]);

  return (
    <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modal}>
                <div className={modalStyles.close}>
                <img 
                    src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png" 
                    onClick={() => setModalVisible(!modalVisible)}
                />
                </div>
                {book && <div className={modalStyles.posterContainer}>
                  <img className={modalStyles.posterImage} src={book?.volumeInfo?.imageLinks?.thumbnail}/>
                  <div className={modalStyles.infobook}>
                      <h2>{book?.volumeInfo?.title}</h2>
                      <h3>{book?.volumeInfo?.subtitle}</h3>
                      {/* <strong>Released On</strong> */}
                      <h3>{book?.volumeInfo?.publishedDate}</h3>
                      <strong>Overview</strong>
                      <h4>{book?.volumeInfo?.description}</h4>
                      {/* <strong>Status</strong>
                      <h3>{book?.status}</h3> */}
                      <div>
                        <strong>Rating</strong>
                        <h3>{book?.volumeInfo?.averageRating}({book?.volumeInfo?.ratingsCount})</h3>
                      </div>
                  </div>
                </div>}
        </div>
    </div>
  )
}

export default Modal