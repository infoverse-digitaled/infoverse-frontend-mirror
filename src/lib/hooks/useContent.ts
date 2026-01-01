import useSWR from 'swr';
import { apiClient } from '@/lib/api/client';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  type: 'BLOG' | 'NURTURED';
  published: boolean;
  publishedAt?: string;
  author: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface PostsResponse {
  posts: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface PostResponse {
  data: BlogPost;
}

const fetcher = async (url: string) => {
  const res = await apiClient.get(url);
  return res.data.data;
};

/**
 * Hook to fetch all published posts
 */
export function usePosts(type?: 'BLOG' | 'NURTURED', page = 1, limit = 10) {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const { data, error, isLoading, mutate } = useSWR<PostsResponse>(
    `/content/posts?${params.toString()}`,
    fetcher,
    {
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

/**
 * Hook to fetch a single post by slug
 */
export function usePost(slug: string | null) {
  const { data, error, isLoading, mutate } = useSWR<BlogPost>(
    slug ? `/content/posts/${slug}` : null,
    fetcher,
    {
      dedupingInterval: 60000,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

export default { usePosts, usePost };
