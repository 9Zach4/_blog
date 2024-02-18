import { number, object, string } from "yup"

const validationSchema = object({
  api: object({
    baseUrl: string().required(),
  }).notUnknown(),
  ui: object({
    itemPerPage: number().max(15).required()
  }),
  security: object({
    session: object({
      storageKey: string().required(),
    }),
  }),
}).notUnknown()
const data = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API__BASE_URL,
  },
  ui: {
    itemPerPage: 5,
  },
  security: {
    session: {
      storageKey: "sessionsToken",
    },
  },
}
const config = (() => {
  try {
    return validationSchema.validationSync(data, {
      stripUnknown: true,
      abortEarly: false,
    })
  } catch (err) {
    // eslint-disable-next-line no-console
       console.error(err)
  }

  return null
})()

export default config