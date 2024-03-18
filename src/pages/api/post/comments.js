import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

const handle = mw({
  GET: [
    auth,
    async ({ models: { CommentModel }, session, res }) => {
      const userId = session.id

      try {
        const comments = await CommentModel.query().where("userId", userId)

        res.send({
          comments
        })
      } catch (error) {
        res.status(500).send({ error: "Internal Server Error" })
      }
    }
  ]
})

export default handle
