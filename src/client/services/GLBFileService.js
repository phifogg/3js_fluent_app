export class GLBFileService {
  constructor() {
    this.tableName = "x_snc_3gs_viewer_0_3gs_files";
  }

  async listFiles() {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}?sysparm_display_value=all`, {
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      
      const { result } = await response.json();
      return result || [];
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  }

  async getFileAttachments(recordId) {
    try {
      const response = await fetch(`/api/now/attachment?sysparm_query=table_name=${this.tableName}^table_sys_id=${recordId}`, {
        headers: {
          "Accept": "application/json",
          "X-UserToken": window.g_ck
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch attachments');
      }
      
      const { result } = await response.json();
      return result || [];
    } catch (error) {
      console.error('Error fetching attachments:', error);
      throw error;
    }
  }

  async downloadAttachment(attachmentId) {
    try {
      const response = await fetch(`/api/now/attachment/${attachmentId}/file`, {
        headers: {
          "X-UserToken": window.g_ck
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to download attachment');
      }
      
      return await response.blob();
    } catch (error) {
      console.error('Error downloading attachment:', error);
      throw error;
    }
  }
}