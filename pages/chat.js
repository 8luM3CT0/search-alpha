//front-end
import Sidebar from '../components/sidebar/Sidebar'
import Welcome from '../components/welcome/Welcome'
//back-end
function chat () {
  return (
    <div className='h-screen bg-gray-800 overflow-hidden flex'>
      {/**Sidebar */}
      <Sidebar />
      {/**Welcome */}
      <Welcome />
    </div>
  )
}

export default chat
