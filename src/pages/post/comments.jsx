
import { useRouter } from "next/router"
const PostComments = () => {
  const router = useRouter()
  const { postId } = router.query


  console.log(postId)

  return (
    <div>
      <h1>Comments for Post {postId}</h1>
    </div>
  )
}

export default PostComments
