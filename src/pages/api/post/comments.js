import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { pageValidator } from "@/utils/validators"
import config from "@/web/config"


const handle = mw({
  GET: [
   validate ({
      query: {
         page: pageValidator.optional(),
      }
    }),

    async ({
      res,
      models: { CommentModel },
      input: {
        query: { page },
      },
    }) => {
      try {
        const comments = await CommentModel.query()
          .offset((page - 1) * config.ui.itemsPerPage)
          .limit(config.ui.itemsPerPage)

        res.send({
          comments: comments.map(comment => ({
            id: comment.id,
            content: comment.content,
            userId: comment.userId,
            postId: comment.postId,
           
          }))
        })
      } catch (error) {
        res.status(500).send({ error: "Internal Server Error" })
      }
    }
  ]
})

export default handle
