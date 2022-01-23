import { createEntityAdapter } from "@reduxjs/toolkit";
import { _dynamicChange, _staticChange } from "@/utils.js";

export const backlogAdapter = createEntityAdapter();
export const staticChange = _staticChange( backlogAdapter );
export const dynamicChange = _dynamicChange( backlogAdapter );
