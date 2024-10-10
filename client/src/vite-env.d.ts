/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_API_URL: string;
  // add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
