import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import glbViewerPage from '../../client/index.html';

export const glb_viewer_page = UiPage({
  $id: Now.ID['glb-viewer-page'],
  endpoint: 'x_snc_3d_glb_viewe_viewer.do',
  html: glbViewerPage,
  direct: true
});