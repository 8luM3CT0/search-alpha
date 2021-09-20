import { SearchIcon } from '@heroicons/react/outline'
import { MicrophoneIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import { useRef } from 'react'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import { useRouter } from 'next/router'

export default function Home () {
  const searchRef = useRef(null)
  const router = useRouter()
  const search = e => {
    e.preventDefault()

    const term = searchRef.current.value

    if (!term) return

    router.push(`/search?term=${term}`)
  }

  return (
    <div className='bg-gray-800 h-screen overflow-hidden scrollbar-hide'>
      <Head>
        <title>Nextjs-Search-Engine</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap'
          rel='stylesheet'
        />
      </Head>

      <Header />
      <form
        className='
      h-[100vh] 
      flex 
      flex-col 
      items-center 
      text-center 
      mt-44 
      flex-grow'
      >
        <h1
          className=' 
        text-blue-200 
        font-bold 
        text-5xl 
        font-google-sans 
        cursor-pointer'
        >
          SearchAlpha
        </h1>
        <div
          className='
          border 
          border-gray-200 
          py-3 
          px-5 
          w-full
          max-w-sm
          lg:max-w-xl 
          xl:max-w-2xl
        flex 
        items-center 
        mt-5 
        hover:shadow-lg 
        focus-within:shadow-lg  
        bg-gray-300 rounded-full'
        >
          <SearchIcon
            className='
          h-6
          mr-3
          text-gray-900
          '
          />
          <input
            ref={searchRef}
            type='text'
            className='focus:outline-none border-0 bg-transparent flex-grow text-gray-700'
          />
          <MicrophoneIcon className='h-6 ml-3 mr-2 cursor-pointer active:text-blue-300' />
        </div>
        <div className='flex mt-10 space-x-4'>
          <button onClick={search} className='homeBtn'>
            Search Stuff
          </button>
          <button className='homeBtn'>I'm Feeling Lucky</button>
        </div>
      </form>
      <Footer />
    </div>
  )
}
