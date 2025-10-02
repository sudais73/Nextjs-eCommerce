import React from 'react'
import Hero from '../components/Hero'
import LatestProducts from '../components/LatestProducts'
import Service from '../components/Service'
import Subscription from '../components/Subscription'

const page = () => {
  return (
    <div>
      <Hero/>
      <LatestProducts/>
      <Service/>
      <Subscription/>
    </div>
  )
}

export default page
