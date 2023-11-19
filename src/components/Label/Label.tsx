import { FC } from 'react';

type Props = {
  name: string;
  label: string;
  error?: string;
};

const Label: FC<Props> = ({ name = '', label = '', error }) => {
  const errStyle = error ? 'text-red-400' : '';

  return (
    <label htmlFor={name} className={`${errStyle} font-semibold`}>
      {label}
    </label>
  );
};

export default Label;
