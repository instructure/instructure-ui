# diff-demo (TEMPORARY)

A synthetic `baseline.png` / `actual.png` pair used only to preview the visual
regression report's **diff visualization** while this PR is open.

## Why it exists

This PR renames every captured screenshot with a `-<theme>` suffix
(`alert-dark.png` etc.), so none of them match the old baselines on the
`visual-baselines` branch. The result is a report full of _added_ / _removed_
rows and **zero _changed_ rows** — meaning the reworked pixel-highlight diff
image never renders. This fixture forces one deterministic _changed_ row so the
new rendering can be reviewed in the published CI report.

The two images are identical except for a few localized spots (a recolored
button and icon, a widened text line, and a 1px hairline underline) so the diff
exercises both the dimmed backdrop and the dilated highlight.

## How it's wired in

The `TEMP inject diff-demo fixture` step in
`.github/workflows/visual-regression.yml` copies `baseline.png` into
`.baselines/diff-demo.png` and `actual.png` into `.actual/diff-demo.png` just
before the diff step runs.

## Removing it (before merge)

1. Delete this directory (`regression-test/cypress/diff-demo/`).
2. Delete the `TEMP inject diff-demo fixture` step in
   `.github/workflows/visual-regression.yml`.

## Regenerating the images

The images were produced by a throwaway `pngjs` script; see the PR discussion.
Any two near-identical PNGs with a small localized delta work equally well.
