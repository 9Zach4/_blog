import clsx from "clsx"
import { useField } from "formik"

const FormField = ({ name, label, className, ...otherProps }) => {
  const [field, { error, touched }] = useField(name)
  const hasError = Boolean(error && touched)
  const isFileInput = otherProps.type === "file"

 return (
    <label className={clsx("flex flex-col gap-2", className)}>
      <span className="font-semibold text-sm">{label}</span>
      {isFileInput ? (
        <input className="border-2 p-2" {...field} {...otherProps} />
      ) : (
        <input className="border-2 p-2" {...field} {...otherProps} />
      )}
      {hasError && <span className="text-red-500 text-sm">{error}</span>}
    </label>
  )
}
export default FormField
