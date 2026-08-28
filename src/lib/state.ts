import { Transaction, MONTHS, newId } from "./data";

export type View = "dashboard" | "add" | "transactions";

export interface AppState {
  transactions: Transaction[];
  view: View;
  addType: "entrada" | "saida";
  filterMonth: string;
  editingId: string | null;
}

export type Action =
  | { type: "SET_VIEW"; view: View }
  | { type: "SET_ADD_TYPE"; addType: "entrada" | "saida" }
  | { type: "SET_FILTER_MONTH"; month: string }
  | { type: "ADD_TRANSACTION"; txn: Omit<Transaction, "id"> }
  | { type: "UPDATE_TRANSACTION"; txn: Transaction }
  | { type: "DELETE_TRANSACTION"; id: string }
  | { type: "EDIT_TRANSACTION"; id: string | null }
  | { type: "LOAD"; state: AppState };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, view: action.view, editingId: null };
    case "SET_ADD_TYPE":
      return { ...state, addType: action.addType };
    case "SET_FILTER_MONTH":
      return { ...state, filterMonth: action.month };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, { ...action.txn, id: newId() }],
        view: "dashboard",
      };
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.txn.id ? action.txn : t
        ),
        editingId: null,
        view: "dashboard",
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.id),
      };
    case "EDIT_TRANSACTION":
      return { ...state, editingId: action.id, view: action.id ? "add" : state.view };
    case "LOAD":
      return action.state;
    default:
      return state;
  }
}
