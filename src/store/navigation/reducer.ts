import { Actions, ActionType } from './actions';
import {
  IFooter,
  getHomeBtn,
  getNextBtn,
  getPrevBtn,
  getOrderBtn,
  getOrderContentConfirmationBtn,
  getEmptyButtonsGroup,
  getToOrderHandlingBtn,
  getSaveHalfWayBtn,
} from '../../types/footer';
import { ERouterPath } from '../../types';
import { getEmptySidebar, ISidebar, getItemContentPage, getOrderHandlingtPage } from '../../types/side-bar';

export interface INavigationState extends IFooter, ISidebar {
  header: { currentPage: string };
}

export const initialState: INavigationState = {
  header: { currentPage: '' },
  sidebar: {
    clothSelectionBtn: {},
    designSelectionBtn: {},
    sizeCorrectionBtn: {},
    orderDestination: {},
    orderAmount: {},
    orderSettlement: {},
  },
  footer: {
    buttonsGroup: {
      leftBtn: {},
      saveHalfWay: {},
      rightBtn: {},
      nextBtn: {},
      prevBtn: {},
    },
  },
};

export function navigationReducer(state: INavigationState = initialState, action: Actions): INavigationState {
  switch (action.type) {
    case ActionType.HOME_DEFAULT:
      return {
        ...state,
        header: { ...state.header, currentPage: 'Home.page' },
        footer: {
          ...state.footer,
          ...getEmptyButtonsGroup(state.footer.buttonsGroup),
        },
      };
    case ActionType.HOME_WITH_ORDERS:
      return {
        ...state,
        header: { ...state.header, currentPage: 'Home.page' },
        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),

            rightBtn: getOrderContentConfirmationBtn(),
          },
        },
      };
    case ActionType.ORDERS_SEARCH_PAGE_DEFAULT:
      return {
        ...state,
        header: { ...state.header, currentPage: 'OrdersSearchPage.page' },
        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),
            leftBtn: getHomeBtn(),
          },
        },
      };

    case ActionType.CLOTH_SELECTION_DEFAULT:
      return {
        ...state,
        header: { ...state.header, currentPage: 'ClothSelection.page' },

        sidebar: {
          ...getEmptySidebar(state.sidebar),
          clothSelectionBtn: getItemContentPage(ERouterPath.clothSelection, 'active', false),
          designSelectionBtn: getItemContentPage(ERouterPath.designSelection, 'disabled'),
          sizeCorrectionBtn: getItemContentPage(ERouterPath.sizeCorrection, 'default'),
        },

        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),
            leftBtn: getHomeBtn(),
            saveHalfWay: getSaveHalfWayBtn(),
            nextBtn: getNextBtn(ERouterPath.clothSelection, true),
            rightBtn: getOrderContentConfirmationBtn(true),
            prevBtn: { ...state.footer.buttonsGroup.prevBtn, render: false },
          },
        },
      };

    case ActionType.CLOTH_SELECTION_FAILURE:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,

          clothSelectionBtn: { ...state.sidebar.clothSelectionBtn, completed: false },
          designSelectionBtn: { ...state.sidebar.designSelectionBtn, completed: false, className: 'disabled' },
        },
        footer: {
          buttonsGroup: {
            ...state.footer.buttonsGroup,
            nextBtn: { ...state.footer.buttonsGroup.nextBtn, disabled: true, path: ERouterPath.clothSelection },
            rightBtn: { ...state.footer.buttonsGroup.rightBtn, disabled: true },
            prevBtn: { ...state.footer.buttonsGroup.prevBtn, render: false },
          },
        },
      };

    case ActionType.CLOTH_SELECTION_SUCCESS:
      return {
        ...state,
        header: { ...state.header, currentPage: 'ClothSelection.page' },

        sidebar: {
          ...state.sidebar,
          clothSelectionBtn: { ...state.sidebar.clothSelectionBtn, completed: true },
          designSelectionBtn: { ...state.sidebar.designSelectionBtn, className: 'default' },
        },

        footer: {
          ...state.footer,
          buttonsGroup: {
            ...state.footer.buttonsGroup,
            nextBtn: { ...state.footer.buttonsGroup.nextBtn, path: ERouterPath.designSelection, disabled: false },
            prevBtn: { ...state.footer.buttonsGroup.prevBtn, render: false },
            rightBtn: { ...state.footer.buttonsGroup.rightBtn, disabled: true },
          },
        },
      };
    case ActionType.DESIGN_SELECTION_DEFAULT:
      return {
        ...state,
        header: { ...state.header, currentPage: 'ClothSelection.page' },
        sidebar: {
          ...state.sidebar,
          clothSelectionBtn: { ...state.sidebar.clothSelectionBtn, className: 'default' },
          designSelectionBtn: { ...state.sidebar.designSelectionBtn, className: 'active', completed: false },
          sizeCorrectionBtn: { ...state.sidebar.sizeCorrectionBtn, className: 'default' },
        },
        footer: {
          ...state.footer,
          buttonsGroup: {
            ...state.footer.buttonsGroup,
            nextBtn: { ...state.footer.buttonsGroup.nextBtn, path: ERouterPath.designSelection, disabled: true },
            prevBtn: getPrevBtn(ERouterPath.clothSelection),
            rightBtn: { ...state.footer.buttonsGroup.rightBtn, disabled: true },
          },
        },
      };
    case ActionType.DESIGN_SELECTION_SUCCESS:
      return {
        ...state,
        header: { ...state.header, currentPage: 'ClothSelection.page' },
        sidebar: {
          ...state.sidebar,
          clothSelectionBtn: { ...state.sidebar.clothSelectionBtn, className: 'default' },
          designSelectionBtn: { ...state.sidebar.designSelectionBtn, className: 'active', completed: true },
          sizeCorrectionBtn: { ...state.sidebar.sizeCorrectionBtn, className: 'default' },
        },
        footer: {
          ...state.footer,
          buttonsGroup: {
            ...state.footer.buttonsGroup,
            nextBtn: { ...state.footer.buttonsGroup.nextBtn, path: ERouterPath.sizeCorrection, disabled: false },
          },
        },
      };
    case ActionType.SIZE_CORRECTION_DEFAULT:
      return {
        ...state,
        header: { ...state.header, currentPage: 'SizeCorrection.page' },
        sidebar: {
          ...state.sidebar,
          clothSelectionBtn: { ...state.sidebar.clothSelectionBtn, className: 'default' },
          designSelectionBtn: { ...state.sidebar.designSelectionBtn },
          sizeCorrectionBtn: { ...state.sidebar.sizeCorrectionBtn, className: 'active' },
        },
        footer: {
          ...state.footer,

          buttonsGroup: {
            ...state.footer.buttonsGroup,

            nextBtn: { ...state.footer.buttonsGroup.nextBtn, path: ERouterPath.sizeCorrection, disabled: true },
            prevBtn: { ...getPrevBtn(state.footer.buttonsGroup.nextBtn.path!, false, state.sidebar) },
            rightBtn: { ...state.footer.buttonsGroup.rightBtn, disabled: false },
          },
        },
      };
    case ActionType.ADDRESS_DEFAULT:
      return {
        ...state,
        header: { ...state.header, currentPage: 'Order.page' },

        sidebar: {
          ...getEmptySidebar(state.sidebar),
          orderDestination: getOrderHandlingtPage(ERouterPath.address, 'active'),
          orderAmount: getOrderHandlingtPage(ERouterPath.amount, 'disabled'),
          orderSettlement: getOrderHandlingtPage(ERouterPath.settlement, 'disabled'),
        },

        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),
            leftBtn: getOrderContentConfirmationBtn(),
            nextBtn: getNextBtn(ERouterPath.amount, true),
            rightBtn: getOrderBtn(true),
          },
        },
      };

    case ActionType.ADDRESS_SUCCESS: {
      return {
        ...state,
        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),
            leftBtn: getOrderContentConfirmationBtn(),
            nextBtn: getNextBtn(ERouterPath.amount),
            rightBtn: getOrderBtn(true),
          },
        },
      };
    }
    case ActionType.AMOUNT_DEFAULT:
      return {
        ...state,
        header: { ...state.header, currentPage: 'Amount.page' },
        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),
            leftBtn: getOrderContentConfirmationBtn(),
            nextBtn: getNextBtn(ERouterPath.settlement, true),
            prevBtn: getPrevBtn(ERouterPath.address),
            rightBtn: getOrderBtn(true),
          },
        },
      };

    case ActionType.AMOUNT_SUCESS: {
      return {
        ...state,

        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),
            nextBtn: getNextBtn(ERouterPath.privacyPolicy),
            leftBtn: getOrderContentConfirmationBtn(),
            rightBtn: getOrderBtn(true),
          },
        },
      };
    }
    case ActionType.PRIVACY_POLICY_DEFAULT:
      return {
        ...state,
        header: { ...state.header, currentPage: 'PrivacyPolicy.page' },
        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),
            nextBtn: getNextBtn(ERouterPath.settlement, true),
            prevBtn: getPrevBtn(ERouterPath.amount),
            rightBtn: getOrderBtn(true),
          },
        },
      };

    case ActionType.PRIVACY_POLICY_SUCCESS:
      return {
        ...state,
        header: { ...state.header, currentPage: 'PrivacyPolicy.page' },
        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),
            nextBtn: getNextBtn(ERouterPath.settlement),
            prevBtn: getPrevBtn(ERouterPath.amount, false),
            rightBtn: getOrderBtn(true),
          },
        },
      };

    case ActionType.SETTLEMENT_DEFAULT:
      return {
        ...state,
        header: { ...state.header, currentPage: 'Settlement.page' },

        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),
            leftBtn: getOrderContentConfirmationBtn(),
            rightBtn: getOrderBtn(),
            prevBtn: getPrevBtn(ERouterPath.privacyPolicy),
          },
        },
      };
    case ActionType.INVENTORY_SEARCH_DEFAULT:
      return {
        ...state,
        header: { ...state.header, currentPage: 'InventorySearch.page' },
        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),
            leftBtn: getHomeBtn(),
          },
        },
      };
    case ActionType.ORDER_CONTENT_CONFIRMATION_DEFAULT:
      return {
        ...state,
        header: { ...state.header, currentPage: 'OrderContentConfirmation.page' },

        footer: {
          ...state.footer,
          buttonsGroup: {
            ...getEmptyButtonsGroup(state.footer.buttonsGroup),
            leftBtn: getHomeBtn(false),
            rightBtn: getToOrderHandlingBtn(false),
          },
        },
      };
  }

  return state;
}
