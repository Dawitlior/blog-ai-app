import React from 'react'
import SocialLinks from './SocialLinks'
import Subscribe from './Subscribe'
import Image from 'next/image'
import Ad2 from "/public/assets/ad-2.png";

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <section className=''>
      <h4 className='bg-wh-500 py-3 px-5 text-wh-50 text-xs text-center font-bold'>
        Subscribe and Follow
      </h4>
      <div className='my-5 mx-5'>
      <SocialLinks isDark />
      </div>
      <Subscribe />
      <Image
        className="hidden md:block my-8 w-full"
        alt="advert-2"
        placeholder="blur"
        src={Ad2}
        width={500}
        height={1000}
      />
      <h4 className='bg-wh-900 py-3 px-5 text-wh-50 text-xs text-center font-bold'>
        About the Blog!!!
      </h4>
      <h4 className='py-3 px-5 text-wh-500 text-center font-bold'>
       From Lior Dawit
      </h4>
    </section>

  )
}

export default Sidebar