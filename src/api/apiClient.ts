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
        teamId: `${import.meta.env.VITE_VERCEL_TEAM_ID}`,
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
        teamId: `${import.meta.env.VITE_VERCEL_TEAM_ID}`,
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
    await axiosInstance.delete(
      `/env/${id}?teamId=${import.meta.env.VITE_VERCEL_TEAM_ID}`
    );

    return id;
  } catch (error) {
    throw new Error(id);
  }
};
