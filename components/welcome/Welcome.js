//front-end
import { ChatAltIcon } from '@heroicons/react/outline'
//back-end
function Welcome () {
  return (
    <div
      className='
        hidden
        lg:grid
        place-items-center 
        h-screen 
        flex-grow
        bg-gray-800'
    >
      <div
        className='
        border
        border-blue-400
        rounded-full
        px-[120px]
        py-[140px]
        grid
        place-items-center
        '
      >
        <ChatAltIcon
          className='
        h-[132px] 
        text-blue-200'
        />
        <h2
          className='
        text-blue-400 
        text-xl 
        font-bold'
        >
          No conversation selected
        </h2>
      </div>
    </div>
  )
}

export default Welcome
