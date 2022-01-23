import { createSelector } from "@reduxjs/toolkit";
import { backlogAdapter } from "./entityAdapter.js";

export const selectors = backlogAdapter.getSelectors(
    ( state ) => state?.backlog ?? state
);

selectors.getBacklog = selectors.selectAll;
