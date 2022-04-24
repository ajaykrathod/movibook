import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import React from 'react'
import aboutStyles from './About.module.css'
function About() {
  return (
    <>
    <Header/>
    <div className={aboutStyles.container}>
      <h1 >
        <span style={{fontSize:" x-large"}}>
          <u>A</u><u>bout Us !</u>
        </span>
        </h1>
          <h3 >
            <span style={{fontWeight: "normal"}}>
              <span style={{fontSize: "large"}}>
                Hello Friends Welcome To MoviBook
              </span>
            </span>
          </h3>
        <p >
          <p style={{fontSize: "18px"}}>
            MoviBook is a Professional Entertainment Platform. Here we will provide you only interesting content, which you will like very much.
            <br></br>
            </p>
            </p>
            <p >
              <p style={{fontSize: "18px"}}>
                We're dedicated to providing you the best of Entertainment, with a focus on dependability and Movies and Books. 
                <br />
              </p>
              <p style={{fontSize: "18px"}}>
                We're working to turn our passion for Entertainment into a booming online website. We hope you enjoy our Entertainment as much as we enjoy offering them to you.
              </p>
              </p>
              <div >
                </div>
                <div >
                  <h3>
                    I will keep posting more important posts on my Website for all of you. Please give your support and love.
                  </h3>
                </div>
                <div >
                  <h3>
                    Thanks For Visiting Our Site
                  </h3>
                </div>
                <div >
                  <a href="/contact" target="_blank">
                    <span style={{fontSize: "medium"}}>
                      <h4>
                        Contact Us !
                      </h4>
                    </span>
                  </a>
                </div>
              </div>	
            <Footer/>
        </>
  )
}

export default About