export interface IApiResponseSuccess<T = any> {
  data: T;
}

export interface IApiError {
  code: string;
  message: string;
}

export interface IApiResponseError {
  errors: IApiError[];
}

export interface IDeleteRes {
  id: number;
}

export class ApiError extends Error {
  private _errors: IApiError[] = [];

  constructor(error: string | IApiError[]) {
    super();

    if (typeof error === 'string') {
      this._errors.push({ code: '', message: error });
    } else {
      this._errors = error;
    }
  }

  get errors() {
    return this._errors;
  }
}
