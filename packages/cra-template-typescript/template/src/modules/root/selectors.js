import { createSelector } from 'reselect';
import { PermissionTypes } from 'bananasplit/constants/permissions';
import { MEDIA_EDITOR } from 'bananasplit/constants/features';
import {
  getMlProductImpl,
  getMlStorageImpl,
  getMlStorageLimitImpl,
  getMlStorageLimitReachedImpl,
  getMlStorageUsageImpl,
  getMlStorageWarningThresholdReachedImpl
} from 'bananasplit/modules/media-library/selectors';

export const ML_STORAGE_WARNING_LIMIT = 0.95;

export const getBrowserAppVersion = () => process.env.APP_VERSION;

export const getSession = state => state.session;

export const getLocale = createSelector(
  getSession,
  state => state.locale
);

export const getProducts = createSelector(
  getSession,
  state => state.products
);

export const getMlProduct = createSelector(
  getProducts,
  getMlProductImpl
);

export const getMlStorage = createSelector(
  getMlProduct,
  getMlStorageImpl
);

export const getMlStorageLimit = createSelector(
  getMlStorage,
  getMlStorageLimitImpl
);

export const getMlStorageUsage = createSelector(
  getMlStorage,
  getMlStorageUsageImpl
);

// When storage limit reached
export const getMlStorageLimitReached = createSelector(
  getMlStorageLimit,
  getMlStorageUsage,
  getMlStorageLimitReachedImpl
);

// When warning threshold reached. More than 95% space usage
export const getMlStorageWarningThresholdReached = createSelector(
  getMlStorageLimit,
  getMlStorageUsage,
  getMlStorageWarningThresholdReachedImpl
);

export const getPermissions = createSelector(
  getSession,
  (session) => session.permissions || []
);

export const getFeatures = createSelector(
  getSession,
  session => session.features
);

export const getCanUseMediaLibrary = createSelector(
  getPermissions,
  (permissions) => permissions.includes(PermissionTypes.UseMediaLibrary)
);

export const getCanUploadToMediaLibrary = createSelector(
  getPermissions,
  (permissions) => permissions.includes(PermissionTypes.AddToMediaLibrary)
);

export const getCanEditMediaLibrary = createSelector(
  getPermissions,
  (permissions) => permissions.includes(PermissionTypes.MediaLibraryEdit)
);

export const getCanUseMediaEditor = createSelector(
  getPermissions,
  permissions => permissions.includes(PermissionTypes.UseMediaEditor)
);

export const getMediaEditorFeature = createSelector(
  getFeatures,
  features => !!features[MEDIA_EDITOR]
);
