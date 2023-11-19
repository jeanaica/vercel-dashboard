export interface ApiResponse<T> {
  envs: T;
}

export interface DropdownItem {
  value: string;
  label: string;
}

export interface EnvVarResponse {
  id?: string;
  key?: string;
  value?: string;
  configurationId?: string | null;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string | null;
  updatedBy?: string | null;
  gitBranch?: string;
  edgeConfigId?: string | null;
  edgeConfigTokenId?: string | null;
}

export interface EnvParams {
  gitBranch: string;
}
