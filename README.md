# 3D GLB Viewer - ServiceNow Application

A ServiceNow application for rendering and viewing GLB (GLTF Binary) 3D model files attached to records in the platform.

## 📋 Overview

This application provides an interactive 3D viewer for GLB files stored as attachments in ServiceNow records. Users can select records from the `x_snc_3gs_viewer_0_3gs_files` table, choose GLB attachments, and view them in a fully interactive 3D environment powered by Three.js.

## ✨ Features

- **🎯 Record Selection** - Browse and select from records in the 3GS Files table
- **📎 Attachment Management** - Automatically detects and lists GLB file attachments
- **🎮 Interactive 3D Viewer** - Full Three.js-powered 3D model rendering with:
  - Orbit controls (rotate, zoom, pan)
  - Automatic model centering and scaling
  - Professional lighting setup (ambient + directional)
  - Shadow rendering support
- **🎨 Modern UI** - Clean React-based interface with loading states and error handling
- **📱 Responsive Design** - Works on different screen sizes
- **🔒 Secure** - Proper ServiceNow authentication and API integration

## 🛠 Technical Stack

- **Frontend Framework:** React 18.2.0
- **3D Engine:** Three.js 0.158.0
- **Platform:** ServiceNow (Fluent DSL)
- **Authentication:** ServiceNow X-UserToken
- **API:** ServiceNow Table API & Attachment API
- **File Format:** GLB (GLTF Binary)

## 🚀 Installation

1. **Deploy the Application**
   ```bash
   now-sdk build
   now-sdk install
   ```

2. **Access the Application**
   - Navigate to: `https://[your-instance].service-now.com/x_snc_3d_glb_viewe_viewer.do`

## 📖 Usage Guide

### Step 1: Select a Record
- Use the "Select a Record" dropdown to choose from available records in the 3GS Files table
- Records are identified by their filename or record ID

### Step 2: Choose a GLB Attachment
- Once a record is selected, the system automatically scans for GLB file attachments
- Select the desired GLB file from the "Select GLB Attachment" dropdown
- File size information is displayed to help with selection

### Step 3: View the 3D Model
- The GLB file will automatically load and render in the 3D viewer
- Use mouse controls to interact with the model:
  - **Left-click + drag:** Rotate the model
  - **Right-click + drag:** Pan the view
  - **Scroll wheel:** Zoom in/out

### 3D Viewer Controls

| Action | Control |
|--------|---------|
| Rotate | Left mouse button + drag |
| Pan | Right mouse button + drag |
| Zoom | Mouse scroll wheel |
| Auto-fit | Model automatically centers and scales |

## 📁 File Structure

```
src/
├── client/                          # Frontend React application
│   ├── app.jsx                      # Main application component
│   ├── index.html                   # HTML entry point
│   ├── main.jsx                     # React bootstrap
│   ├── components/
│   │   ├── GLBViewer.jsx            # Three.js 3D viewer component
│   │   └── GLBViewer.css            # 3D viewer styling
│   ├── services/
│   │   └── GLBFileService.js        # API service for data operations
│   └── utils/
│       └── fields.js                # ServiceNow field utility functions
├── fluent/                          # ServiceNow Fluent DSL definitions
│   ├── index.now.ts                 # Main Fluent exports
│   └── ui-pages/
│       └── glb-viewer.now.ts        # UI Page definition
├── package.json                     # Dependencies and project configuration
└── now.config.json                  # ServiceNow configuration
```

## 🔧 Key Components

### GLBViewer Component
- **Purpose:** Renders GLB files using Three.js
- **Features:** 
  - Automatic model centering and scaling
  - Professional lighting setup
  - Orbit controls for interaction
  - Loading states and error handling
  - Shadow mapping support

### GLBFileService Class
- **Purpose:** Handles all API operations
- **Methods:**
  - `listFiles()` - Fetches records from the 3GS Files table
  - `getFileAttachments(recordId)` - Gets attachments for a specific record
  - `downloadAttachment(attachmentId)` - Downloads GLB file as blob

### UI Page Configuration
- **Endpoint:** `x_snc_3d_glb_viewe_viewer.do`
- **Type:** Direct HTML page with React mounting
- **Authentication:** ServiceNow session-based

## 📊 Data Requirements

### Source Table
- **Table:** `x_snc_3gs_viewer_0_3gs_files`
- **Key Fields:**
  - `u_filename` - Display name for the record
  - `sys_id` - Unique identifier
  - Standard audit fields (created_by, created_on, etc.)

### Attachment Requirements
- **File Format:** GLB (GLTF Binary) files
- **Storage:** ServiceNow attachment system
- **Access:** Must be attached to records in the source table

## 🎨 Styling and UI

The application uses a clean, modern interface with:
- **Color Scheme:** Light background with subtle shadows
- **Layout:** Two-column selection area with full-width viewer
- **Responsive:** Adapts to different screen sizes
- **Feedback:** Loading indicators and error messages
- **Information Panel:** Displays record metadata

## 🔍 Development Notes

### ServiceNow Integration
- Uses ServiceNow Table API with `sysparm_display_value=all` for proper field handling
- Implements proper authentication with `X-UserToken` header
- Follows ServiceNow Fluent DSL patterns for metadata definition

### Three.js Implementation
- Uses GLTFLoader for GLB file parsing
- Implements OrbitControls for user interaction
- Sets up proper lighting with ambient and directional lights
- Handles model scaling and centering automatically
- Includes shadow mapping for enhanced visual quality

### Performance Considerations
- Blob URLs are properly managed and cleaned up
- Model loading includes progress indicators
- Error handling for failed downloads or corrupted files
- Efficient re-rendering when switching between models

## 🚫 Limitations

- **File Format:** Only supports GLB files (not OBJ, FBX, or other 3D formats)
- **File Size:** Limited by ServiceNow attachment size limits
- **Browser Support:** Requires WebGL-capable browsers
- **Concurrent Users:** Performance may vary with multiple simultaneous users

## 🐛 Troubleshooting

### Common Issues

**Model doesn't load:**
- Verify the file is actually a GLB format
- Check file size isn't exceeding ServiceNow limits
- Ensure proper attachment permissions

**3D viewer appears black:**
- Check browser WebGL support
- Verify Three.js dependencies are loaded
- Look for console errors in browser dev tools

**No records appear:**
- Verify the source table contains records
- Check table permissions and ACLs
- Ensure the table name is correct in the service

## 🔄 Future Enhancements

Potential improvements for future versions:
- Support for additional 3D file formats (OBJ, FBX, etc.)
- Advanced lighting controls
- Model annotation capabilities
- Measurement tools
- Export/sharing functionality
- Multiple model comparison view
- Animation playback for animated GLB files

## 📞 Support

For issues or questions:
1. Check the browser console for error messages
2. Verify ServiceNow permissions and table access
3. Ensure GLB files are valid and properly attached
4. Contact your ServiceNow administrator for platform-specific issues

---

**Version:** 1.0.0  
**Platform:** ServiceNow (Fluent DSL 4.x)  
**License:** UNLICENSED