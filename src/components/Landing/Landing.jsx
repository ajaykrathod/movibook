import React from 'react'
import landingStyles from 'styles/components/Landing/Landing.module.css'

function Landing() {
  return (
      <>
        <div className={landingStyles.landing}/>
        <div className={landingStyles.text}>
            <div className={landingStyles.subtitle}>
                End your search of books and movies here with us
            </div>
        </div>
    </>
  )
}

export default Landing