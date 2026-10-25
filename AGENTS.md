<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Landing page sections live in `src/components/landing/`, composed by `src/routes/index.tsx` — keeps the single route file readable.
- Product demos (scratchpad, sort deck, today lanes) are self-contained client-state components with no backend — they illustrate the app, they are not the app.
- Hopper mascot SVGs are served via Lovable Assets pointers in `src/assets/`; `public/favicon.svg` is a real copy because favicons cannot be pointers.
