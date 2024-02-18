import { boolean, number, object, string } from "yup"


const validationSchema = object({
  db: object({
    client: string().oneOf(["pg"]).required(),
    connection: string().required(),
  }).noUnknown(),
  security: object({
    jwt: object({
      cookieName: string().required(),
      secret: string().min(32).required(),
      expiresIn: string().required(),
      secure: boolean().required(),
    }).noUnknown(),
    password: object({
      iterations: number().min(10000).required(),
      keylen: number().min(128).required(),
      digest: string().oneOf(["sha3-512"]),
      pepper: string().min(256).required(),
    }),
  }).noUnknown(),
}).noUnknown()
const data = {

  db: {
    client: "pg",
    connection: process.env.DB__CONNECTION,
  },
  security: {
    password: {
      digest: "sha3-512",
      iterations: 100000,
      keylen: 256,
      pepper: process.env.SECURITY__PASSWORD__PEPPER,
    },
  },
}
const config = (() => {
  try {
    return validationSchema.validateSync(data, {
      stripUnknown: true,
      abortEarly: false,
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exit(1)
  }
  
  return null
})()

export default config