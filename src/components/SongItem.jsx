import React from 'react'

const SongItem = ({name, image, desc,id}) => {
  return (
    <div className='min-w-[180px]p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded' src={image} alt="" />
        <p className='font-bold mt-2  md-1'>{name}</p>
        <p className='text-slate-200text-sm'>{desc}</p>
    </div>
  )
}

export default SongItem