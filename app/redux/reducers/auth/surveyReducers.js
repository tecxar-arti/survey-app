export const survey = (state = {}, action) => {
  switch (action.type) {
    case 'GET_QUESTIONS': {
      return { ...state, questions: action.payload };
    }
    case 'GET_SURVEY': {
      return { ...state, allSurveys: action.payload };
    }
    case 'CREATE_SURVEY': {
      return { ...state, survey: action.payload };
    }
    case 'UPDATE_STATE': {
      return { ...state, status: action.payload };
    }
    default: {
      return state;
    }
  }
};
