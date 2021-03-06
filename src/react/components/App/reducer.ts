import { ContextProps, ThemeType } from "@Shared/context/model";
import { actions } from "./actions";
import { DispatchType } from "./model";

export function reducer(
  state: ContextProps,
  action: DispatchType
): ContextProps {
  switch (action.type) {
    case actions.ON_UPDATE_THEME: {
      return {
        ...state,
        theme: action.payload as ThemeType
      };
    }
    case actions.ON_NEW_FILE: {
      return {
        ...state,
        openFiles: [
          ...state.openFiles,
          {
            name: action.payload as string,
            unsaved: true
          }
        ],
        totalOpenedFiles: state.totalOpenedFiles + 1
      };
    }
    case actions.ON_CLOSE_FILE: {
      const tabIndex = action.payload as number;
      return {
        ...state,
        openFiles: state.openFiles.filter((_, index) => index !== tabIndex)
      };
    }
    case actions.ON_FILE_SELECT: {
      return {
        ...state,
        currentFile: action.payload as string
      };
    }
    case actions.ON_SAVE_FILE: {
      const file = state.openFiles.find(e => e.name === state.currentFile);
      if (file) {
        file.unsaved = false;
      }
      return {
        ...state,
        openFiles: state.openFiles
      };
    }
    case actions.ON_RENAME_FILE: {
      const file = state.openFiles.find(e => e.name === state.currentFile);
      if (file) {
        file.name = action.payload as string;
      }
      return {
        ...state,
        openFiles: state.openFiles,
        currentFile: action.payload as string
      };
    }
    default:
      return state;
  }
}
