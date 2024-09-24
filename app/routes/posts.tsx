import { PrismaClient } from '@prisma/client'
import { Form, Link, useLoaderData } from '@remix-run/react'

export async function loader() {
  const prisma = new PrismaClient()

  const posts = await prisma.post.findMany()

  return {
    posts,
  }
}

export default function Posts() {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <div>
      <Link to="new">Create post</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loaderData.posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                <Link to={`${post.id}/edit`}>Edit</Link>
                <Form
                  method="POST"
                  action={`/resources/posts/${post.id}/delete`}
                  navigate={false}
                >
                  <button type="submit">Delete</button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
