//front-end
//back-end
import PaginationBtns from './PaginationBtns'

function SearchResults ({ results }) {
  return (
    <div className='py-2 mx-auto w-full px-3 sm:pl-[5%] md:pl-[14%]  lg:pl-52'>
      <p className='text-blue-100 font-semibold text-[12px] md:text-lg mb-6'>
        About {results.searchInformation?.formattedTotalResults} results in (
        {results.searchInformation?.formattedSearchTime} seconds )
      </p>
      {results.items?.map(result => (
        <div key={result.link} className='max-w-xl mb-8'>
          <div className='group'>
            <a
              href={result.link}
              className='text-sm text-blue-300 line-clamp-3 lg:line-clamp-2'
            >
              {result.formattedUrl}
            </a>
            <a href={result.link}>
              <h2 className='text-xl text-blue-200 truncate font-semibold group-hover:underline'>
                {result.title}
              </h2>
            </a>
          </div>
          <p className='text-sm text-blue-100 font-medium line-clamp-2'>
            {result.snippet}
          </p>
        </div>
      ))}

      <PaginationBtns />
    </div>
  )
}

export default SearchResults
