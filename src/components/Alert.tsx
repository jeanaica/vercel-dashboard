import { FC, useEffect, useState } from 'react';
import { MessageEnum } from './Table/types';

type Props = {
  message: string;
  type?: MessageEnum;
  list?: string[];
};

const Alert: FC<Props> = ({ message, type = MessageEnum.Info, list }) => {
  const infoStyle = type === MessageEnum.Info && 'bg-blue-300';
  const errorStyle = type === MessageEnum.Error && 'bg-red-300';
  const successStyle =
    type === MessageEnum.Success && 'text-white bg-green-500';
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setMsg(message);
  }, [message]);

  return (
    <>
      <div
        className={`${infoStyle} ${errorStyle} ${successStyle} rounded w-full transition-all ease-in-out ${
          msg ? 'opacity-100 p-4' : 'opacity-0 p-0'
        }`}
      >
        <div className=''>{msg}</div>
        {list && list.length > 0 && (
          <ul className='px-4 list-disc overflow-y-auto max-h-[500px] break-words'>
            {list.map((item, i) => {
              return (
                <li key={i} className='p-4'>
                  {item}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Alert;
