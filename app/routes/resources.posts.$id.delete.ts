import { PrismaClient } from '@prisma/client'
import { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'

export async function action({ params }: ActionFunctionArgs) {
  invariant(params.id, 'ID param is required')

  const prisma = new PrismaClient()

  await prisma.post.delete({
    where: {
      id: Number(params.id),
    },
  })

  return {
    success: true,
  }
}
