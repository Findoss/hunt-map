export interface EditorState {
  isLoadModule: boolean;
  edit: string;
}

export const initialState: EditorState = {
  isLoadModule: false,
  edit: '',
};
