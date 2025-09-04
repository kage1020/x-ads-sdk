/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONSUMER_KEY?: string;
  readonly VITE_CONSUMER_SECRET?: string;
  readonly VITE_ACCESS_TOKEN?: string;
  readonly VITE_ACCESS_TOKEN_SECRET?: string;
  readonly VITE_ENVIRONMENT?: string;
  readonly VITE_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
