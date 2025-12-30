import { auth } from '@/auth';
import QuestionForm from '@/components/forms/QuestionForm'
import { redirect } from 'next/navigation';
import React from 'react'

const AskQuestion = async() => {
  const session = await auth();
  if(!session) return redirect('/signin')
  return (
    <>
   <h1> Ask a Question</h1>
   <div>
    <QuestionForm />
   </div>
    </>
    
  )
}

export default AskQuestion
