import React from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Loader from "@/web/components/ui/Loader"


const fetchPost = async ({ queryKey }) => { 
  const [, postId] = queryKey
  const response = await fetch(`/api/post/${postId}`)
  const data = await response.json()

  return data
}
const SinglePost = () => {
  const { query } = useRouter()
  const {postId} = query
  const { data, isLoading } = useQuery([ "post", postId ], fetchPost)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1>{data.title}</h1>
          <p>{data.content}</p>
        </div>
      )}
    </>
  )
}



export default SinglePost




