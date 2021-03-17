declare module 'open-graph-scraper' {
  export interface Image {
    url: string;
    width?: string;
    height?: string;
    type?: string;
  }

  export interface OpenGraphData {
    ogSiteName?: string;
    ogUrl?: string;
    ogImage?: Image;
    ogTitle?: string;
    ogDescription?: string;
    charset?: string;
    requestUrl?: string;
    twitterCard?: string;
    twitterCreator?: string;
    twitterDescription?: string;
    twitterImage?: Image;
    twitterSite?: string;
    success: boolean;
  }

  export interface OpenGraphResponse {
    result: OpenGraphData;
    error: boolean;
    response: streams.PassThrough;
  }

  export interface Options {
    url: string;
    // unsure about this
    timeout?: string | number;
    html?: string;
    blacklist?: string[];
    onlyGetOpenGraphInfo?: boolean;
    ogImageFallback?: boolean;
    customMetaTags?: string[];
    allMedia?: boolean;
    decompress?: boolean;
    followRedirect?: boolean;
    maxRedirects?: number;
    retry?: number;
    headers?: Record<string, string>;
    peekSize?: number;
    agent?: any;
    urlValidatorSettings?: {
      protocols?: string[];
      require_tld?: boolean;
      require_protocol?: boolean;
      require_host?: boolean;
      require_valid_protocol?: boolean;
      allow_underscores?: boolean;
      host_whitelist?: boolean;
      host_blacklist?: boolean;
      allow_trailing_dot?: boolean;
      allow_protocol_relative_urls?: boolean;
      disallow_auth?: boolean;
    };
  }

  export default function (options: Options): Promise<OpenGraphResponse>;
}
