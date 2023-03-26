import { IEntityBase } from 'utils/types';

export interface ITodo extends IEntityBase {
  title: string;
  completed: boolean;
  id: number;
  userId: number;
}

export interface ITodoPost extends Omit<ITodo, '_id'> {}
