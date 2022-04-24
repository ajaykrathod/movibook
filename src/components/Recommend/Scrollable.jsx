import React from 'react'
import scrollableSTyles from './Scrollable.module.css'
function Scrollable({children}) {
  return (
    <div className={scrollableSTyles.scrollX}>
        {children}
    </div>
  )
}

export default Scrollable