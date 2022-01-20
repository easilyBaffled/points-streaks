import { getFeatureList } from "../getFeatureList.js";

export const sliceConfig = {
    actions: function ({ needsEntities, sliceName, featureName }) {
        const sliceIndex = `export * from './initialState';
		export * from './reducer';
		export * from './selectors';
		${needsEntities ? "export * from './entity'" : ""}`;
        const entityAdapterImport = needsEntities
            ? `import { ${sliceName}Adapter } from "./entityAdapter";`
            : "";

        const actions = [
            {
                path: `src/features/${featureName}/store/${sliceName}/index.js`,
                template: sliceIndex,
                type: "add"
            },
            {
                path: `src/features/${featureName}/store/${sliceName}/initialState.js`,
                template: "export const initialState = null",
                type: "add"
            },
            {
                path: `src/features/${featureName}/store/${sliceName}/reducer.js`,
                template: `
                	import { createSlice } from "@reduxjs/toolkit";
                	import { initialState } from './initialState';
                	${entityAdapterImport}
					export const slice = createSlice({
						initialState,
						name: "${sliceName}",
						reducers: {}
					});
                `.replace(/(^\s+)/gm, ""),
                type: "add"
            },
            {
                path: `src/features/${featureName}/store/${sliceName}/selectors.js`,
                template: `
                	import { createSelector } from "@reduxjs/toolkit";
					${entityAdapterImport}
                `.replace(/(^\s+)/gm, ""),
                type: "add"
            }
        ];

        return needsEntities
            ? actions.concat({
                  path: `src/features/${featureName}/store/${sliceName}/entityAdapter.js`,
                  template: `
					import { createEntityAdapter } from "@reduxjs/toolkit";
					import { _dynamicChange, _staticChange } from "@/utils";

					export const ${sliceName}Adapter = createEntityAdapter();
					export const staticChange = _staticChange( ${sliceName}Adapter );
					export const dynamicChange = _dynamicChange( ${sliceName}Adapter );
				`.replace(/(^\s+)/gm, ""),
                  type: "add"
              })
            : actions;
    },
    description: "Slice Generator",
    prompts: [
        {
            message: "Slice Name",
            name: "sliceName",
            type: "input"
        },
        {
            choices: getFeatureList(),
            message: "Feature Name",
            name: "featureName",
            type: "rawlist"
        },
        {
            message: "Does this needs entities",
            name: "needsEntities",
            type: "confirm"
        }
    ]
};
