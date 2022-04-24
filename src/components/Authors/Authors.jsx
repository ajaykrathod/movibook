import axios from 'axios'
import Modal from 'components/Books/Modal'
import Scrollable from 'components/Recommend/Scrollable'
import { useFeatureContext } from 'Context/NavigationContext'
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import app from 'Utilities/firebase'
import authorStyles from './Authors.module.css'

function Authors() {
    const [search,setSearch] = useState()
    const [authors, setAuthors] = useState([])
    const [id, setID] = useState()
    const [selfLink, setSelfLink] = useState()
    const [modalVisible, setModalVisible] = useState()
    const [Features,dispatch] = useFeatureContext()
    const db = getFirestore(app)

    const getRecent = () => {
        const q = query(collection(db,"Search"),where("uid","==",Features?.user?.uid))
        const unsubscribe = onSnapshot(q, snapshot => {
            setAuthors([]);
            snapshot.forEach(doc => {
                doc.data()?.authors?.map((value,index) => {
                    fetchAuthorDetails(value)
                })
            })
        })
    }

    const fetchAuthorDetails = async(id) => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${id}&key=${process.env.REACT_APP_GOOGLE_BOOKS}`)
    .then(async result => {
        for (let i = 0; i < result.data.items.length; i++) {
            const element = result.data.items[i];
            setAuthors(prev => [...prev, element])
            
        }
        // const docs = await getDocs(query(collection(db,"Search")),where("uid","==",Features?.user?.uid))
        // if(docs.docs.length <= 1) {
        //     docs.docs.forEach(snapshot => {    
        //     updateDoc(doc(db,"Search",snapshot.id),{
        //             books: arrayUnion(id)
        //     })
        //     }) 
        // }
        // dispatch({
        //     type:'selfLink',
        // selfLink:selfLink
        // })
        })
    .catch(error => console.log('error', error));
    };

    useEffect(() => {
        (Features?.user?.uid) &&
        getRecent()
    },[Features?.user?.uid])

  return (
    <div>
        <h2 className={authorStyles.title}>Books By Your Searched Authors</h2>
        <Scrollable>
            {authors && authors?.map((book,index) => {
                    // console.log(book)
                    return(
                        book?.volumeInfo && <div key={index} className={authorStyles.poster} onClick={() => {setModalVisible(true);setSelfLink(book?.selfLink)}}>
                            <img className={authorStyles.posterImage} src={book?.volumeInfo?.imageLinks?.thumbnail} width="200" height={"300"}/>
                        </div>
                    )
                })
                }
        </Scrollable>
        {modalVisible && selfLink && <Modal modalVisible={modalVisible} selfLink={selfLink} setModalVisible={setModalVisible}/>}
    </div>
  )
}

export default Authors