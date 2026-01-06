import prisma from '@/lib/prisma'
import { addTodo, deleteTodo, toggleTodo } from './actions'

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 py-10 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Todo List</h1>

        <form action={addTodo} className="mb-6 flex gap-2">
          <input
            type="text"
            name="title"
            placeholder="Add a new todo..."
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded-md bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <div className="flex items-center gap-3">
                <form action={toggleTodo.bind(null, todo.id, !todo.completed)}>
                  <button
                    type="submit"
                    className={`flex h-5 w-5 items-center justify-center rounded border ${todo.completed
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-400 dark:border-gray-500'
                      }`}
                  >
                    {todo.completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </form>
                <span
                  className={`text-sm ${todo.completed
                      ? 'text-gray-400 line-through dark:text-gray-500'
                      : 'text-gray-700 dark:text-gray-200'
                    }`}
                >
                  {todo.title}
                </span>
              </div>

              <form action={deleteTodo.bind(null, todo.id)}>
                <button
                  type="submit"
                  className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-red-500 dark:hover:bg-gray-600"
                  aria-label="Delete todo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </form>
            </li>
          ))}

          {todos.length === 0 && (
            <li className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
              No todos yet. Add one above!
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
