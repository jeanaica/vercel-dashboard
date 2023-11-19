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
      },
    }
  );

  const items = response.data.envs.map((env: EnvVarResponse) => env.gitBranch);

  return [...new Set(items)];
};

export const deleteEnvVariable = async (id: string): Promise<string> => {
  try {
    await axiosInstance.delete(`/env/${id}`);

    return id;
  } catch (error) {
    throw new Error(id);
  }
};
