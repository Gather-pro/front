import { store } from '../store.js';
import {
  isCustomerPhoneNumberExist,
  fetchUserCustomer,
  updateCustomerUser,
  createCustomerUser,
  fetchCustomersUsers,
  searchCustomerUserByIdOrCompanyNumber,
  searchCustomerUserByNameOrCompanyName,
  searchUserCustomerByTractorNumber,
  deleteCustomerUser,
  deleteCustomerMachine,
  isMachineExisted,
  searchUserByMachineDetails,
  createCustomerUserWithMachine,
  searchUserCustomerByVinNumber,
  fetchDashboardUsers,
  fetchDashboardUsersByVinNumber,
  fetchDashboardUsersByTractorNumber,
  fetchVinNumAutocomplete,
  fetchTractorNumAutocomplete,
  isCustomerExistByIdAndType,
  getCustomerById,
  createCustomerSubUser,
  fetchCustomerSubUsers,
  deleteCustomerSubUser,
  updateCustomerSubUser,
} from '../../api/user-customer.js';

import {
  SET_CUSTOMER_USER,
  SET_SELECTED_CUSTOMER_USER,
  UPDATE_CUSTOMER_USER,
  CREATE_CUSTOMER_USER,
  FETCH_CUSTOMERS_USERS,
  DELETE_CUSTOMER_USER,
  FETCH_DASHBOARD_USERS,
  FETCH_DASHBOARD_USERS_BY_VIN_NUMBER,
  FETCH_DASHBOARD_USERS_BY_TRACTOR_NUMBER,
  SET_DASHBOARD_USERS,
  SET_VIN_AUTOCOMPLETE,
  SET_TRACTOR_AUTOCOMPLETE,
  CREATE_CUSTOMER_SUB_USER,
  FETCH_CUSTOMER_SUB_USERS,
  DELETE_CUSTOMER_SUB_USER,
  UPDATE_CUSTOMER_SUB_USER,
} from '../reducers/user-customer.jsx';

// Checks if a customer phone number exists.
export const is_customer_phone_number_exist = async (phone) => {
  try {
    const res = await isCustomerPhoneNumberExist(phone);
    return res;
  } catch (err) {
    console.log('Cannot check phone number existence', err);
    throw err;
  }
};

// Sets the user customer in the store.
export const set_user_customer = async (currentUser) => {
  if (currentUser == null) {
    store.dispatch({
      type: SET_CUSTOMER_USER,
      payload: null,
    });
    return;
  }

  try {
    const user = await fetchUserCustomer(currentUser);
    store.dispatch({
      type: SET_CUSTOMER_USER,
      payload: user,
    });
  } catch (err) {
    console.log('Cannot load user', err);
    throw err;
  }
};

export const set_selected_customer_user = async (user) => {
  if (user == null) {
    store.dispatch({
      type: SET_SELECTED_CUSTOMER_USER,
      payload: null,
    });
    return;
  }

  try {
    const fetchedUser = await getCustomerById(user); // Await the promise

    store.dispatch({
      type: SET_SELECTED_CUSTOMER_USER,
      payload: fetchedUser?.foundUser,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    store.dispatch({
      type: SET_SELECTED_CUSTOMER_USER,
      payload: null,
    });
  }
};

// Updates an existing customer user.
export const update_customer_user = async (user) => {
  try {
    const res = await updateCustomerUser(user);
    store.dispatch({
      type: UPDATE_CUSTOMER_USER,
      payload: res,
    });
  } catch (err) {
    console.log('Cannot update user', err);
    throw err;
  }
};

// Creates a new customer user.
export const create_customer_user = async (user) => {
  try {
    const res = await createCustomerUser(user);
    store.dispatch({
      type: CREATE_CUSTOMER_USER,
      payload: res,
    });

    return res;
  } catch (err) {
    console.log('Cannot create user', err);
    throw err;
  }
};

// Fetches customers users with pagination and search query.
export const fetch_customers_users = async (page, limit, role, searchQuery) => {
  try {
    const res = await fetchCustomersUsers(page, limit, role, searchQuery);
    store.dispatch({
      type: FETCH_CUSTOMERS_USERS,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot fetch users', err);
    throw err;
  }
};

// Searches user customer by tractor number with pagination.
export const search_user_customer_by_tractor_number = async (tractorNumSearchQuery, role, page, limit) => {
  try {
    const res = await searchUserCustomerByTractorNumber(tractorNumSearchQuery, role, page, limit);
    store.dispatch({
      type: FETCH_CUSTOMERS_USERS,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot search users by tractor number', err);
    throw err;
  }
};

export const search_user_customer_by_vin_number = async (vinNumberSearchQuery, role, page, limit) => {
  try {
    const res = await searchUserCustomerByVinNumber(vinNumberSearchQuery, role, page, limit);
    store.dispatch({
      type: FETCH_CUSTOMERS_USERS,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot search users by tractor number', err);
    throw err;
  }
};

// Searches user customer by ID or company number with pagination.
export const search_user_customer_by_id_or_company_number = async (idSearchQuery, page, limit, role) => {
  try {
    const res = await searchCustomerUserByIdOrCompanyNumber(idSearchQuery, page, limit, role);
    store.dispatch({
      type: FETCH_CUSTOMERS_USERS,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot search users by ID or company number', err);
    throw err;
  }
};

// Searches user customer by name or company name with pagination.
export const search_user_customer_name_or_company_name = async (nameSearchQuery, role, page, limit) => {
  try {
    const res = await searchCustomerUserByNameOrCompanyName(nameSearchQuery, role, page, limit);
    store.dispatch({
      type: FETCH_CUSTOMERS_USERS,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot search users by name or company name', err);
    throw err;
  }
};

// Deletes a customer user by its ID.
export const delete_customer_user = async (userId) => {
  try {
    const res = await deleteCustomerUser(userId);
    if (res) {
      store.dispatch({
        type: DELETE_CUSTOMER_USER,
        payload: userId,
      });
    }
  } catch (err) {
    console.log('Cannot delete user', err);
    throw err;
  }
};

// Deletes a customer machine by user ID and machine ID.
export const delete_customer_machine = async (userId, machineId) => {
  try {
    const res = await deleteCustomerMachine(userId, machineId);
    if (res) {
      store.dispatch({
        type: UPDATE_CUSTOMER_USER,
        payload: res.user,
      });
    }
  } catch (err) {
    console.log('Cannot delete machine', err);
    throw err;
  }
};

// Checks if a machine exists by its tractor number.
export const is_machine_existed = async (tractorNumber) => {
  try {
    const res = await isMachineExisted(tractorNumber);
    return res;
  } catch (err) {
    console.log('Cannot check machine existence', err);
    throw err;
  }
};

// Searches user by machine details (tractor number and VIN number).
export const search_user_by_machine_details = async (tractorNumber, vinNumber) => {
  try {
    const res = await searchUserByMachineDetails(tractorNumber, vinNumber);
    return res;
  } catch (err) {
    console.log('Cannot search by machine details', err);
    throw err;
  }
};

// Creates a customer user with machine details.
export const create_customer_user_with_machine = async (user) => {
  try {
    const res = await createCustomerUserWithMachine(user);
    store.dispatch({
      type: CREATE_CUSTOMER_USER,
      payload: res,
    });

    return res;
  } catch (err) {
    console.log('Cannot create user with machine', err);
    throw err;
  }
};

// Fetches dashboard users with pagination and search query.
export const fetch_dashboard_users = async (page, limit, searchQuery) => {
  try {
    const res = await fetchDashboardUsers(page, limit, searchQuery);
    store.dispatch({
      type: FETCH_DASHBOARD_USERS,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot fetch dashboard users', err);
    throw err;
  }
};

// Fetches dashboard users with pagination and search query.
export const fetch_dashboard_users_by_vin_number = async (page, limit, vinNumber) => {
  try {
    const res = await fetchDashboardUsersByVinNumber(page, limit, vinNumber);
    store.dispatch({
      type: FETCH_DASHBOARD_USERS_BY_VIN_NUMBER,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot fetch dashboard users by VIN number', err);
    throw err;
  }
};

// Fetches dashboard users with pagination and search query.
export const fetch_dashboard_users_by_tractor_number = async (page, limit, tractorNumber) => {
  try {
    const res = await fetchDashboardUsersByTractorNumber(page, limit, tractorNumber);
    store.dispatch({
      type: FETCH_DASHBOARD_USERS_BY_TRACTOR_NUMBER,
      payload: {
        users: res.users,
        total: res.total,
        totalPages: res.totalPages,
      },
    });
  } catch (err) {
    console.log('Cannot fetch dashboard users by tractor number', err);
    throw err;
  }
};

export const set_dashboard_users = () => {
  store.dispatch({
    type: SET_DASHBOARD_USERS,
    payload: [],
  });
};

export const fetch_customer_vin_autocomplte = async (role, vinNumber) => {
  try {
    const res = await fetchVinNumAutocomplete(role, vinNumber);
    store.dispatch({
      type: SET_VIN_AUTOCOMPLETE,
      payload: res,
    });
  } catch (error) {
    console.error('error', error);
    // Handle error appropriately
  }
};

export const fetch_customer_tractor_autocomplte = async (role, tractorNumber) => {
  try {
    const res = await fetchTractorNumAutocomplete(role, tractorNumber);
    store.dispatch({
      type: SET_TRACTOR_AUTOCOMPLETE,
      payload: res,
    });
  } catch (error) {
    console.error('error', error);
    // Handle error appropriately
  }
};

export const reset_customer_autocomplete_options = (role, type) => {
  if (type === 'vin' && role === 'customer') {
    store.dispatch({
      type: SET_VIN_AUTOCOMPLETE,
      payload: [],
    });
  } else if (type === 'tractor' && role === 'customer') {
    store.dispatch({
      type: SET_TRACTOR_AUTOCOMPLETE,
      payload: [],
    });
  }
};

export const is_customer_exist_by_id_and_type = async (userId, customerType) => {
  try {
    const res = isCustomerExistByIdAndType(userId, customerType);
    return res;
  } catch (error) {
    console.error('Error checking if customer exists:', error);
  }
};

export const create_sub_user_customer = async (user) => {
  try {
    const res = await createCustomerSubUser(user);
    store.dispatch({
      type: CREATE_CUSTOMER_SUB_USER,
      payload: res,
    });

    return res;
  } catch (err) {
    console.log('Cannot create user', err);
    throw err;
  }
};

export const delete_sub_user_customer = async (id) => {
  try {
    const res = await deleteCustomerSubUser(id);
    if (res) {
      store.dispatch({
        type: DELETE_CUSTOMER_SUB_USER,
        payload: id,
      });
    }
  } catch (err) {
    console.log('Cannot delete user', err);
    throw err;
  }
};

export const update_customer_sub_user = async (user) => {
  try {
    const res = await updateCustomerSubUser(user);
    store.dispatch({
      type: UPDATE_CUSTOMER_SUB_USER,
      payload: res,
    });
  } catch (err) {
    console.log('Cannot update user', err);
    throw err;
  }
};

export const fetch_customer_sub_users = async (user) => {
  try {
    const res = await fetchCustomerSubUsers(user);
    store.dispatch({
      type: FETCH_CUSTOMER_SUB_USERS,
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
