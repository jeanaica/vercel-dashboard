import axiosInstance from './axios';
import { ApiResponse, EnvParams, EnvVarResponse } from '../types/api';

export const fetchEnvironment = async (
  params: EnvParams
): Promise<EnvVarResponse[]> => {
  const fetchUrl = import.meta.env.VITE_VERCEL_TEAM_ID
    ? `/env?gitBranch=${params.gitBranch}&source=vercel-cli:pull&teamId=${
        import.meta.env.VITE_VERCEL_TEAM_ID
      }`
    : `/env?gitBranch=${params.gitBranch}&source=vercel-cli:pull`;

  const response = await axiosInstance.get<ApiResponse<EnvVarResponse[]>>(
    fetchUrl
  );

  return response.data.envs;
};

export const fetchEnvironmentBranches = async (): Promise<
  (string | undefined)[]
> => {
  const fetchUrl = import.meta.env.VITE_VERCEL_TEAM_ID
    ? `/env?target=preview&teamId=${import.meta.env.VITE_VERCEL_TEAM_ID}`
    : `/env?target=preview`;
  const response = await axiosInstance.get<ApiResponse<EnvVarResponse[]>>(
    fetchUrl
  );

  const items = response.data.envs
    .map((env: EnvVarResponse) => env.gitBranch)
    .filter((item) => item);

  return [...new Set(items)];
};

export const deleteEnvVariable = async (id: string): Promise<string> => {
  try {
    const deleteUrl = import.meta.env.VITE_VERCEL_TEAM_ID
      ? `/env/${id}?teamId=${import.meta.env.VITE_VERCEL_TEAM_ID}`
      : `/env/${id}`;

    await axiosInstance.delete(deleteUrl);

    return id;
  } catch (error) {
    throw new Error(id);
  }
};
