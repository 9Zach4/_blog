import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { contentValidator, titleValidator, pageValidator } from "@/utils/validators"
import config from "@/web/config"


const handle = mw({
  POST: [
    auth,
    validate({
      body: {
        content: contentValidator,
        title: titleValidator,
      },
    }),
    async ({
      session,
      models: { PostModel },
      input: {
        body: { content, title },
      },
      res,
    }) => {
      try {
        const post = await PostModel.query()
          .insertAndFetch({
            authorId: session.id,
            content,
            title,
            username: session.username
          })
        
        
        
        res.send(post)
      } 
      catch (error) {
        res.status(500).send("Error creating post")
      }
    }
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.optional(),
      },
    }),
     async ({
        res,
        models: { PostModel },
        input: {
            query: { page },
        },
    }) => {
        try {
            const posts = await PostModel.query()
            
              .offset((page - 1) * config.ui.itemsPerPage)
              .limit(config.ui.itemsPerPage)
          const [{ count }] = await PostModel.query().count()
            res.send({ posts, count })
        } catch (error) {
            res.status(500).send("Error fetching posts")
        }
    },
],
})

export default handle