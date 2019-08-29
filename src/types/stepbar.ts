import { ERouterPath } from './index';

export interface IStep {
  order: number;
  textkey: string;
  path: ERouterPath;
  isDisabled?: boolean;
  onClick?: () => void;
}

export interface IStepbar {
  currentPath: string;
  steps: IStep[];
}
