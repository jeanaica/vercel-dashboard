import Alert from '../Alert';
import TableComponent from './TableComponent';
import Filter from './Filter';
import { useTableContext } from './context';
import { useEffect, useState } from 'react';
import { MessageEnum } from './types';

export type MessageType = {
  type: 'error' | 'success';
  text: string;
};

type TableProps<T> = {
  data: T[];
};

const Table = <T extends Record<string, string | boolean | number>>(
  props: TableProps<T>
) => {
  const { message, setMessage } = useTableContext();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage({
        type: MessageEnum.Error,
        text: '',
      });
      clearTimeout(timeout);
    }, 2000);
  }, [message.text]);

  useEffect(() => {
    setSearchTerm('');
  }, [props.data]);

  return (
    <div className='flex flex-col gap-4'>
      <Alert message={message.text} type={message.type} />
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className='flex flex-col justify-center items-center gap-4'>
        <TableComponent<T> data={props.data} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Table;
