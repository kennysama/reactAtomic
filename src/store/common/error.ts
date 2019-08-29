import { IApiError } from '../../types/api';

export interface IErrorState {
  errors: IApiError[];
  errorDialogOpen: boolean;
}

export const initialErrorState: IErrorState = {
  errors: [{ code: '', message: '' }],
  errorDialogOpen: false,
};
