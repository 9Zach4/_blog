import React from "react"
import { Formik } from "formik"
import apiClient from "@/web/services/apiClient"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"




const ProfileEdit = () => {
  const handleSubmit = async (values, { resetForm }) => {
    await apiClient.post("/profile", values)

    resetForm()
  }

  return (
 <div>
      <h1 className="text-2xl my-8">
        Edit your profile
      </h1>
    <Formik
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="username" placeholder="Username" />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 active:bg-blue-700 text-2xl text-white"
        >
          Save
        </button>
      </Form>
      </Formik>
    </div>
  )
}

export default ProfileEdit