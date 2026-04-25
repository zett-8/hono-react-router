import { eq } from 'drizzle-orm'
import type { DrizzleD1Database } from 'drizzle-orm/d1'
import * as schema from '../../database/schema'
import type { Todo } from '../../database/schema/todo'

const todos = schema.todos

export interface TodoRepository {
  create(todo: typeof todos.$inferInsert): Promise<Todo>
  findAll(): Promise<Todo[]>
  delete(id: string): Promise<Todo>
}

export class D1TodoRepository implements TodoRepository {
  constructor(private readonly db: DrizzleD1Database<typeof schema>) {}

  async create(todo: typeof todos.$inferInsert): Promise<Todo> {
    const result = await this.db.insert(todos).values(todo).returning()
    return result[0]
  }

  async findAll(): Promise<Todo[]> {
    const result = await this.db.select().from(todos)
    return result
  }

  async delete(id: string): Promise<Todo> {
    const result = await this.db.delete(todos).where(eq(todos.id, id)).returning()
    return result[0]
  }
}
