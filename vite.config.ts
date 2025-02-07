import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from '@arco-plugins/vite-plugin-svgr';
import vitePluginForArco from '@arco-plugins/vite-react';
import setting from './src/settings.json';


// https://vitejs.dev/config/
export default (option) => {

  var env = loadEnv(option.mode, process.cwd());
  console.log('mode', option.mode);
  console.log('env',env);
  return {
    define: {
      'process.env.IS_PREACT': JSON.stringify('true')
    },
    resolve: {
      alias: [{ find: '@', replacement: '/src' }]
    },
    plugins: [
      react(),
      svgrPlugin({
        svgrOptions: {}
      }),
      vitePluginForArco({
        theme: '@arco-themes/react-arco-pro',
        modifyVars: {
          'arcoblue-6': setting.themeColor
        }
      })
    ],
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: option.mode === 'development' ? 'http://localhost:3000' : 'http://youngya.top:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    }
  };
}
;
