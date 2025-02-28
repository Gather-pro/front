import { store } from '../store.js';
import {
  isCompanyPhoneNumberExist,
  fetchCompanyUser,
  fetchCompanyUsers,
  createCompanyUser,
  updateCompanyUser,
  deleteCompanyUser,
  searchCompanyUserByVinNumber,
  searchCompanyUserByTractorNumber,
  renewCompanyPolicy,
  cancelCompanyPolicy,
  activateCompanyPolicy,
  searchCompanyUserByIdOrCompanyNumber,
  searchCompanyUserByNameOrCompanyName,
  createCompanySubUser,
  fetchCompanySubUsers,
  updateCompanySubUser,
  deleteCompanySubUser,
  searchCompanySubUserById,
} from '../../api/user-company.js';
import {
  SET_COMPANY_USER,
  FETCH_COMPANY_USERS,
  SET_SELECTED_COMPANY_USER,
  CREATE_COMPANY_USER,
  UPDATE_COMPANY_USER,
  DELETE_COMPANY_USER,
  FETCH_COMPANY_SUB_USERS,
  CREATE_COMPANY_SUB_USER,
  SET_SELECTED_COMPANY_SUB_USER,
  UPDATE_COMPANY_SUB_USER,
  DELETE_COMPANY_SUB_USER,
  SET_COMPANY_SUB_USERS,
} from '../reducers/user-company.jsx';

// Sets the company user in the store.
export const set_user_company = async (currentUser) => {
  if (currentUser == null) {
    store.dispatch({
      type: SET_COMPANY_USER,
      payload: null,
    });
    return;
  }

  try {
    const user = await fetchCompanyUser(currentUser);
    store.dispatch({
      type: SET_COMPANY_USER,
      payload: user,
    });
  } catch (err) {
    console.log('Cannot load user', err);
    throw err;
  }
};

// Activates a company policy.
export const activate_company_policy = async (policyId) => {
  try {
    const res = await activateCompanyPolicy(policyId);
    const user = res.user;
    store.dispatch({
      type: UPDATE_COMPANY_USER,
      payload: user,
    });
  } catch (err) {
    console.log('Cannot activate policy', err);
    throw err;
  }
};

// Sets the selected company user in the store.
export const set_selected_user_company = (user) => {
  store.dispatch({
    type: SET_SELECTED_COMPANY_USER,
    payload: user,
  });
};

// Creates a new company user.
export const create_user_company = async (user) => {
  try {
    const res = await createCompanyUser(user);
    store.dispatch({
      type: CREATE_COMPANY_USER,
      payload: res,
    });

    return res;
  } catch (err) {
    console.log('Cannot create user', err);
    throw err;
  }
};

export const create_sub_user_company = async (user) => {
  try {
    const res = await createCompanySubUser(user);
    store.dispatch({
      type: CREATE_COMPANY_SUB_USER,
      payload: res,
    });

    return res;
  } catch (err) {
    console.log('Cannot create user', err);
    throw err;
  }
};

// Updates an existing company user.
export const update_user_company = async (user) => {
  try {
    const res = await updateCompanyUser(user);
    store.dispatch({
      type: UPDATE_COMPANY_USER,
      payload: res,
    });
  } catch (err) {
    console.log('Cannot update user', err);
    throw err;
  }
};

export const update_company_sub_user = async (user) => {
  try {
    const res = await updateCompanySubUser(user);
    store.dispatch({
      type: UPDATE_COMPANY_SUB_USER,
      payload: res,
    });
  } catch (err) {
    console.log('Cannot update user', err);
    throw err;
  }
};

// Searches for a company user by VIN number.
export const search_user_company_by_vinNumber = async (vinNumber) => {
  try {
    const res = await searchCompanyUserByVinNumber(vinNumber);
    return res;
  } catch (err) {
    console.log('Cannot search machine customer', err);
    throw err;
  }
};

// Searches for a company user by tractor number.
export const search_user_company_by_tractor_number = async (tractorNumber) => {
  try {
    const res = await searchCompanyUserByTractorNumber(tractorNumber);
    return res.user;
  } catch (err) {
    console.log('Cannot search machine customer', err);
    throw err;
  }
};

// Renews a company policy.
export const renew_company_policy = async (policyId) => {
  try {
    const res = await renewCompanyPolicy(policyId);
    const user = res.user;
    store.dispatch({
      type: UPDATE_COMPANY_USER,
      payload: user,
    });
  } catch (err) {
    console.log('Cannot renew policy', err);
    throw err;
  }
};

// Cancels a company policy.
export const cancel_company_policy = async (policyId) => {
  try {
    const res = await cancelCompanyPolicy(policyId);
    const user = res.user;
    store.dispatch({
      type: UPDATE_COMPANY_USER,
      payload: user,
    });
  } catch (err) {
    console.log('Cannot cancel policy', err);
    throw err;
  }
};

// Searches for a company user by ID or company number.
export const search_user_company_by_id_or_company_number = async (idSearchQuery, page, limit, role, type) => {
  try {
    const res = await searchCompanyUserByIdOrCompanyNumber(idSearchQuery, page, limit, role, type);
    store.dispatch({
      type: FETCH_COMPANY_USERS,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot fetch products', err);
    throw err;
  }
};

// Searches for a company user by name or company name.
export const search_user_company_name_or_company_name = async (nameSearchQuery, page, limit, role, type) => {
  try {
    const res = await searchCompanyUserByNameOrCompanyName(nameSearchQuery, page, limit, role, type);
    store.dispatch({
      type: FETCH_COMPANY_USERS,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot fetch products', err);
    throw err;
  }
};

// Fetches company users with pagination.
export const fetch_users_companies = async (page, limit, role, type) => {
  try {
    const res = await fetchCompanyUsers(page, limit, role, type);
    store.dispatch({
      type: FETCH_COMPANY_USERS,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot fetch products', err);
    throw err;
  }
};

// Checks if a company phone number exists.
export const is_company_phone_number_exist = async (phone) => {
  try {
    const res = await isCompanyPhoneNumberExist(phone);
    return res;
  } catch (err) {
    console.log('Cannot check phone number', err);
    throw err;
  }
};

// Deletes a company user by its company number.
export const delete_user_company = async (id) => {
  try {
    const res = await deleteCompanyUser(id);
    if (res) {
      store.dispatch({
        type: DELETE_COMPANY_USER,
        payload: id,
      });
    }
  } catch (err) {
    console.log('Cannot delete user', err);
    throw err;
  }
};

export const delete_sub_user_company = async (id) => {
  try {
    const res = await deleteCompanySubUser(id);
    if (res) {
      store.dispatch({
        type: DELETE_COMPANY_SUB_USER,
        payload: id,
      });
    }
  } catch (err) {
    console.log('Cannot delete user', err);
    throw err;
  }
};

export const fetch_company_sub_users = async (user) => {
  try {
    const res = await fetchCompanySubUsers(user);
    store.dispatch({
      type: FETCH_COMPANY_SUB_USERS,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot fetch sub users', err);
    throw err;
  }
};

export const set_selected_sub_user_company = (subUser) => {
  store.dispatch({
    type: SET_SELECTED_COMPANY_SUB_USER,
    payload: subUser,
  });
};

export const set_sub_users = (subUsers) => {
  store.dispatch({
    type: SET_COMPANY_SUB_USERS,
    payload: subUsers,
  });
};

export const search_company_sub_user_by_id = async (idSearchQuery, page, limit, role) => {
  'search_company_sub_user_by_id', idSearchQuery, page, limit, role;
  try {
    const res = await searchCompanySubUserById(idSearchQuery, page, limit, role);
    store.dispatch({
      type: SET_COMPANY_SUB_USERS,
      payload: res,
    });
  } catch (err) {
    console.log('Cannot fetch products', err);
    throw err;
  }
};
