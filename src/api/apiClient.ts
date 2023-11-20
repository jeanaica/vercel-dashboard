import axiosInstance from './axios';
import { ApiResponse, EnvParams, EnvVarResponse } from '../types/api';

export const fetchEnvironment = async (
  params: EnvParams
): Promise<EnvVarResponse[]> => {
  const response = await axiosInstance.get<ApiResponse<EnvVarResponse[]>>(
    'env',
    {
      params: {
        gitBranch: params.gitBranch,
        source: 'vercel-cli:pull',
        teamId: `${
          import.meta.env.VITE_PERSONAL
            ? undefined
            : import.meta.env.VITE_VERCEL_ID
        }`,
      },
    }
  );

  return response.data.envs;
};

export const fetchEnvironmentBranches = async (): Promise<
  (string | undefined)[]
> => {
  const response = await axiosInstance.get<ApiResponse<EnvVarResponse[]>>(
    '/env',
    {
      params: {
        target: 'preview',
        teamId: `${
          import.meta.env.VITE_PERSONAL
            ? undefined
            : import.meta.env.VITE_VERCEL_ID
        }`,
      },
    }
  );

  const items = response.data.envs
    .map((env: EnvVarResponse) => env.gitBranch)
    .filter((item) => item);

  return [...new Set(items)];
};

export const deleteEnvVariable = async (id: string): Promise<string> => {
  try {
    const deleteUrl = import.meta.env.VITE_PERSONAL
      ? `/env/${id}`
      : `/env/${id}?teamId=${import.meta.env.VITE_VERCEL_ID}`;

    await axiosInstance.delete(`${deleteUrl}`);

    return id;
  } catch (error) {
    throw new Error(id);
  }
};
