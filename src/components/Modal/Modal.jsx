import React from 'react'
import modalStyles from 'components/Modal/Modal.module.css'

function Modal({children,modalVisible,setModalVisible}) {
  return (
    <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modal}>
                <div className={modalStyles.close}>
                <img 
                    src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png" 
                    onClick={() => setModalVisible(!modalVisible)}
                />
                </div>
                {children}
        </div>
    </div>
  )
}

export default Modal