/**
 * Which directories under `public/` belong to the builder platform rather than
 * to Ridgework.
 *
 * The sandbox namespaces its own assets under a double underscore — today that
 * is `public/__grok/`, which holds the "add to home screen" tutorial and a Grok
 * logo. `vite.config.ts` already goes to some trouble to keep platform chrome
 * out of `<head>`, but `public/` is copied to the build output wholesale, so
 * those eight files were still being served from ridgework.org.
 *
 * Matching the convention rather than the one name means a future
 * `public/__something/` is caught the day it appears, instead of the day
 * somebody notices a foreign logo on the production site.
 *
 * The files stay on disk. `vite.config.ts` records that the sandbox contract
 * forbids deleting the platform's own files, so this removes them from the
 * deployed output and leaves the working tree alone.
 */

/** A name is platform chrome when it starts with a double underscore. */
export function isPlatformChrome(name) {
  return name.startsWith("__");
}

/** The subset of `public/` entries that must not reach the build output. */
export function chromeEntries(names) {
  return names.filter(isPlatformChrome).sort();
}
