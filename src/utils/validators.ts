import { number, string, } from "yup"
import * as yup from "yup"
export const emailValidator = string().email().required()
export const passwordValidator = string()

  .min(10)
  .matches(
    /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d)(?=.*[^\p{L}\d)]).*$/gu,
    "Password must contain 1 upper & 1 lower letter, 1 digit and 1 spe. char.",
  )
  .required()
export const userNameValidator = string().min(3, "Username too short").required("Username is required")
export const todoDescriptionValidator = string().min(8).required()
export const categoryNameValidator = string().min(8).required()
export const idValidator = number().integer().min(1).required()
export const pageValidator = number().integer().min(1).default(1).required()
export const contentValidator = string().min(1).required("You gotta write something here !")
export const titleValidator = string().min(3, "Your title is too short").required("Title is required !")
export const postIdValidator = yup.number().positive().integer()
export const authorIdValidator = number().integer().min(1).required()
export const commentValidator = string().min(1).required("You gotta write something here !")