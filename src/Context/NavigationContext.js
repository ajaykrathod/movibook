import React, { createContext, useContext, useReducer } from "react";

export const FeatureContext = createContext();

export const ChangeFeature = ({ reducer, initialState, children }) => (
  <FeatureContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </FeatureContext.Provider>
);

export const useFeatureContext = () => useContext(FeatureContext);