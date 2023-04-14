export interface LoadingIndicatorModel {
  loading: boolean;

  actives: {
    [id: string]: string;
  };
}
