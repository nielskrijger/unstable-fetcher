# unstable-fetcher

Reproduces issue for https://github.com/remix-run/remix/issues/5113

Steps:

- clone project
- `$ npm i`
- `$ npm run build && npm run dev`
- Open `http://localhost:3000`

When visiting React will enter an infinite re-render loop and the page will keep loading (tested in Chrome). You might have to force exit the Chrome tab to close it.

If you remove `render` from the dependency array in `/app/routes/index.tsx` it will work as intended.