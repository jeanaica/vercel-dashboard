import { FC, useEffect, useState } from 'react';
import { MessageEnum } from './Table/types';

type Props = {
  message: string;
  type?: MessageEnum;
};

const Alert: FC<Props> = ({ message, type = MessageEnum.Info }) => {
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
      </div>
    </>
  );
};

export default Alert;
