import React from 'react'

const Trending = () => {
  return (
    <section className="">
        <h2 className="">Trending</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {
            ["apple i phone", "Mackbook", "i Watch"].map((product,i)=>(
              <div key={i}>{product}</div>
            ))
          }
        </div>
    </section>
  )
}

export default Trending