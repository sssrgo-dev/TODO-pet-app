import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(preloadedState) {
  const enhanceWithMiddleWear = applyMiddleware(thunk);

  const composedEnhancesWithDevTools = composeWithDevTools(
    enhanceWithMiddleWear
  );

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancesWithDevTools
  );
  return store;
}
