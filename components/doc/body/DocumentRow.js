//front-end
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
//back-end
import { useRouter } from 'next/router'

function DocumentRow ({ id, filename, timestamp }) {
  const router = useRouter()

  const goToDoc = () => {
    router.push(`/document/${id}`)
  }

  return (
    <div
      onClick={goToDoc}
      className='
    flex 
    items-center 
    p-4 
    rounded-lg 
    text-gray-200 
    cursor-pointer 
    text-sm 
    hover:bg-gray-800'
    >
      <Icon name='article' size='3xl' color='blue' />
      <p
        className='
      flex-grow 
      pl-5 
      w-10 
      pr-10 
      truncate'
      >
        {filename}
      </p>
      <p className='pr-5 text-sm'>{timestamp?.toDate().toLocaleDateString()}</p>
      <Button
        color='blue'
        buttonType='outline'
        rounded={true}
        iconOnly={true}
        ripple='light'
        className='border-0'
      >
        <Icon name='more_vert' size='3xl' />
      </Button>
    </div>
  )
}

export default DocumentRow
