import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"

const ShowPost = () => {
  const router = useRouter()
  const { id } = router.query
  const fetchPost = async () => {
    const response = await fetch(`/api/post/${id}`)
    
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json() 
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),  
})

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
   </div>
  )
}

export default ShowPost