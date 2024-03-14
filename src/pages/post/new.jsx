import { contentValidator, titleValidator } from "@/utils/validators"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { Formik } from "formik"
import { object } from "yup"
import apiClient from "@/web/services/apiClient"


const initialValues = {
  title: "",
  content: ""
}
const validationSchema = object({
  title: titleValidator.label("Title"),
  content: contentValidator.label("Content"),
})
const PostPageInit = () => { 
  const handleSubmit = async (values) => {
    const post = await apiClient.post("/post", values)

    if (post) {
    location.reload()
    }
  }
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="title" placeholder="Enter a title" />
        <FormField name="content" placeholder="Enter a content" />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"
        >
          Submit
        </button>
      </Form>
    </Formik>
  )
}

export default PostPageInit