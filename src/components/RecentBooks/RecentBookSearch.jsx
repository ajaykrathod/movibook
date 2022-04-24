import axios from 'axios'
import Modal from 'components/Books/Modal'
import Scrollable from 'components/Recommend/Scrollable'
import { useFeatureContext } from 'Context/NavigationContext'
import { arrayRemove, arrayUnion, collection, doc, getDocs, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import app from 'Utilities/firebase'
import recentBookSearchStyles from './RecentBookSearch.module.css'

function RecentBookSearch() {
    const [search,setSearch] = useState()
    const [books, setBooks] = useState([])
    const [id, setID] = useState()
    const [selfLink, setSelfLink] = useState()
    const [modalVisible, setModalVisible] = useState()
    const [Features,dispatch] = useFeatureContext()
    const db = getFirestore(app)

    const getRecent = () => {
            const q = query(collection(db,"Search"),where("uid","==",Features?.user?.uid))
            const unsubscribe = onSnapshot(q, snapshot => {
                setBooks([]);
                snapshot.forEach(doc => {
                    doc.data()?.books?.map((value,index) => {
                        fetchBookDetails(value)
                    })
                })
            })
    }

    const fetchBookDetails = async(id) => {
        axios.get(id)
      .then(async result => {
        // setBooks(result.data)
        setBooks(prev => [...prev, result.data])
          const docs = await getDocs(query(collection(db,"Search")),where("uid","==",Features?.user?.uid))
          if(docs.docs.length <= 1) {
            docs.docs.forEach(snapshot => {    
              updateDoc(doc(db,"Search",snapshot.id),{
                    books: arrayUnion(id)
              })
            }) 
          }
          dispatch({
            type:'selfLink',
           selfLink:selfLink
          })
        })
      .catch(error => console.log('error', error));
      };

    useEffect(() => {
        (Features?.user?.uid) &&
        getRecent()
    },[Features?.user?.uid,Features?.selfLink])

  return (
    <div>
        <h2 className={recentBookSearchStyles.title}>Recent Search</h2>
        <Scrollable>
            {books && books?.map((book,index) => {
                    // console.log(book)
                    return(
                        book?.volumeInfo && <div key={index} className={recentBookSearchStyles.poster} onClick={() => {setModalVisible(true);setSelfLink(book?.selfLink)}}>
                            <img className={recentBookSearchStyles.posterImage} src={book?.volumeInfo?.imageLinks?.thumbnail} width="200" height={"300"}/>
                        </div>
                    )
                })
                }
        </Scrollable>
        {modalVisible && selfLink && <Modal modalVisible={modalVisible} selfLink={selfLink} setModalVisible={setModalVisible}/>}
    </div>
  )
}

export default RecentBookSearch