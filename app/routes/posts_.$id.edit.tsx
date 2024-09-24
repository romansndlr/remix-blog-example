import { PrismaClient } from '@prisma/client'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { PostsForm } from '~/components/posts-form'
import { upsertPostsService } from '~/services/upsert-posts-service'

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.id, 'ID param is required')

  const prisma = new PrismaClient()

  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
  })

  return { post }
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.id, 'ID param is required')

  return upsertPostsService(request, params.id)
}

export default function EditPost() {
  const loaderData = useLoaderData<typeof loader>()

  return <PostsForm initialValues={loaderData.post} />
}
