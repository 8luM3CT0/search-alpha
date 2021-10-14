//front-end
import {
  InboxIcon,
  LinkIcon,
  DesktopComputerIcon,
  UserIcon
} from '@heroicons/react/outline'
//back-end

function Footer () {
  return (
    <div className='footerDiv'>
      <div className='footerLinks'>
        <h1 className='link'>How it was made</h1>
        <DesktopComputerIcon className='footerIcons' />
        <h1 className='link'>8luM3CT0</h1>
        <UserIcon className='footerIcons rounded-full border border-gray-50' />
      </div>
      <div className='footerLinks'>
        <h1 className='link'>Contact</h1>
        <InboxIcon className='footerIcons' />
        <h1 className='link'>Github</h1>
        <img
          src='https://e7.pngegg.com/pngimages/914/758/png-clipart-computer-icons-logo-github-github-logo-logo-computer-program-thumbnail.png'
          alt=''
          className='h-9 cursor-pointer rounded-3xl hover:opacity-80 md:hidden'
        />
        <h1 className='link'>LinkedIn</h1>
        <LinkIcon className='footerIcons' />
      </div>
    </div>
  )
}

export default Footer
