export const login = (state = { userRole: null }, action) => {
  switch (action.type) {
    case 'LOGIN_WITH_EMAIL': {
      return { ...state, values: action.payload };
    }
    case 'CREATE_USER': {
      return { ...state, user: action.payload };
    }
    case 'LOGOUT': {
      return { state: null };
    }
    default: {
      return state;
    }
  }
};
