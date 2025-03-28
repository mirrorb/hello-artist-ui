/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  appId: 'com.hello-artist.app',
  productName: 'Hello Artist',
  directories: {
    output: 'dist_electron',
    buildResources: 'build'
  },
  files: [
    'frontend/dist/**/*',
    'electron/**/*'
  ],
  mac: {
    category: 'public.app-category.utilities'
  },
  win: {
    target: [
      {
        target: 'portable',
        arch: ['x64']
      }
    ]
  },
  linux: {
    target: ['AppImage'],
    category: 'Utility'
  },
  removePackageScripts: true,
  removePackageKeywords: true,
  compression: 'store'
} 