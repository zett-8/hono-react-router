import type { todos } from '../../database/schema'
import type { Todo } from '../../database/schema/todo'
import type { TodoRepository } from '../infrastructure/todo.repository'

export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async create(todo: typeof todos.$inferInsert): Promise<Todo> {
    // Add business logic here (validation, transformation, etc.)
    return this.todoRepository.create(todo)
  }

  async findAll(): Promise<Todo[]> {
    // Add business logic here (validation, transformation, etc.)
    return this.todoRepository.findAll()
  }

  async delete(id: string): Promise<Todo> {
    // Add business logic here (validation, transformation, etc.)
    return this.todoRepository.delete(id)
  }
}
