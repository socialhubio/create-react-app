import { createActions } from 'reduxsauce';

export default createActions({
    apiHasStarted: ['time'],
    apiHasFinished: ['time'],
    apiProgress: ['progress'],
    apiError: ['code', 'status', 'message', 'data'],
    fetchSettings: null,
    setSession: ['session']
});
