export interface Photo {
  id: string;
  slug?: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  user?: {
    name: string;
  };
}

export interface Response {
  total: number;
  total_pages: number;
  results: Photo[];
}
