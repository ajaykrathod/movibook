import Header from 'components/Header/Header'
import { useFeatureContext } from 'Context/NavigationContext'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react'
import app from 'Utilities/firebase';

function Layout({children}) {
    const [context,dispatch] = useFeatureContext();
    const db = getFirestore(app)
    useEffect(() => {
        const getDocuments = async() => {
            if(localStorage.getItem("UID")){
                const q = query(collection(db, "Users"),where("uid","==",localStorage.getItem("UID")))
                const docs = await getDocs(q)
                docs.forEach(snapshot => {
                    if(context?.user === null){
                        dispatch({
                            type:'user',
                            user:{
                                uid: snapshot.data()?.uid,
                                FirstName: snapshot.data()?.FirstName,
                                LastName:snapshot.data()?.LastName,
                                birthDate: snapshot.data()?.birthDate,
                                email: snapshot.data()?.email,
                                phone: snapshot.data()?.phone
                            }
                        })
                        dispatch({
                            type: "userCreated",
                            userCreated: true
                        })
                    }
                })
                
    
            }
            if(localStorage.getItem("moviesids") && localStorage.getItem("booksids")){
                dispatch({
                    type: 'preference',
                    preferenceSelected: true
                })
            }
            else{
                dispatch({
                    type: 'preference',
                    preferenceSelected: false
                })
            }
        }
        getDocuments();
    },[])
  return (
        <>
            <div>{children}</div>
        </>
  )
}

export default Layout