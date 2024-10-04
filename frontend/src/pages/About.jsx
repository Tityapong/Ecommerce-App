import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className=' text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />

      </div>

      <div className=' my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className=' w-full md:max-w-[450px]' alt="" />

        <div className=' flex flex-col justify-center  gap-6 md:w-2/4 text-gray-600'>
          <p>Forever  was born out of a passion for innovation and a desire to revolute the way people shop online . Our journey began with a simple idea: to provide a platform for people to shop online.</p>
          <p>
            since then, Forever has grown into one of the most popular online shopping platforms in the world.
          </p>
          <b className=' text-gray-800'>Our Mission</b>
          <p>
          our mission is to empower every people to express her unique style and confidence through beautifully crafted dresses. We are dedicated to offering a curated collection of high-quality, fashion-forward pieces that cater to diverse tastes and occasions.
          </p>

        </div>

      </div>
      <div className=' text-xl py-4 '>

        <Title text1={"WHY"} text2={"CHOOSE US"} />

      </div>

      <div className=' flex flex-col md:flex-row text-sm mb-20'>
        <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className=' text-gray-600'>
          We believe that every dress should not only look stunning but also feel comfortable and last long. That’s why we meticulously source the finest fabrics and materials, ensuring each piece meets our stringent standards
          </p>

        </div>

        <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className=' text-gray-600'>
          we understand that your time is valuable, and shopping for the perfect dress should be a hassle-free experience. That’s why we’ve designed our website to offer a seamless and enjoyable shopping journey from start to finish.  
          </p>

        </div>

        <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className=' text-gray-600'>
          our customers are at the heart of everything we do. We are committed to providing exceptional customer service that goes above and beyond your expectations.
          </p>
       

        </div>

      </div>
      <NewsletterBox />
    </div>
  )
}

export default About