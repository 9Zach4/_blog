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
      models: { PostModel },
      input: {
        body: { content, title },
      },
      res,
    }) => {
      const post = await PostModel.query()
        .insertAndFetch({
          content,
          title,
        })

      res.send(post)
    },
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
      const query = PostModel.query()
      const posts = await query
        .clone()
         .withGraphFetched("author")
        .limit(config.ui.itemsPerPage)
        .offset((page - 1) * config.ui.itemsPerPage)
      const [{ count }] = await query.clone().count()
      res.send({ posts, count })
    },
  ],
})

export default handle