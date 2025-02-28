export const SET_COMPANY_USER = 'SET_COMPANY_USER';
export const FETCH_COMPANY_USERS = 'FETCH_COMPANY_USERS';
export const SET_SELECTED_COMPANY_USER = 'SET_SELECTED_COMPANY_USER';
export const CREATE_COMPANY_USER = 'CREATE_COMPANY_USER';
export const UPDATE_COMPANY_USER = 'UPDATE_COMPANY_USER';
export const DELETE_COMPANY_USER = 'DELETE_COMPANY_USER';
export const FETCH_COMPANY_SUB_USERS = 'FETCH_COMPANY_SUB_USERS';
export const CREATE_COMPANY_SUB_USER = 'CREATE_COMPANY_SUB_USER';
export const SET_SELECTED_COMPANY_SUB_USER = 'SET_SELECTED_COMPANY_SUB_USER';
export const UPDATE_COMPANY_SUB_USER = 'UPDATE_COMPANY_SUB_USER';
export const DELETE_COMPANY_SUB_USER = 'DELETE_COMPANY_SUB_USER';
export const SET_COMPANY_SUB_USERS = 'SET_COMPANY_SUB_USERS';

const initialState = {
  user: null,
  selectedUser: null,
  selectedSubUser: null,
  companies: [],
  subUsers: [],
  total: 0,
  totalPages: 1,
  totalSubUsers: 0,
  totalPagesSubUsers: 1,
};

export function userCompanyReducer(state = initialState, action) {
  var newState = state;

  switch (action.type) {
    case SET_COMPANY_USER:
      newState = { ...state, user: action.payload };
      break;

    case FETCH_COMPANY_USERS:
      return {
        ...state,
        companies: action.payload.users,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
      };

    case SET_SELECTED_COMPANY_USER:
      newState = { ...state, selectedUser: action.payload };
      break;

    case CREATE_COMPANY_USER:
      newState = {
        ...state,
        companies: [action.payload, ...state.companies],
        total: state.total + 1,
      };

      break;
    case UPDATE_COMPANY_USER:
      newState = {
        ...state,
        companies: state.companies.map((user) => (user._id === action.payload._id ? action.payload : user)),
      };

      break;
    case DELETE_COMPANY_USER:
      newState = {
        ...state,
        companies: state.companies.filter((user) => user._id !== action.payload),
        total: state.total - 1,
      };
      break;
    case DELETE_COMPANY_SUB_USER:
      newState = {
        ...state,
        subUsers: state.subUsers.filter((user) => user._id !== action.payload),
        totalSubUsers: state.totalSubUsers - 1,
      };
      break;
    // cases for sub users
    case FETCH_COMPANY_SUB_USERS:
      newState = {
        ...state,
        subUsers: action.payload.users,
        totalSubUsers: action.payload.total,
        totalPagesSubUsers: action.payload.totalPages,
      };
      break;
    case CREATE_COMPANY_SUB_USER:
      newState = {
        ...state,
        subUsers: [action.payload, ...state.subUsers],
        totalSubUsers: state.totalSubUsers + 1,
      };
      break;
    case UPDATE_COMPANY_SUB_USER:
      newState = {
        ...state,
        subUsers: state.subUsers.map((user) => (user._id === action.payload._id ? action.payload : user)),
      };
      break;
    case SET_SELECTED_COMPANY_SUB_USER:
      newState = { ...state, selectedSubUser: action.payload };
      break;
    case SET_COMPANY_SUB_USERS:
      newState = { ...state, subUsers: action.payload };
      break;
    default:
      return newState;
  }
  return newState;
}
