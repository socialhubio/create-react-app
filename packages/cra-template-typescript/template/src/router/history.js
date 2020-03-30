import createHistory from 'history/createBrowserHistory';

export const getBaseUrl = () => {
  return process.env.BASE_URL;
};


// Create A Singleton History So We Can Call The Router From Sagas
export default createHistory({ basename: getBaseUrl() });
