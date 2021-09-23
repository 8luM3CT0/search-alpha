//front-end
import {
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  PhotographIcon,
  CashIcon,
  EmojiHappyIcon
} from '@heroicons/react/outline'
//back-end
import { useRouter } from 'next/router'

function Feed ({ chat, messages }) {
  const router = useRouter()
  return (
    <div>
      <header
        className='
            top-0
            bg-gray-800
            sticky
            z-50
            flex
            items-center
            justify-evenly
            px-5
            border-b
            border-blue-300
            py-3
            '
      >
        <ChevronLeftIcon
          onClick={() => router.push('/chat')}
          className='
          text-blue-300 
          h-12 
          lg:hidden 
          cursor-pointer'
        />
        <img
          loading='lazy'
          src='https://lh3.googleusercontent.com/a-/AOh14Gi1blmPwzfXe5_awfr9UCLH7Pac0YCDkkP9Kvsb=s96-c'
          alt=''
          className='
          h-12 
          lg:h-[50px] 
          rounded-full 
          object-contain 
          hover:opacity-90'
        />
        <h1
          className='
        text-2xl 
        font-bold 
        text-blue-200 
        hover:underline
        hover:animate-pulse
        '
        >
          Reaper IFF
        </h1>
        <h2
          className='
        text-xl 
        font-semibold 
        text-blue-400'
        >
          @reaperiff697@gmail.com
        </h2>
      </header>
      <div className='h-[90vh] p-[20px]'>
        <div></div>
      </div>
      <footer
        className='
            bg-gray-800
            bottom-0 
            sticky
            z-50
            border-t
            border-blue-300
            flex
            items-center
            px-4
            space-x-4
            py-3
            '
      >
        <EmojiHappyIcon className='chatIcon' />
        <div
          className='
          space-x-2
          px-4
          flex-grow 
          flex 
          items-center 
          rounded-full 
          h-[50px] 
          lg:h-[54px] 
          bg-gray-600'
        >
          <input
            type='text'
            placeholder='Chat here...'
            className='
                outline-none 
                border-0 
                bg-transparent 
                flex-grow
                text-gray-300
                '
          />
          <ChevronDoubleRightIcon className='chatIcon' />
        </div>
        <PhotographIcon className='chatIcon' />
        <CashIcon className='chatIcon' />
      </footer>
    </div>
  )
}

export default Feed
