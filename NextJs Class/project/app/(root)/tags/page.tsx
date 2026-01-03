import { getTags } from '@/lib/actions/tag.action';
import React from 'react'

const Tags = async () => {
  const {success, data, error} = await getTags({page:1,pageSize:10});
  const {tags,isNext} = data!;
  console.log("Tags", {success, tags, isNext, error,query:"ts"});
  return (
    <div>Tags</div>
  )
}

export default Tags