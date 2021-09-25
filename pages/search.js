//front-end
import Head from 'next/head'
import Footer from '../components/footer/Footer'
import SearchHeader from '../components/header/SearchHeader'
import { API_KEY, CONTEXT_KEY } from '../keys'
import Response from '../Response'
//back-end
import { useRouter } from 'next/router'
import SearchResults from '../components/results/SearchResults'

function Search ({ results }) {
  const router = useRouter()

  console.log(results)

  return (
    <div className='bg-gray-800 flex-grow scrollbar-hide'>
      <Head>
        <title>{router.query.term} - AlphaSearch</title>
      </Head>
      <SearchHeader />
      <div
        className='
      min-h-[90vh] 
      lg:min-h-[100vh] 
      scrollbar-hide'
      >
        <SearchResults results={results} />
      </div>
      <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps (context) {
  const useDummyData = false
  const startIndex = context.query.start || '0'

  const data = useDummyData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
      ).then(response => response.json())

  //Pass results to client
  return {
    props: {
      results: data
    }
  }
}
