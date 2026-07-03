# Kaede — Discord bot landing site

A static site (no build step) for a Discord bot landing page, in the same
spirit as fang-bot.vercel.app: hero, live stats, a tabbed feature panel, a
full commands directory with search, and legal pages.

## Customize it

Open **`config.js`** and edit four lines:

```js
inviteUrl: "https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID",
supportUrl: "https://discord.gg/YOUR_INVITE_CODE",
voteUrl: "https://top.gg/bot/YOUR_CLIENT_ID/vote",
clientId: "YOUR_CLIENT_ID",
```

Every "Invite," "Support," and "Vote" button across the site pulls from
these four values automatically.

Then swap in your own:
- Bot name — find/replace "Kaede" across the `.html` files
- Stats — the four numbers in the hero (`index.html`)
- Commands — edit or add rows in `commands.html` and the tab panels in `index.html`
- Legal text — `terms.html`, `privacy.html`, `guidelines.html` are placeholders; replace with real policies before launch

## Deploy to Vercel

**Option A — Vercel CLI**
```bash
npm i -g vercel
cd nyx-site
vercel
```
Follow the prompts (link or create a project). It's a static site, so no
build command or output directory settings are needed — Vercel serves the
files as-is.

**Option B — GitHub + Vercel dashboard**
1. Push this folder to a new GitHub repo.
2. Go to vercel.com → Add New → Project → import the repo.
3. Framework preset: "Other" (or leave auto-detected). No build command needed.
4. Deploy.

**Option C — drag and drop**
Go to vercel.com/new, and drag the `nyx-site` folder onto the page.

## File structure

```
nyx-site/
├── index.html       Home page
├── commands.html     Full command directory with search/filter
├── terms.html
├── privacy.html
├── guidelines.html
├── style.css         All design tokens + styles
├── script.js         Starfield canvas, tabs, mobile nav, command search
├── config.js         Your bot's invite/support/vote links (edit this)
└── vercel.json
```
