import getTours from '@/app/actions/getTours'
import React from 'react'

function page() {

  const tours = getTours({})

  console.log(tours)
  return (
    <div>page </div>
  )
}

export default page