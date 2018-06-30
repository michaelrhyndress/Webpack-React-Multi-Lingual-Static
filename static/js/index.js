//Styles
import css from "Styles/index.scss"
console.log(__('hey there'));

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install({
  onUpdating: () => {
    console.log('SW Event:', 'onUpdating');
  },
  onUpdateReady: () => {
    console.log('SW Event:', 'onUpdateReady');
    // Tells to new SW to take control immediately
    runtime.applyUpdate();
  },
  onUpdated: () => {
    console.log('SW Event:', 'onUpdated');
    // Reload the webpage to load into the new version
    window.location.reload();
  },

  onUpdateFailed: () => {
    console.log('SW Event:', 'onUpdateFailed');
  }
});