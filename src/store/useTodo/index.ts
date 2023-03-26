import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TodoService } from 'services';
import { ITodo } from 'services/todo/index.type';
import { QUERY_KEY_TYPES } from 'utils';

export interface IUseTodo {
  id?: string;
  page?: number;
  limit?: number;
}

export const todoKeys = {
  all: () => [QUERY_KEY_TYPES.todos],
  todos: (page: number = 1, limit: number = 10) => [...todoKeys.all(), page, limit],
  detail: (id?: string) => [...todoKeys.all(), QUERY_KEY_TYPES.detail, id],
};

export default function useTodo({ id = '', page = 1, limit = 10 }: IUseTodo) {
  const { getAll, getById, update, delete: remove } = TodoService;

  const queryClient = useQueryClient();

  const todoQuery = useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => getById(id || ''),
    enabled: !!id,
  });

  const todosQuery = useQuery({
    queryKey: todoKeys.todos(page, limit),
    queryFn: () => getAll(page, limit),
  });

  const updateTodo = useMutation({
    mutationKey: todoKeys.detail(id),
    mutationFn: (data: ITodo) => update(id, data),
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<ITodo[]>(todoKeys.detail(id));

      queryClient.setQueryData<ITodo[]>(
        todoKeys.all(),
        (previousData) => [...(previousData || []), updateTodo] as ITodo[]
      );

      return previousTodos;
    },
    onSuccess: () => {},
    onError: (err, newData, previousTodos) => {
      queryClient.setQueryData(todoKeys.all(), previousTodos);
    },
  });

  const deleteTodo = useMutation({
    mutationKey: todoKeys.detail(id),
    mutationFn: () => remove(id),
  });

  return {
    todoQuery,
    todosQuery,
    updateTodo,
    deleteTodo,
  };
}
