import { http } from 'utils';
import { IService } from 'utils/types';
import { ITodo, ITodoPost } from './index.type';

const request = http();

class TodoService implements IService<ITodoPost, ITodo> {
  private static instance: TodoService;

  public static getInstance(): TodoService {
    if (!TodoService.instance) {
      return (TodoService.instance = new TodoService());
    }
    return TodoService.instance;
  }

  getAll(page: number = 1, limit: number = 10): Promise<ITodo[]> {
    return request
      .get('/todos', {
        params: {
          page,
          limit,
        },
      })
      .then((response) => response.data);
  }
  getById(id: string): Promise<ITodo> {
    return request.get(`/todos/${id}`).then((response) => response.data);
  }
  create(data: ITodoPost): Promise<ITodo> {
    return request.post('/todos', data).then((response) => response.data);
  }
  update(id: string, data?: ITodo): Promise<ITodo> {
    return request.put(`/todos/${id}`, data).then((response) => response.data);
  }
  delete(id: string): Promise<ITodo> {
    return request.put(`/todos/${id}`).then((response) => response.data);
  }
}

export default TodoService.getInstance();
