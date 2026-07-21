import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mbtech.aifinanceops',
  appName: 'AI Finance Ops',
  webDir: 'out',
  server: {
    url: 'https://aifinanceops.app',
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;
