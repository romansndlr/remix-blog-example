import { PrismaClient } from '@prisma/client'
import { redirect } from '@remix-run/node'
import { z } from 'zod'

export async function upsertPostsService(request: Request, postId?: string) {
  const formData = await request.formData()

  const title = formData.get('title')
  const content = formData.get('content')

  const CreatePostSchema = z.object({
    title: z.string().min(1),
    content: z.string(),
  })

  try {
    const validated = await CreatePostSchema.parseAsync({ title, content })

    const prisma = new PrismaClient()

    if (postId) {
      await prisma.post.update({
        where: { id: Number(postId) },
        data: validated,
      })
    } else {
      await prisma.post.create({
        data: validated,
      })
    }

    return redirect('/posts')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      }
    }

    return {
      success: false,
      errors: {} as Record<string, string[]>,
      message: error,
    }
  }
}
