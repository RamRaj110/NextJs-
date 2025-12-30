import { RouteParams } from '@/Types/global'
import React from 'react'

const QuestionDetails =async ({params}:RouteParams) => {
    const {id}= await params;
    console.log(id)
  return (
    <div>
        <h1>Qusetion Details {id}</h1>
      
    </div>
  )
}

export default QuestionDetails
