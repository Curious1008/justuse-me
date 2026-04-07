---
title: "Cron Schedule Syntax, Explained Field by Field"
summary: "Learn how cron expressions work, what each of the five fields means, and how to write schedules for common automation tasks without guessing."
category: "tutorial"
tools: ["cron-explainer"]
keywords: ["explain cron schedule syntax for automated tasks", "cron schedule syntax", "cron expression", "cron job tutorial", "cron fields explained", "cron syntax guide", "automated task scheduling", "crontab syntax", "cron expression examples"]
published_at: "2026-04-07"
---
# Cron Schedule Syntax, Explained Field by Field

Cron is the Unix scheduling system that runs commands at specified times. It's been around since the 1970s, and the expression format hasn't changed much since. If you've ever looked at something like `0 9 * * 1` and wondered what it means, this guide breaks it down completely.

## What does a cron expression actually look like?

A standard cron expression has five fields, separated by spaces: