//front-end
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
//back-end

function DocumentRow ({ id, filename, timestamp }) {
  return (
    <div
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
      <p className='pr-5 text-sm'>{timestamp}</p>
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
