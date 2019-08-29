import { designSelectionReducer as reducer, initialState } from './reducer';
import { DesignSelectionDefault, loadAvailableOptionSuccess } from './actions';
import { OPTION_DATA } from '../../mockups/api/option';

describe('Task reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle load data', () => {
    const data = OPTION_DATA;
    const expected = {
      ...initialState,
      designSelection: {
        ...initialState.designSelection,
        availableOptions: data.availableOptions,
      },
    };
    expect(reducer(undefined, loadAvailableOptionSuccess(data))).toEqual(expected);
  });

  it('should handle clear data', () => {
    expect(reducer(undefined, DesignSelectionDefault())).toEqual(initialState);
  });
});
