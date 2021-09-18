//front-end
import Head from 'next/head'
import Footer from '../components/footer/Footer'
import SearchHeader from '../components/header/SearchHeader'
//back-end

function Search () {
  return (
    <div className='bg-gray-800 overflow-hidden h-screen'>
      <Head>
        <title>Search-results</title>
      </Head>
      <SearchHeader />
      <div
        className='
      min-h-[90vh] 
      lg:min-h-[100vh] 
      scrollbar-hide'
      ></div>
      <Footer />
    </div>
  )
}

export default Search
