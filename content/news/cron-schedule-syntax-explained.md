---
title: "Cron Schedule Syntax: Reading and Writing Time Expressions"
summary: "Learn how to read and write cron expressions for scheduling automated tasks, with examples for common intervals and edge cases."
category: "tutorial"
tools: ["cron-explainer"]
keywords: ["explain cron schedule syntax for automated tasks", "cron syntax", "cron expression", "cron schedule", "task scheduling", "cron format", "automated tasks", "cron examples"]
published_at: "2026-04-08"
---
Cron expressions control when automated tasks run on servers, in CI/CD pipelines, and in cloud platforms. A single misplaced asterisk can make a job run every minute instead of once daily, potentially costing hundreds in compute fees or flooding a database with duplicate entries.

The syntax looks cryptic at first—`0 3 * * 1` or `*/15 * * * *`—but follows a consistent five-field pattern that becomes readable once you understand the structure.

## What do the five fields in a cron expression mean?

Standard cron syntax uses five fields separated by spaces: