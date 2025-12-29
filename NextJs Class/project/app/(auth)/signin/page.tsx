"use client"

import AuthForm from '@/components/forms/AuthForm'
import { signInWithCredentials } from '@/lib/actions/auth.action'


const Home = () => {
  return (
  <div>
    <AuthForm 
    formType="SIGNIN"
    defaultValues = {{
      email: '',
      password: ''
    }}
    onSubmit ={signInWithCredentials}
    
    />

  </div>
  )
}

export default Home