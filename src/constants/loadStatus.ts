type LOAD_STATUS = { loading: boolean, loaded: boolean, error: boolean }

interface Load_Statuses {
    LOADING: LOAD_STATUS;
    LOADED: LOAD_STATUS;
    ERROR: LOAD_STATUS;
}
export const LoadStatuses: Load_Statuses = {
    LOADING: { loading: true, loaded: false, error: false },
    LOADED: { loading: false, loaded: true, error: false },
    ERROR: { loading: false, loaded: false, error: true }
}