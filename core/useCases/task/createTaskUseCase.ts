export class CreateTaskRequest {
  constructor(readonly name: string, readonly description: string) {}
}

export interface CreateTaskUseCase {
  create(request: CreateTaskRequest): void
}
