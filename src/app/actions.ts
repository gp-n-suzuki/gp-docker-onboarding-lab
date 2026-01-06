'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string

  if (!title || title.trim() === '') {
    return
  }

  await prisma.todo.create({
    data: {
      title: title.trim(),
    },
  })

  revalidatePath('/')
}

export async function toggleTodo(id: number, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed },
  })

  revalidatePath('/')
}

export async function deleteTodo(id: number) {
  await prisma.todo.delete({
    where: { id },
  })

  revalidatePath('/')
}
