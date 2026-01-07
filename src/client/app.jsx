import React, { useEffect, useState, useMemo } from 'react';
import { GLBFileService } from './services/GLBFileService.js';
import GLBViewer from './components/GLBViewer.jsx';
import { display, value } from './utils/fields.js';

export default function App() {
  const service = useMemo(() => new GLBFileService(), []);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [glbUrl, setGlbUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load files on component mount
  useEffect(() => {
    service.listFiles()
      .then(setFiles)
      .catch(error => console.error('Error loading files:', error));
  }, [service]);

  // Load attachments when a file is selected
  useEffect(() => {
    if (selectedFile) {
      setLoading(true);
      service.getFileAttachments(value(selectedFile.sys_id))
        .then(attachments => {
          setAttachments(attachments);
          // Auto-select first GLB attachment if available
          const glbAttachment = attachments.find(att => 
            att.file_name?.toLowerCase().endsWith('.glb')
          );
          if (glbAttachment) {
            setSelectedAttachment(glbAttachment);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading attachments:', error);
          setLoading(false);
        });
    } else {
      setAttachments([]);
      setSelectedAttachment(null);
      setGlbUrl(null);
    }
  }, [selectedFile, service]);

  // Load GLB when attachment is selected
  useEffect(() => {
    if (selectedAttachment) {
      setLoading(true);
      service.downloadAttachment(selectedAttachment.sys_id)
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setGlbUrl(url);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error downloading GLB:', error);
          setLoading(false);
        });
    } else {
      if (glbUrl) {
        URL.revokeObjectURL(glbUrl);
      }
      setGlbUrl(null);
    }

    // Cleanup blob URL on unmount or URL change
    return () => {
      if (glbUrl) {
        URL.revokeObjectURL(glbUrl);
      }
    };
  }, [selectedAttachment, service]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setSelectedAttachment(null);
  };

  const handleAttachmentSelect = (attachment) => {
    setSelectedAttachment(attachment);
  };

  const glbAttachments = attachments.filter(att => 
    att.file_name?.toLowerCase().endsWith('.glb')
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>3D GLB File Viewer</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {/* File Selection */}
        <div style={{ flex: '1' }}>
          <h3>Select a Record</h3>
          {files.length === 0 ? (
            <p>No files found in the system.</p>
          ) : (
            <select 
              value={selectedFile ? value(selectedFile.sys_id) : ''}
              onChange={(e) => {
                const file = files.find(f => value(f.sys_id) === e.target.value);
                handleFileSelect(file);
              }}
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">-- Select a file record --</option>
              {files.map(file => (
                <option key={value(file.sys_id)} value={value(file.sys_id)}>
                  {display(file.u_filename) || `Record ${value(file.sys_id).slice(0, 8)}`}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Attachment Selection */}
        <div style={{ flex: '1' }}>
          <h3>Select GLB Attachment</h3>
          {selectedFile ? (
            glbAttachments.length === 0 ? (
              <p>No GLB attachments found for this record.</p>
            ) : (
              <select 
                value={selectedAttachment ? selectedAttachment.sys_id : ''}
                onChange={(e) => {
                  const attachment = glbAttachments.find(att => att.sys_id === e.target.value);
                  handleAttachmentSelect(attachment);
                }}
                style={{ width: '100%', padding: '8px' }}
              >
                <option value="">-- Select a GLB file --</option>
                {glbAttachments.map(attachment => (
                  <option key={attachment.sys_id} value={attachment.sys_id}>
                    {attachment.file_name} ({Math.round(attachment.size_bytes / 1024)} KB)
                  </option>
                ))}
              </select>
            )
          ) : (
            <p>Please select a record first.</p>
          )}
        </div>
      </div>

      {/* 3D Viewer */}
      <div>
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Loading...
          </div>
        )}
        
        {glbUrl && !loading && (
          <div>
            <h3>3D Model: {selectedAttachment?.file_name}</h3>
            <GLBViewer glbUrl={glbUrl} width={800} height={600} />
          </div>
        )}
        
        {!glbUrl && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            border: '2px dashed #ddd',
            borderRadius: '8px',
            color: '#666'
          }}>
            Select a record and GLB attachment to view the 3D model
          </div>
        )}
      </div>

      {/* File Information */}
      {selectedFile && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '5px' }}>
          <h4>Record Information</h4>
          <p><strong>Filename:</strong> {display(selectedFile.u_filename)}</p>
          <p><strong>Created:</strong> {display(selectedFile.sys_created_on)}</p>
          <p><strong>Created By:</strong> {display(selectedFile.sys_created_by)}</p>
          <p><strong>Total Attachments:</strong> {attachments.length}</p>
          <p><strong>GLB Files:</strong> {glbAttachments.length}</p>
        </div>
      )}
    </div>
  );
}