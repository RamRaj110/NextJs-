"use client"

import AuthForm from '@/components/forms/AuthForm'
import { SignUpSchema } from '@/lib/validation'
import React from 'react'

const Home = () => {
  return (
    <div>
      <AuthForm 
        formType="SIGNUP"
          schema = {SignUpSchema}
          defaultValues = {{
            name: '',
            username: '',
            email: '',
            password: '',
            
          }}
          onSubmit ={(data)=> Promise.resolve({success: true,data})}
      />


    </div>
  )
}

export default Home