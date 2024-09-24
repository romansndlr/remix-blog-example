import { Form } from '@remix-run/react'

export function PostsForm({
  errors,
  initialValues,
}: {
  initialValues?: { title: string | null; content: string | null } | null
  errors?: Record<string | number | symbol, string[] | undefined>
}) {
  return (
    <Form className="flex flex-col p-6 max-w-80 bg-gray-200" method="POST">
      <label>
        Title:
        <input
          defaultValue={initialValues?.title || ''}
          type="text"
          name="title"
        />
      </label>
      {errors?.title && <em>{errors.title}</em>}
      <label>
        Content:
        <textarea defaultValue={initialValues?.content || ''} name="content" />
      </label>
      <button type="submit">{initialValues ? 'Edit' : 'Create'} post</button>
    </Form>
  )
}
