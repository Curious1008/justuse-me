---
title: "Stripping TypeScript Down to JavaScript for a Legacy Project"
summary: "How to convert TypeScript interfaces and typed code into plain JavaScript that works in older environments, without breaking everything."
category: "use-case"
tools: ["typescript-to-js", "js-minifier"]
keywords: ["convert typescript interface to javascript for legacy project", "convert typescript interface to javascript", "typescript to javascript legacy", "transpile typescript", "remove typescript types", "typescript to es5", "legacy javascript compatibility"]
published_at: "2026-04-12"
---
Last month I inherited a project. Classic situation: someone had written a beautifully typed TypeScript codebase, and now it needed to run inside a legacy system that was still on Node 8 and didn't have a build step. No webpack, no `tsc`, nothing. Just raw `.js` files dropped into a folder.

Getting TypeScript to run in that environment meant stripping it down to plain JavaScript. And if you've never done this before, there are a few things that will trip you up.

## What actually needs to change when you convert TypeScript to JavaScript?

The obvious stuff is the type annotations. Things like `name: string` or `count: number` in function signatures just get deleted. JavaScript doesn't understand them and will throw a syntax error if they're there.

But the part people forget is interfaces. TypeScript interfaces exist purely at compile time. They have zero runtime presence. So when you're converting, you don't translate an interface into something else, you just delete it entirely.