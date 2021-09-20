//front-end
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'
//back-end
import { useRouter } from 'next/router'

function PaginationBtns () {
  const router = useRouter()
  const startIndex = Number(router.query.start) || 0
  return (
    <div className='flex items-center space-x-20'>
      {startIndex >= 10 && (
        <Link
          href={`/search?term=${router.query.term}&start=${startIndex - 10}`}
        >
          <div className=' flex flex-grow flex-col hover:underline items-center cursor-pointer'>
            <ChevronLeftIcon className='h-6  text-blue-100' />
            <p className='hidden lg:inline-flex text-blue-100'>Previous</p>
          </div>
        </Link>
      )}
      <Link href={`/search?term=${router.query.term}&start=${startIndex + 10}`}>
        <div className=' flex flex-grow flex-col hover:underline items-center cursor-pointer'>
          <ChevronRightIcon className='h-6 text-blue-100' />
          <p className='hidden lg:inline-flex text-blue-100'>Next</p>
        </div>
      </Link>
    </div>
  )
}

export default PaginationBtns
