"use client"

import AuthForm from '@/components/forms/AuthForm'
import { SignInSchema } from '@/lib/validation'


const Home = () => {
  return (
  <div>
    <AuthForm 
    formType="SIGNIN"
    schema = {SignInSchema}
    defaultValues = {{
      email: '',
      password: ''
    }}
    onSubmit ={(data)=> Promise.resolve({success: true,data})}
    
    />

  </div>
  )
}

export default Home