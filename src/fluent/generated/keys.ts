import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'dca32f56f2a2437d86429db9d8a8bcf6'
                    }
                    'glb-viewer-page': {
                        table: 'sys_ui_page'
                        id: 'cd2ab81df5ec463ab8f116126b9eff21'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '522e07b3c7a84be3a840b079f3d2dd65'
                    }
                    'x_snc_3d_glb_viewe/main': {
                        table: 'sys_ux_lib_asset'
                        id: '98ce9ab8e64a44269b4c9febe502a4ee'
                    }
                    'x_snc_3d_glb_viewe/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: '127223caa9754e3eaa26c0c94b1c9b7c'
                    }
                }
            }
        }
    }
}
