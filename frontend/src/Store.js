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
    photoFormInfo: localStorage.getItem('photoFormInfo')
      ? JSON.parse(localStorage.getItem('photoFormInfo'))
      : {},
    membersFormInfo: localStorage.getItem('membersFormInfo')
      ? JSON.parse(localStorage.getItem('membersFormInfo'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'USER_SIGNIN': {
      localStorage.setItem('userInfo', JSON.stringify(action.payload));

      return { ...state, userInfo: action.payload };
    }
    case 'USER_VERIFIED': {
      let info = {
        ...state.userInfo,
        verified: true,
      };

      localStorage.setItem('userInfo', JSON.stringify(info));

      return {
        ...state,
        userInfo: info,
      };
    }
    case 'USER_SIGNOUT': {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('basicFormInfo');
      localStorage.removeItem('additionalFormInfo');
      localStorage.removeItem('familyFormInfo');
      localStorage.removeItem('photoFormInfo');
      localStorage.removeItem('membersFormInfo');

      return {
        ...state,
        userInfo: null,
        form: {
          basicFormInfo: {},
          additionalFormInfo: {},
          familyFormInfo: {},
          photoFormInfo: {},
          membersFormInfo: [],
        },
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
    case 'SAVE_FORM_PHOTO': {
      localStorage.setItem('photoFormInfo', JSON.stringify(action.payload));

      return {
        ...state,
        form: {
          ...state.form,
          photoFormInfo: action.payload,
        },
      };
    }
    case 'USER_SUBMIT_FORM': {
      let info = {
        ...state.userInfo,
        formSubmitted: action.payload.formSubmitted,
        formId: action.payload.formId,
      };

      let basicInfo = {
        ...state.form.basicFormInfo,
        generatedId: JSON.stringify(action.payload.generatedId),
      };

      localStorage.setItem('userInfo', JSON.stringify(info));
      localStorage.setItem('basicFormInfo', JSON.stringify(basicInfo));

      return {
        ...state,
        userInfo: info,
        basicFormInfo: basicInfo,
      };
    }
    case 'SAVE_FORM_BASIC_MEMBER': {
      var membersInfo = localStorage.getItem('membersFormInfo')
        ? JSON.parse(localStorage.getItem('membersFormInfo'))
        : [];

      var additionalInfo = localStorage.getItem('additionalFormInfo')
        ? JSON.parse(localStorage.getItem('additionalFormInfo'))
        : {};

      var familyInfo = localStorage.getItem('familyFormInfo')
        ? JSON.parse(localStorage.getItem('familyFormInfo'))
        : {};

      let basicMembersInfo = {
        basicFormInfo: action.payload,
        additionalFormInfo: additionalInfo,
        familyFormInfo: familyInfo,
        photoFormInfo: '',
        submitted: false,
      };

      let currentMembersInfo = membersInfo[membersInfo.length - 1];
      if (membersInfo.length > 0) {
        if (currentMembersInfo['submitted']) {
          membersInfo.push(basicMembersInfo);
        } else {
          currentMembersInfo = basicMembersInfo;
          membersInfo[membersInfo.length - 1] = currentMembersInfo;
        }
      } else {
        membersInfo.push(basicMembersInfo);
      }

      localStorage.setItem('membersFormInfo', JSON.stringify(membersInfo));

      return {
        ...state,
        form: {
          ...state.form,
          membersFormInfo: membersInfo,
        },
      };
    }
    case 'SAVE_FORM_PHOTO_MEMBER': {
      let membersInfo = localStorage.getItem('membersFormInfo')
        ? JSON.parse(localStorage.getItem('membersFormInfo'))
        : [];

      let currentMembersInfo = membersInfo[membersInfo.length - 1];

      currentMembersInfo['photoFormInfo'] = action.payload;
      membersInfo[membersInfo.length - 1] = currentMembersInfo;

      localStorage.setItem('membersFormInfo', JSON.stringify(membersInfo));

      return {
        ...state,
        form: {
          ...state.form,
          membersFormInfo: membersInfo,
        },
      };
    }
    case 'SAVE_FORM_MEMBER': {
      localStorage.setItem('membersFormInfo', JSON.stringify(action.payload));

      return {
        ...state,
        form: {
          ...state.form,
          membersFormInfo: action.payload,
        },
      };
    }
    case 'USER_SUBMIT_FORM_MEMBER': {
      let membersBasicInfo = {
        ...state.form.membersFormInfo[state.form.membersFormInfo.length - 1]
          .basicFormInfo,
        generatedId: JSON.stringify(action.payload.generatedId),
      };

      let currentMembersInfo = {
        ...state.form.membersFormInfo[state.form.membersFormInfo.length - 1],
        basicFormInfo: membersBasicInfo,
        submitted: action.payload.formSubmitted,
        formId: action.payload.formId,
      };

      /*let membersInfo = {
        ...state.form.membersFormInfo,
        state.form.membersFormInfo[state.form.membersFormInfo.length - 1]: currentMembersInfo
      };*/
      state.form.membersFormInfo[state.form.membersFormInfo.length - 1] =
        currentMembersInfo;
      let membersInfo = state.form.membersFormInfo;

      localStorage.setItem('membersFormInfo', JSON.stringify(membersInfo));

      let membersId = [];
      if (state.userInfo.membersFormId) {
        membersId = state.userInfo.membersFormId;

        if (membersId.length == 0) {
          membersId[0] = action.payload.formId;
        } else {
          membersId[membersId.length - 1] = action.payload.formId;
        }
      } else {
        membersId[0] = action.payload.formId;
      }

      let info = {
        ...state.userInfo,
        membersFormId: membersId,
      };

      localStorage.setItem('userInfo', JSON.stringify(info));

      return {
        ...state,
        membersFormInfo: membersInfo,
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
