export interface IInformationState {
  image: string;
  information: string;
  informationDialogOpen: boolean;
}

export const initialInformationState: IInformationState = {
  image: '',
  information: '',
  informationDialogOpen: false,
};
