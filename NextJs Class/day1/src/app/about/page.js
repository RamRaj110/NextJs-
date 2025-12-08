import React from 'react'
import Image from 'next/image'

function About() {
  return (<>
    <div className='font-bold text-2xl underline'>this is page about page</div>
    <Image src={"https://images.unsplash.com/photo-1761839257664-ecba169506c1?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
    alt="about image" width={500} height={500}/>
       </>
  )
}

export default About