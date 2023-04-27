import { createContext } from 'react'
import ListReducer from './ListReducer'
import { useReducer } from 'react'

const INITIAL_STATE = {
  lists: [],
  isFetching: false,
  error: false,
}

export const ListContext = createContext(INITIAL_STATE)

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, INITIAL_STATE)
  console.log(state.lists)

  return (
    <ListContext.Provider
      value={{
        lists: state.lists,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ListContext.Provider>
  )
}
