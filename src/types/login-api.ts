export interface ILoginReq {
  tempoCode: string;
  staffCode: string;
  password: string;
}

export interface ILoginRes {
  certificationToken: string;
  managerFlag: number;
}
