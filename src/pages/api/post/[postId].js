import mw from "@/api/mw"
import { validate } from "@/api/middlewares/validate"
import { postIdValidator } from "@/utils/validators"

const handle = mw({ 

  GET: [
    validate({
      query: {
        postId: postIdValidator,
      
      },
    }),
    async ({
      res,
      models: { PostModel },
      input: {
        query: { postId },
      },
    }) => {
      const post = await PostModel
        .query()
        .findById(postId)
      
      if (!post) {
        res.status(404).send("Post not found")
      
        return
      }
      
      res.send(post)
    }
  ]
})

export default handle