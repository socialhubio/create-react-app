import createHistory from 'history/createBrowserHistory';
import { getBaseUrl } from 'bananasplit/shared/url';

// Create A Singleton History So We Can Call The Router From Sagas
export default createHistory({ basename: getBaseUrl() });
