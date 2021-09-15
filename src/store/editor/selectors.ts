import type { RootState } from '../index';

export const getEditor = (state: RootState) => state.editor;

export const selectIsLoadModule = (state: RootState) => getEditor(state).isLoadModule;
export const selectEdit = (state: RootState) => getEditor(state).edit;
