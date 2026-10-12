# Sickly Scientist


## Local preview

Install Node.js 22.12+ and pnpm 11.19.0, then run from this directory:

```sh
pnpm install --frozen-lockfile
pnpm dev --host 127.0.0.1 --port 4322
```

Open http://localhost:4322/. Check Home (recent posts), Archive at /blog/ (all posts), About, and Contact. The development-only article fixture is at http://localhost:4322/blog/style-preview/. It includes code, math, figures, a table, a finding and a sticky contents list. Drafts are not shown in listings or RSS and have no production route.

```sh
sh scripts/rebuild.sh
pnpm preview --host 127.0.0.1 --port 4322
```

The production preview intentionally returns 404 for the draft.

## Content and identity

Edit `src/site.ts` for branding and the dedicated contact email (currently blank). About and Contact copy lives under `src/pages/`. Add Markdown or MDX in `src/content/posts/` with title, description, date, category, tags, and `draft: true` while writing. Set draft to false only after approving publication. Categories are generated from listed published posts; examples are Machine Learning, Genetics, Computational Biology, and Research Notes. `listed: false` hides a published post from listings and RSS without making it private.

Optional `socialImage: /images/example.png` overrides the default share image for a post. Put public share images under `public/images/`. Body images can use the existing Figure component. Finding and Callout components remain available. Comments require a separately configured Disqus shortname and per-post `comments: true`; no external comments load until the visitor requests them. Analytics is an empty integration point in `src/components/Analytics.astro`.

No previous posts have been migrated. Do not publish the styling fixture as scientific content.

## Fresh repository and deployment

There is no copied Git history. Before initializing or making any commit, choose a dedicated Git author name and the exact private noreply email shown in the separate account's GitHub email settings. Do not guess that address. Configure both locally, including disabling inherited commit signing if it identifies another account:

```sh
git init -b main
git config --local user.name "YOUR DEDICATED AUTHOR NAME"
git config --local user.email "YOUR DEDICATED NOREPLY EMAIL"
git config --local commit.gpgsign false
git config --show-origin --get user.name
git config --show-origin --get user.email
```

Only after reviewing the identity and explicitly approving publication: sign in to GitHub as sicklyscientist, create an empty repository named sicklyscientist.github.io (not a fork), and set Settings → Pages → Source to GitHub Actions. Confirm your CLI/SSH credentials select that account. Add its remote, commit, and push main. The included workflow installs locked dependencies, validates, builds, checks output, and uploads dist to Pages. The domain and root base path are fixed in astro.config.mjs. No tracking variables are required.

## Before publishing

- Verify commit author AND committer email and signing identity belong to the dedicated account.
- Review the separate account's profile, avatar, public email, and linked accounts.
- Replace the contact placeholder only with a dedicated address.
- Review future images for EXIF/location/creator fields and visible names, report identifiers, or screenshots of account details.
- Review future articles for distinctive phrases, exact variants, publication details, or links that connect identities. Reusing an article already published elsewhere can make that connection easy to find.
- Draft source is still readable in a public Git repository even though excluded from the built site. Keep sensitive drafts outside a public repository until ready.
- Inspect generated dist, RSS, sitemap, social images, and article metadata before publishing.

No anonymity guarantee is implied: this setup removes direct professional identity links, but biographical details and reused research can still connect identities.
