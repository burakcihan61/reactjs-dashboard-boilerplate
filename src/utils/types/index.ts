import { FormProps } from 'antd';

import enUS from 'antd/es/locale/en_US';
import trTR from 'antd/es/locale/tr_TR';

export interface IBaseComponent {
  children?: JSX.Element | JSX.Element[] | string | string[];
  className?: string;
}
export interface IFormProps extends FormProps {
  onCancel?: () => void;
}

export const SUPPORTED_LANGUAGES: { [key: string]: any } = {
  en: enUS,
  tr: trTR,
};

export interface IService<TRequest, TResponse> {
  getAll(page?: number, limit?: number): Promise<TResponse[]>;
  getById(id: string): Promise<TResponse>;
  create(data: TRequest): Promise<TResponse>;
  update(id: string, data: TResponse): Promise<TResponse>;
  delete(id: string): Promise<TResponse>;
}
export interface IEntityBase {
  _id: string;
}
export interface ITypeEntity extends IEntityBase {
  name: string;
  description: string;
}
