export interface APIError {
  data: {
    message?: string;
    success?: boolean;
    stack: string;
    errorSources?: { path: string; message: string }[];
    err?: unknown;
  };
  status?: number;
}
