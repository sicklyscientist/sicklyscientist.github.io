export function path(url = ''): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}
export function absolute(url: string, origin: URL): string {
  return /^https?:\/\//.test(url) ? url : new URL(path(url), origin).href;
}
