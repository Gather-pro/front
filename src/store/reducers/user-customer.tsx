export const SET_CUSTOMER_USER = 'SET_CUSTOMER_USER ';
export const FETCH_CUSTOMERS_USERS = 'FETCH_CUSTOMERS_USERS';
export const SET_SELECTED_CUSTOMER_USER = 'SET_SELECTED_CUSTOMER_USER';
export const CREATE_CUSTOMER_USER = 'CREATE_CUSTOMER_USER';
export const UPDATE_CUSTOMER_USER = 'UPDATE_CUSTOMER_USER';
export const DELETE_CUSTOMER_USER = 'DELETE_CUSTOMER_USER';
export const FETCH_DASHBOARD_USERS = 'FETCH_DASHBOARD_USERS';
export const FETCH_DASHBOARD_USERS_BY_VIN_NUMBER = 'FETCH_DASHBOARD_USERS_BY_VIN_NUMBER';
export const FETCH_DASHBOARD_USERS_BY_TRACTOR_NUMBER = 'FETCH_DASHBOARD_USERS_BY_TRACTOR_NUMBER';
export const SET_DASHBOARD_USERS = 'SET_DASHBOARD_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_VIN_AUTOCOMPLETE = 'SET_VIN_AUTOCOMPLETE';
export const SET_TRACTOR_AUTOCOMPLETE = 'SET_TRACTOR_AUTOCOMPLETE';
export const CREATE_CUSTOMER_SUB_USER = 'CREATE_CUSTOMER_SUB_USER';
export const FETCH_CUSTOMER_SUB_USERS = 'FETCH_CUSTOMER_SUB_USERS';
export const DELETE_CUSTOMER_SUB_USER = 'DELETE_CUSTOMER_SUB_USER';
export const UPDATE_CUSTOMER_SUB_USER = 'UPDATE_CUSTOMER_SUB_USER';
const initialState = {
  user: null,
  selectedUser: null,
  users: [],
  total: 0,
  totalPages: 1,

  dashboardUsers: [],
  dashboardUsersTotal: 0,
  dashboardUsersTotalPages: 0,

  vinAutocomplete: [],
  tractorAutocomplete: [],

  subUsers: [],
  totalSubUsers: 0,
};

export function userCustomerReducer(state = initialState, action) {
  var newState = state;

  switch (action.type) {
    case SET_CUSTOMER_USER:
      newState = { ...state, user: action.payload };
      break;

    case FETCH_CUSTOMERS_USERS:
      return {
        ...state,
        users: action.payload.users,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
      };

    case SET_SELECTED_CUSTOMER_USER:
      newState = { ...state, selectedUser: action.payload };
      break;

    case CREATE_CUSTOMER_USER:
      newState = {
        ...state,
        users: [action.payload, ...state.users],
        total: state.total + 1,
      };

      break;
    case UPDATE_USER:
      newState = {
        ...state,
        user: action.payload,
      };
      break;

    case UPDATE_CUSTOMER_USER:
      newState = {
        ...state,
        users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)),
        selectedUser: action.payload,
      };
      break;
    case DELETE_CUSTOMER_USER:
      newState = {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        total: state.total - 1,
      };
      break;
    case FETCH_DASHBOARD_USERS:
      newState = {
        ...state,
        dashboardUsers: action.payload.users,
        dashboardUsersTotal: action.payload.total,
        dashboardUsersTotalPages: action.payload.totalPages,
      };
      break;
    case FETCH_DASHBOARD_USERS_BY_VIN_NUMBER:
      newState = {
        ...state,
        dashboardUsers: action.payload.users,
        dashboardUsersTotal: action.payload.total,
        dashboardUsersTotalPages: action.payload.totalPages,
      };
      break;
    case FETCH_DASHBOARD_USERS_BY_TRACTOR_NUMBER:
      newState = {
        ...state,
        dashboardUsers: action.payload.users,
        dashboardUsersTotal: action.payload.total,
        dashboardUsersTotalPages: action.payload.totalPages,
      };
      break;
    case SET_VIN_AUTOCOMPLETE:
      newState = {
        ...state,
        vinAutocomplete: action.payload,
      };
      break;

    case SET_TRACTOR_AUTOCOMPLETE:
      newState = {
        ...state,
        tractorAutocomplete: action.payload,
      };
      break;

    case SET_DASHBOARD_USERS:
      newState = {
        ...state,
        dashboardUsers: action.payload,
      };
      break;
    case CREATE_CUSTOMER_SUB_USER:
      newState = {
        ...state,
        subUsers: [action.payload, ...state.subUsers],
        totalSubUsers: state.totalSubUsers + 1,
      };
      break;
    case FETCH_CUSTOMER_SUB_USERS:
      newState = {
        ...state,
        subUsers: action.payload.users,
        totalSubUsers: action.payload.total,
        totalPagesSubUsers: action.payload.totalPages,
      };
      break;
    case UPDATE_CUSTOMER_SUB_USER:
      newState = {
        ...state,
        subUsers: state.subUsers.map((user) => (user._id === action.payload._id ? action.payload : user)),
      };
      break;
    case DELETE_CUSTOMER_SUB_USER:
      newState = {
        ...state,
        subUsers: state.subUsers.filter((user) => user._id !== action.payload),
        totalSubUsers: state.totalSubUsers - 1,
      };
      break;
    default:
      return newState;
  }
  return newState;
}
