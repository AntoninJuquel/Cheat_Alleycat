import React from "react";

const defaultGlobalState = {
    checkpoints: [],
};
const GlobalStateContext = React.createContext(defaultGlobalState);
const DispatchStateContext = React.createContext(undefined);

export const Provider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        (state, newValue) => ({ ...state, ...newValue }),
        defaultGlobalState
    );
    return (
        <GlobalStateContext.Provider value={state}>
            <DispatchStateContext.Provider value={dispatch}>
                {children}
            </DispatchStateContext.Provider>
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => [
    React.useContext(GlobalStateContext),
    React.useContext(DispatchStateContext)
];