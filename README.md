# akechi!!!

## Table of Contents

- [Starting and Stopping the Development Server](#starting-and-stopping-the-development-server)
- [Running Linters](#running-linters)
- [Adding a New Page](#adding-a-new-page)
- [Updating the Site](#updating-the-site)
    - [Commit Message Format](#commit-message-format)
- [Inline vs Component](#inline-vs-component)

## Starting and Stopping the Development Server

```bash
$ npm run dev
```

To stop the dev server, go into the terminal and type `q` and hit enter.

## Running Linters

```bash
$ npm run lint
```

## Adding a New Page

For a main page, use this template:

```astro
---
import MainLayout from '$/layouts/MainLayout.astro';
---

<MainLayout>
    <!-- content goes here -->
</MainLayout>
```

For unstyled pages (e.g. shrines), use this template:

```astro
---
import Base from '$/layouts/Base.astro';
---

<Base>
    <!-- content goes here -->
</Base>
```

To create a new layout, create a new file in `src/layouts`. As an example:

```astro
---
// src/layouts/StinkyLayout.astro;
import Base from '$/layouts/Base.astro';
---

<Base>
    <header>
        <h1>Stinky cheese</h1>
    </header>
    <main>
        <!-- ↓ content will appear here -->
        <slot />
    </main>
    <footer>
        <p>muehehehe</p>
    </footer>
</Base>
```

To use it:

```astro
---
import StinkyLayout from '$/layouts/StinkyLayout.astro';
---

<StinkyLayout>
    <p>meow meow</p>
</StinkyLayout>

<!--
results in:
<Base>
    <header>
        <h1>Stinky cheese</h1>
    </header>
    <main>
        <p>meow meow</p>
    </main>
    <footer>
        <p>muehehehe</p>
    </footer>
</Base>
-->
```

## Updating the Site

Most of the time, you want to be in the `dev` branch. All of the commits you create will want to go there. Once you make enough updates and you want to push them to the site, follow these steps:

1. Switch to `main`
2. Merge `dev` into `main` using:
```bash
$ git merge dev
```
3. Push branch (usually using "Sync Changes")
4. Switch back to `dev`

Remember, every time you make a commit, make sure you're doing it inside `dev`.

### Commit Message Format

Commit messages with `fix:`, `chore:`, etc. are part of the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard, with additional types from the [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type). The ones most often used are:

- `feat:` new feature
- `fix:` bugfixes
- `build:` `package.json` changes when adding new dependencies with `npm install <package>`
- `docs:` updates to `README.md` or other documentation
- `refactor:` code reorganization, not a `fix` or a `feast`
- `style:` changes that don't affect the code at all (whitespace, linting, missing semi-colons, etc)
    - `chore:` is also used to signify linting (and other miscellaneous tasks), though is no longer recommended by Angular due to overuse

## Inline vs Component

1. If you're copying HTML/CSS from an external snippet, put it into a component.
2. If you're writing a reusable snippet (e.g. a button or a table), consider putting it into a component depending on if you might reuse it elsewhere.
3. Otherwise, try writing it inline first. If it makes the file grow too long (>200 lines or so), then extract it into a component.

