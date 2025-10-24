export type ApiError = {
  success: false;
  message: string;
  error?: string;
};

export type ApiResult<T> = T | ApiError;

export const isApiError = (value: unknown): value is ApiError => {
  return (
    typeof value === "object" &&
    value !== null &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value as any).success === false
  );
};
