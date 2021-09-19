//front-end
//back-end

function SearchIcons ({ Icon, title }) {
  return (
    <div
      className='
        flex 
        items-center 
        space-x-2
        text-blue-200
        active:text-blue-300
        cursor-pointer
        '
    >
      <Icon
        className='
            h-6
            cursor-pointer
            hover:opacity-80
            '
      />
      <h2
        className='
            hidden 
            md:inline-flex 
            md:text-lg 
            xl:text-xl
            '
      >
        {title}
      </h2>
    </div>
  )
}

export default SearchIcons
