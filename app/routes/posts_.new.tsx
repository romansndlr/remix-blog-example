import { ActionFunctionArgs } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import { PostsForm } from '~/components/posts-form'
import { upsertPostsService } from '~/services/upsert-posts-service'

export async function action({ request }: ActionFunctionArgs) {
  return upsertPostsService(request)
}

export default function CreatePost() {
  const actionData = useActionData<typeof action>()

  return <PostsForm errors={actionData?.errors} />
}
