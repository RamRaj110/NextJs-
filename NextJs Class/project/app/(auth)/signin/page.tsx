"use client"

import AuthForm from '@/components/forms/AuthForm'


const Home = () => {
  return (
  <div>
    <AuthForm 
    formType="SIGNIN"
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