export interface ResponseDataErrorModel<T, E = unknown> {
  data: T | null;
  error: E | null;
}
