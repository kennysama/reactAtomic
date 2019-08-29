import { IStepbar } from '../types/stepbar';
import { ITEM_STEPS } from '../lookups/stepbar';

export function getItemStepbar(currentPath: string, hasClothCompleted: boolean, hasDesignCompleted: boolean): IStepbar {
  const canSize = hasClothCompleted && hasDesignCompleted;
  const states = [true, hasClothCompleted, canSize];
  const steps = ITEM_STEPS.map((step, index) => {
    return {
      ...step,
      isDisabled: !states[index],
    };
  });

  return {
    currentPath,
    steps,
  };
}
