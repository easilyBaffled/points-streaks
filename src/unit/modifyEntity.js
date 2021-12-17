import { createNextState } from "@reduxjs/toolkit";

export function _modifyEntity(initialState) {
  return function modifyEntity(id, updater, state = initialState) {
    return createNextState(state, (s) => {
      updater(s.entities[id]);
    });
  };
}
