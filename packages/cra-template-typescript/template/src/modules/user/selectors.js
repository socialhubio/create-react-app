import { createSelector } from 'reselect';
import { getSession } from 'bananasplit/modules/session/selectors';

export const getUsersStore = state => state.users;

export const getUsers = createSelector(
  getUsersStore,
  state => state.entities
);

export const getUser = (userId) => {
  return createSelector(
    [getUsers],
    (users) => users.find((user) => user.id === userId)
  );
};

export const getAuthenticatedUserId = createSelector(
  getSession,
  session => session.userId
);

export const getAuthenticatedUser = createSelector(
  getSession, getUsers,
  (session, users) => {
    const user = users.find(usr => usr.id === session.userId);
    return { ...user, ...session };
  }
);
