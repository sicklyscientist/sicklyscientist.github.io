import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publishedPosts } from '../lib/posts';
import { path } from '../lib/urls';
import { site } from '../site';
export async function GET(context: APIContext) {
  return rss({ title: site.title, description: site.description, site: context.site!,
    items: (await publishedPosts()).map(post => ({
      title: post.data.title, description: post.data.description, pubDate: post.data.date,
      link: path(`blog/${post.id}/`), categories: post.data.tags,
    })),
  });
}
