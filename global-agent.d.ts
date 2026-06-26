declare module 'global-agent' {
  export interface GlobalAgentOptions {
    httpProxy?: string;
    httpsProxy?: string;
    socketConnectionTimeout?: number;
    connectionTimeout?: number;
  }

  export function bootstrap(options: GlobalAgentOptions): void;
}
