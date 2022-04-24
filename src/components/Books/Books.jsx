import Authors from 'components/Authors/Authors'
import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'
import RecentBookSearch from 'components/RecentBooks/RecentBookSearch'
import React from 'react'
import Search from './Search'

function Books() {
  return (
    <div>
      <Header/>
      <Search/>
      <RecentBookSearch/>
      <Authors/>
      <Footer/>
    </div>
  )
}

export default Books
