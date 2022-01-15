import { createEntityAdapter } from "@reduxjs/toolkit";
import { _dynamicChange, _staticChange } from "@/utils";

export const tasksAdapter = createEntityAdapter();
export const staticChange = _staticChange( tasksAdapter );
export const dynamicChange = _dynamicChange( tasksAdapter );
