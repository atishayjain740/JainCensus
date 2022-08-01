import { createContext } from 'react';
import { useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  form: {
    basicFormInfo: localStorage.getItem('basicFormInfo')
      ? JSON.parse(localStorage.getItem('basicFormInfo'))
      : {},
    additionalFormInfo: localStorage.getItem('additionalFormInfo')
      ? JSON.parse(localStorage.getItem('additionalFormInfo'))
      : {},
    familyFormInfo: localStorage.getItem('familyFormInfo')
      ? JSON.parse(localStorage.getItem('familyFormInfo'))
      : {},
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'USER_SIGNIN': {
      localStorage.setItem('userInfo', JSON.stringify(action.payload));

      return { ...state, userInfo: action.payload };
    }
    case 'USER_SIGNOUT': {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('basicFormInfo');
      localStorage.removeItem('additionalFormInfo');
      localStorage.removeItem('familyFormInfo');

      return {
        ...state,
        userInfo: null,
        form: { basicFormInfo: {}, additionalFormInfo: {}, familyFormInfo: {} },
      };
    }
    case 'SAVE_FORM_BASIC': {
      localStorage.setItem('basicFormInfo', JSON.stringify(action.payload));

      return {
        ...state,
        form: {
          ...state.form,
          basicFormInfo: action.payload,
        },
      };
    }
    case 'SAVE_FORM_ADDITIONAL': {
      localStorage.setItem(
        'additionalFormInfo',
        JSON.stringify(action.payload)
      );

      return {
        ...state,
        form: {
          ...state.form,
          additionalFormInfo: action.payload,
        },
      };
    }
    case 'SAVE_FORM_FAMILY': {
      localStorage.setItem('familyFormInfo', JSON.stringify(action.payload));

      return {
        ...state,
        form: {
          ...state.form,
          familyFormInfo: action.payload,
        },
      };
    }
    case 'USER_SUBMIT_FORM': {
      var info = {
        ...state.userInfo,
        formSubmitted: JSON.stringify(action.payload),
      };

      localStorage.setItem('userInfo', JSON.stringify(info));
      return {
        ...state,
        userInfo: info,
      };
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
