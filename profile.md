# Kevin Ramirez

**Full-stack developer & toolmaker** · Montevideo, Uruguay

[Website](https://www.ramirezkevin.dev/) · [GitHub](https://github.com/Kevin-Ramirez127) · [LinkedIn](https://www.linkedin.com/in/kevin-ramirez-silva/)

> I build fast React and Astro interfaces, automate the work behind them, and ship open-source developer tools in Go and Rust.

---

## Profile

I'm a full-stack developer who likes the part after the demo: the interfaces, services and small pieces of automation that make a product hold up in daily use. Over the last 5+ years I've shipped React and Astro frontends, Node services, browser automation and internal tools for teams at Arbusta, Meta and Bridge for Billions.

I move comfortably between the product layer and the plumbing underneath - designing a clean screen in the morning, then wiring the API, the scheduled job or the CLI that keeps it fed. Lately that has meant building open-source developer tools in Go and Rust, and contributing to Rust projects like Postal and Corcho.

**At a glance**

| | |
|---|---|
| Experience | 5+ years building web products and internal tooling |
| Focus | Full-stack web · automation · developer tooling |
| Languages | TypeScript · Go · Rust · Python · Bash |
| Data | PostgreSQL · MongoDB · REST APIs |
| Cloud | AWS · Docker · Vercel · GitHub Actions |
| Open source | 13 public repositories; contributor to Postal, Corcho and LibreCourseUY |
| Location | Montevideo, Uruguay (UTC-3) |

---

## What I do

- **Full-stack web** - React and Astro frontends with TypeScript and Tailwind, backed by Node services and clean REST APIs.
- **Automation** - browser extensions, Google Apps Script, webhooks and CI/CD that remove repetitive work and manual errors.
- **Developer tooling** - Go and Rust CLIs, background daemons and editor plugins built to make everyday workflows faster.
- **Integrations & data** - Meta Conversions API on AWS, third-party APIs, PostgreSQL and MongoDB, with an eye on data quality.
- **Performance & quality** - Web Vitals, accessibility, testing and pragmatic refactors that reduce cost instead of adding it.

---

## Skills

| Area | What I use it for | Tools |
|---|---|---|
| Frontend | Product interfaces, design systems, responsive UI | React, Astro, TypeScript, Tailwind CSS, Redux, Zustand, Ant Design |
| Backend | APIs, services, real-time data | Node.js, Express.js, Go, REST, SSE |
| Automation | Replacing manual workflows and reporting | Chrome extensions, Google Apps Script, GitHub Actions, CI/CD, webhooks |
| Systems | Native tools, daemons, Linux workflows | Rust, Go, Bash, eframe/egui, systemd, X11/Wayland |
| Data | Persistence, analytics, integrations | PostgreSQL, MongoDB, Meta CAPI, OpenAI API |
| Delivery | Shipping and keeping things healthy | Docker, AWS, Vercel, Jest, Cypress, Web Vitals, Git/GitHub |

---

## Experience

### Full Stack Developer (Automation & Process Optimization) · Arbusta

`Oct 2023 - May 2025` · Montevideo, Uruguay · 6-person team

Owned the internal tooling layer for delivery teams: browser extensions, microservices and real-time dashboards that replaced manual QA and reporting.

- Replaced manual SLA checks with real-time tracking across 10+ concurrent projects, giving leads a single source of truth.
- Automated audit-critical workflows, cutting manual errors and making internal and external audits faster to run.
- Designed DOM-capture extensions and bots that streamed interaction data through microservices for ML analysis.
- Built quality-monitoring and process-control tools adopted by delivery teams to catch issues before clients did.

`Chrome extensions` `TypeScript` `JavaScript` `Google Apps Script` `Node.js` `Docker` `AWS` `REST APIs`

### META CAPI Developer · Arbusta - Meta

`Jul 2022 - Sep 2023` · Montevideo, Uruguay · 3-person team

Led the Meta Conversions API Gateway implementation on AWS for client campaigns, from infrastructure and deployment to data-quality debugging.

- Deployed and configured CAPI Gateway on AWS as a repeatable, scalable integration.
- Advised clients and stakeholders on API usage, improving conversion tracking and campaign results.
- Traced and fixed data-collection inconsistencies; documented and standardized the setup for future maintenance.

`CAPI` `TypeScript` `JavaScript` `Facebook API` `AWS`

### Frontend Developer · Bridge for Billions

`Jun 2022 - Sep 2023` · Remote · +10-person team

Optimized and continuously developed an entrepreneurship platform used by founders and mentors, shipping React components and fixing the usability bugs that got in their way.

- Built and refined React.js components with Redux-Saga and Ant Design for visual and functional consistency.
- Sharply reduced backend requests in key modules - faster performance and lower infrastructure cost.
- Fixed user-panel bugs that caused wrong perceptions, increasing trust and satisfaction.

`React` `Redux-Saga` `Ant Design` `CSS`

---

## Selected projects

_Star counts as of November 2026._

### [opencode-telegram](https://github.com/Kevin-Ramirez127/opencode-telegram) · Go · ★ 4

A Go daemon that watches every OpenCode session and sends finished runs, questions and permission requests to allowlisted Telegram chats. Answer from your phone instead of babysitting a terminal. Includes reconnect/backoff, a state machine, a loopback settings API and systemd packaging.

### [gitsion](https://github.com/Kevin-Ramirez127/gitsion) · Go + Astro + MongoDB

A self-hosted feed for the GitHub repositories you care about: pushes, pull requests and issues in one newest-first stream. Public read-only dashboard, token-protected admin, background sync and graceful stale-data handling.

### [r-modals](https://github.com/Kevin-Ramirez127/r-modals) · Rust · ★ 2

Instant, borderless modals for Rust on X11 and Wayland. One call opens a searchable picker with submenus, shortcuts, prefixes, themes and multi-select. Also usable from shell scripts as a dmenu-style menu.

### [quick-bitwarden](https://github.com/Kevin-Ramirez127/quick-bitwarden) · Rust · ★ 3

A background daemon and native picker for the Bitwarden CLI. Caches the vault in memory for instant search, copies a password in one keystroke and scrubs it from clipboard history on the way out.

### [rempkg](https://github.com/Kevin-Ramirez127/rempkg) · Go · ★ 2

One wrapper for pacman, yay, paru, apt and dnf that records exactly what you installed - with tags - in a JSONC file, so dependencies never pollute your list.

### [opencode-tools](https://github.com/Kevin-Ramirez127/opencode-tools) · TypeScript

Plugins that make OpenCode fit the way I work: control the Telegram daemon from the TUI and jump between user messages in long sessions.

---

## Open-source contributions

- **[Postal](https://github.com/emiliano-go/postal)** (Rust, ★ 16) - native WhatsApp client speaking the multi-device protocol. Contributed UI, accessibility and chat-sidebar fixes.
- **[Corcho](https://github.com/emiliano-go/corcho)** (Rust + Qt6) - native canvas for personal development. Worked on website behavior, resize handling, checklists and picture-in-picture windows.
- **[LibreCourseUY / libreblog](https://github.com/LibreCourseUY/libreblog)** (Hugo + GitHub Actions) - community blog with automated deployment. Contributed documentation for the React components course.

---

## How I work

- **Start from the workflow, not the framework.** The best tool is the one that removes a step someone actually takes.
- **Ship the smallest useful version.** Then measure, tighten and document it so the next person can own it.
- **Keep the stack boring where it matters.** Clear data models, predictable APIs and tests around the parts that hurt when they break.
- **Learn in public.** Open source, READMEs and small tools are how I keep sharpening the craft.

---

## Contact

For product work, automation projects or open-source collaboration:

- Website: [ramirezkevin.dev](https://www.ramirezkevin.dev/)
- LinkedIn: [kevin-ramirez-silva](https://www.linkedin.com/in/kevin-ramirez-silva/)
- GitHub: [Kevin-Ramirez127](https://github.com/Kevin-Ramirez127)
