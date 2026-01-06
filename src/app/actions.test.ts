import { describe, it, expect, vi, beforeEach } from 'vitest'
import { addTodo, toggleTodo, deleteTodo } from './actions'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Prisma と Next.js の cache をモック化
vi.mock('@/lib/prisma', () => ({
  default: {
    todo: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('Todo Server Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('addTodo', () => {
    it('should create a new todo and revalidate path', async () => {
      const formData = new FormData()
      formData.append('title', 'Test Todo')

      await addTodo(formData)

      expect(prisma.todo.create).toHaveBeenCalledWith({
        data: { title: 'Test Todo' },
      })
      expect(revalidatePath).toHaveBeenCalledWith('/')
    })

    it('should not create a todo if title is empty', async () => {
      const formData = new FormData()
      formData.append('title', '  ')

      await addTodo(formData)

      expect(prisma.todo.create).not.toHaveBeenCalled()
      expect(revalidatePath).not.toHaveBeenCalled()
    })
  })

  describe('toggleTodo', () => {
    it('should update todo completed status and revalidate path', async () => {
      await toggleTodo(1, true)

      expect(prisma.todo.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { completed: true },
      })
      expect(revalidatePath).toHaveBeenCalledWith('/')
    })
  })

  describe('deleteTodo', () => {
    it('should delete todo and revalidate path', async () => {
      await deleteTodo(1)

      expect(prisma.todo.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      })
      expect(revalidatePath).toHaveBeenCalledWith('/')
    })
  })
})
