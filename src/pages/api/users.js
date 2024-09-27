import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { emailValidator, passwordValidator, userNameValidator } from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        email: emailValidator,
        password: passwordValidator,
        username: userNameValidator,
      },
    }),
    async ({
      input: {
        body: { email, password, username },
      },
      models: { UserModel },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] =
        await UserModel.hashPassword(password)

      await UserModel.query().insertAndFetch({
        email,
        passwordHash,
        passwordSalt,
        username,
      })
  

      res.send({ result: true })
    },
  ],
  GET: [
    async ({ models: { UserModel }, res }) => {
      const users = await UserModel.query()

      res.send(users)
    },
  ],
})

export default handle
