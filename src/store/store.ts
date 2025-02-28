import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { userCompanyReducer } from '../store/reducers/user-company.jsx';
import { userCustomerReducer } from '../store/reducers/user-customer.jsx';

// Combine all reducers
const rootReducer = combineReducers({
  user_customer_module: userCustomerReducer,
  user_company_module: userCompanyReducer,
});

// Setup Redux DevTools Extension or use fallback
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Define any middleware you need (e.g., thunk, logger, etc.)
const middleware = [];

// Create the store with middleware and enhancers
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

// Optional: Log the store state changes
store.subscribe(() => {
  // console.log('Store state changed:', store.getState());
});
