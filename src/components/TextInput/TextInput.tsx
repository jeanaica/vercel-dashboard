import { ChangeEvent, FC } from 'react';
import Label from '../Label/Label';

type Props = {
  name: string;
  label: string;
  error?: string;
  placeholder?: string;
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
};

const TextInput: FC<Props> = ({
  name = '',
  label = '',
  placeholder,
  value,
  error,
  onChange,
}) => {
  return (
    <div className='flex flex-col flex-1'>
      <div className='flex gap-1 flex-col'>
        <Label name={name} label={label} />
        <input
          name={name}
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='border border-gray-300 rounded p-2 w-1/2'
        />
      </div>
      {error && <span>{error}</span>}
    </div>
  );
};

export default TextInput;
