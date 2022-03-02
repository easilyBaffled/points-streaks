import { createSelector } from "@reduxjs/toolkit";
import { backlogAdapter } from "./entityAdapter.js";
import { ratings } from "./ranking.js";
import { parseAndSort } from "@/features/backlog/feature/parseAndSort/index.js";

export const selectors = backlogAdapter.getSelectors(
	(state) => state?.backlog ?? state
);

const getCategory = (task) => task.replaceAll("#", "").split(" ")[0];

const getCategoryRank = (task) => ratings.category.indexOf(getCategory(task));

selectors.getBacklog = selectors.selectAll;

selectors.getSortedBacklog = createSelector(selectors.getBacklog, (backlog) => {
	return parseAndSort(backlog);
});
