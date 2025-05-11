import React from 'react'
import Introduction from './Introduction'
import OurStory from './OurStory'
import OurTeam from './OurTeam'
import HowYouCanHelp from './HowYouCanHelp'
import FAQ from './FAQ'
import Footer from '../../components/Footer'

const page = () => {
  return (
    <div>
      <Introduction />
      <OurStory />
      <OurTeam />
      <HowYouCanHelp />
      <FAQ />
      <Footer />
    </div>
  )
}

export default page
