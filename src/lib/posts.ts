import { getCollection } from 'astro:content';
export async function allPublishedPosts() {
  return (await getCollection('posts', ({ data }) => ((!data.draft && !data.demo) || (import.meta.env.DEV && data.demo)) && data.date <= new Date()))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export async function publishedPosts() {
  return (await allPublishedPosts()).filter(post => post.data.listed !== false);
}
export const formatDate = (date: Date) => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
}).format(date);

export const categorySlug = (category: string) => category
  .trim()
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

export async function routablePosts() {
  if (import.meta.env.DEV) return await getCollection('posts');
  return await allPublishedPosts();
}
