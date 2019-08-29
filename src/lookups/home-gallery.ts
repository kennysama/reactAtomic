import { IImageGallery } from '../types/home';
import { ERouterPath } from '../types';

export function getGalleryData(): IImageGallery[] {
  const translate = 'Home.';
  return [
    {
      key: 1,
      url: 'images/home/classic.png',
      title: translate + 'classic',
      to: ERouterPath.clothSelection,
      buttons: [
        { key: 1, category: 'CS', subCategory: '01', text: translate + 'suit', to: ERouterPath.clothSelection },
        { key: 2, category: 'CS', subCategory: '02', text: translate + 'jacket', to: ERouterPath.clothSelection },
        { key: 3, category: 'CS', subCategory: '03', text: translate + 'trousers', to: ERouterPath.clothSelection },
        { key: 4, category: 'CS', subCategory: '04', text: translate + 'vest', to: ERouterPath.clothSelection },
      ],
    },
    {
      key: 2,
      url: 'images/home/modern.png',
      title: translate + 'modern',
      to: ERouterPath.clothSelection,
      buttons: [
        { key: 1, category: 'MT', subCategory: '01', text: translate + 'suit', to: ERouterPath.clothSelection },
        { key: 2, category: 'MT', subCategory: '02', text: translate + 'jacket', to: ERouterPath.clothSelection },
        { key: 3, category: 'MT', subCategory: '03', text: translate + 'trousers', to: ERouterPath.clothSelection },
      ],
    },
    {
      key: 3,
      url: 'images/home/formal.png',
      title: translate + 'formal',
      to: ERouterPath.clothSelection,
      buttons: [
        { key: 1, category: 'FM', subCategory: '01', text: translate + 'suit', to: ERouterPath.clothSelection },
        { key: 2, category: 'FM', subCategory: '02', text: translate + 'jacket', to: ERouterPath.clothSelection },
        { key: 3, category: 'FM', subCategory: '03', text: translate + 'trousers', to: ERouterPath.clothSelection },
        { key: 4, category: 'FM', subCategory: '04', text: translate + 'vest', to: ERouterPath.clothSelection },
        { key: 5, category: 'TX', subCategory: '01', text: translate + 'tuxedo', to: ERouterPath.clothSelection },
      ],
    },
    {
      key: 4,
      url: 'images/home/shirt.png',
      title: translate + 'shirt',
      to: ERouterPath.clothSelection,

      buttons: [
        { key: 1, category: 'DS', subCategory: '15', text: translate + 'longSleve', to: ERouterPath.clothSelection },
        { key: 2, category: 'DS', subCategory: '16', text: translate + 'shortSleve', to: ERouterPath.clothSelection },
        { key: 3, category: 'DS', subCategory: '17', text: translate + 'formal', to: ERouterPath.clothSelection },
      ],
    },
    {
      key: 5,
      url: 'images/home/womens.png',
      title: translate + 'women',
      to: ERouterPath.clothSelection,

      buttons: [
        { key: 1, category: 'WM', subCategory: '01', text: translate + 'suit', to: ERouterPath.clothSelection },
        {
          key: 2,

          category: 'WM',
          subCategory: '02',
          text: translate + 'jacket',
          to: ERouterPath.clothSelection,
        },
        { key: 3, category: 'WM', subCategory: '03', text: translate + 'pants', to: ERouterPath.clothSelection },
        { key: 4, category: 'WM', subCategory: '05', text: translate + 'skirt', to: ERouterPath.clothSelection },
        { key: 5, category: 'WM', subCategory: '10', text: translate + 'onePiece', to: ERouterPath.clothSelection },
      ],
    },
  ];
}
