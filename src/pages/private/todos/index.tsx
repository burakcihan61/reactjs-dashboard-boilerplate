import { useState } from 'react';
import { Button, Table, Space } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useTodo from 'store/useTodo';
import { ITodo } from 'services/todo/index.type';

export default function Todos() {
  const { t } = useTranslation(['common', 'todo']);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    todosQuery: { data, isFetching },
  } = useTodo({ page, limit });

  const columns: ColumnsType<ITodo> = [
    {
      title: t('todo:table:title'),
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return (
          <>
            {record.title} {record.title}
          </>
        );
      },
      sorter: {
        compare: (a, b) => {
          return a.title.localeCompare(b.title);
        },
        multiple: 2,
      },
    },
    {
      title: t('common:action'),
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => {
        return (
          <>
            <Space direction="horizontal">
              <Button size="small">{t('common:add')}</Button>
              <Button size="small">{t('common:edit')}</Button>
              <Button size="small">
                <Link to={`/todos/${item.id}`}>{t('common:detail')}</Link>
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  const onChange = (pagination: TablePaginationConfig) => {
    pagination.onChange = (pageNumber, pageSize) => {
      setPage(pageNumber);
      setLimit(pageSize);
    };
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isFetching}
      rowKey={(record) => record.id}
      onChange={onChange}
    />
  );
}
