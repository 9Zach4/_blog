import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import Pagination from "@/web/components/ui/Pagination"
import apiClient from "@/web/services/apiClient"
import Link from "next/link"
import Loader from "@/web/components/ui/Loader"

export const getServerSideProps = async ({ query: { page } }) => {
  const data = await apiClient("/post", { params: { page } })

  return {
    props: { initialData: data }
  }
}
// eslint-disable-next-line max-lines-per-function
const ListPage = ({ initialData }) => {
  const { query } = useRouter()
  const page = Number.parseInt(query.page || 1, 10)
  const {
    isLoading,
    data: responseData
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => apiClient("/posts", { params: { page } }),
    initialData,
    enabled: false
  })
  const posts = responseData?.posts || []
  const count = responseData?.count || 0
 
  if (
    isLoading) {
     return (
      <Loader />
    ) 
  }
  
  return (
    <div className="relative">
      <table className="w-full">
        <thead>
          <tr className="bg-white">
            {[
              "Title",
              "Content",
              "Author",
              "Actions"
            
            ].map((header) => (
              <th key={header} className="border border-b border-black p-5">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map(({ id, title, username, content }) => (
            <tr key={id} className="border border-black bg-white">
              <td className="border border-b border-black p-2">{title}</td>
              <td className="p-2">{content}</td>
              <td className="border border-b border-black text-center">{username}</td>
              <td className="text-center">
                <Link href={`/post/comments/${id}`}>reply

              </Link>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} page={page} className="mt-8" />
    </div>
  )
}

export default ListPage
