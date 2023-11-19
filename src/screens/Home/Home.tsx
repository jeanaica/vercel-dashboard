import { FC } from 'react';
import { TableProvider } from '../../components/Table/Provider';
import EnvVarTable from './components/EnvVarTable';

const Home: FC = () => {
  return (
    <>
      <TableProvider>
        <EnvVarTable />
      </TableProvider>
    </>
  );
};

export default Home;
