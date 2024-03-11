import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { postIdValidator, contentValidator, titleValidator } from "@/utils/validators"

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
      const post = await PostModel.query().insertAndFetch({
        authorId: session.userId,
        content,
        title,
      })

      res.send(post)
    },
  ],
  GET: [
    validate({
      query: {
        postId: postIdValidator,
        authorId: postIdValidator.optional(),
      },
    }),
    async ({
      models: { PostModel },
      input: {
        query: { postId },
      },
      res,
    }) => {
      const post = await PostModel.query().findById(postId).throwIfNotFound()

      res.send(post)
    },
  ],
  PATCH: [
    auth,
    validate({
      query: {
        postId: postIdValidator,
      },
      body: {
        content: contentValidator.optional(),
        title: titleValidator.optional(),
      },
    }),
    async ({
      models: { PostModel },
      input: {
        body,
        query: { postId },
      },
      res,
    }) => {
      const updatedPost = await PostModel.query()
        .updateAndFetchById(postId, {
          ...body,
          updatedAt: PostModel.fn.now(),
        })
        .throwIfNotFound()

      res.send(updatedPost)
    },
  ],
  DELETE: [
    auth,
    validate({
      query: {
        postId: postIdValidator,
      },
    }),
    async ({
      models: { PostModel },
      input: {
        query: { postId },
      },
      res,
    }) => {
      await PostModel.query().deleteById(postId)

      res.send({ result: true })
    },
  ],
})

export default handle
