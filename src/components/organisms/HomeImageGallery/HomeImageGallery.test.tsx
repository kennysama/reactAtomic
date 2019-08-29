import React from 'react';
import { shallow } from 'enzyme';

import App from '../../App';
import HomeImageGallery from './HomeImageGallery';
import { getGalleryData } from '../../../lookups/home-gallery';
import { getOrderItem, getSubCategoryPieces } from '../../../helpers/order-items';

it('renders without crashing', () => {
  const func = (flag: boolean) => {
    return { flag };
  };
  const wrapper = shallow(
    <App>
      <HomeImageGallery
        clothSelectionParameters={jest.fn()}
        data={getGalleryData()}
        temporaryOnePiecePopUp={false}
        temporaryOnePiecePopUpOpen={func}
      />
    </App>,
  );
  wrapper.unmount();
});

it('should match every gallery button item with a item Code', () => {
  const homeGalleryData = getGalleryData();
  const errors: string[] = [];

  homeGalleryData.forEach(topic =>
    topic.buttons.forEach(item => {
      const pieces = getSubCategoryPieces(item.subCategory);
      if (!getOrderItem(item.category, pieces)) {
        errors.push(`category missing: ${item.category},parts missing ${pieces}`);
      }
    }),
  );

  expect(errors.length).toBe(0);
});
