import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const pomodoroTimer: ToolPlugin = {
  id: "pomodoro-timer",
  category: "utility",
  name: "Pomodoro Timer",
  description: "Generate a full Pomodoro schedule with work and break periods starting from now.",
  keywords: [
    "pomodoro",
    "pomodoro timer",
    "productivity timer",
    "work break schedule",
    "focus timer",
  ],
  icon: "🍅",

  inputMode: "text",
  textPlaceholder: "Enter number of Pomodoro sessions (default: 4)",
  textButtonLabel: "Generate Schedule",
  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();

    let sessions = 4;
    if (text) {
      const parsed = parseInt(text, 10);
      if (isNaN(parsed) || parsed < 1 || parsed > 20) {
        throw new Error("Please enter a number of sessions between 1 and 20.");
      }
      sessions = parsed;
    }

    const WORK_MIN = 25;
    const SHORT_BREAK_MIN = 5;
    const LONG_BREAK_MIN = 15;
    const LONG_BREAK_EVERY = 4;

    const now = new Date();
    let cursor = now.getTime();

    const fmt = (d: Date) =>
      d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const lines: string[] = [
      `Pomodoro Schedule — ${sessions} session${sessions !== 1 ? "s" : ""}`,
      `Starting at: ${fmt(now)} (${now.toLocaleDateString()})`,
      "",
      "=== Schedule ===",
    ];

    for (let i = 1; i <= sessions; i++) {
      const workStart = new Date(cursor);
      cursor += WORK_MIN * 60 * 1000;
      const workEnd = new Date(cursor);

      lines.push(`Session ${i}: ${fmt(workStart)} → ${fmt(workEnd)}  [Work 25 min]`);

      if (i < sessions) {
        const isLongBreak = i % LONG_BREAK_EVERY === 0;
        const breakMin = isLongBreak ? LONG_BREAK_MIN : SHORT_BREAK_MIN;
        const breakStart = new Date(cursor);
        cursor += breakMin * 60 * 1000;
        const breakEnd = new Date(cursor);
        const breakLabel = isLongBreak ? `Long break ${LONG_BREAK_MIN} min` : `Short break ${SHORT_BREAK_MIN} min`;
        lines.push(`         ${fmt(breakStart)} → ${fmt(breakEnd)}  [${breakLabel}]`);
      }
    }

    const totalEnd = new Date(cursor);
    const totalMs = cursor - now.getTime();
    const totalMin = Math.round(totalMs / 60000);
    const totalH = Math.floor(totalMin / 60);
    const remMin = totalMin % 60;
    const totalStr = totalH > 0 ? `${totalH}h ${remMin}m` : `${remMin}m`;

    lines.push("");
    lines.push("=== Summary ===");
    lines.push(`Finished at:     ${fmt(totalEnd)}`);
    lines.push(`Total duration:  ${totalStr}`);
    lines.push(`Work time:       ${sessions * WORK_MIN} minutes`);

    const shortBreaks = Math.max(0, sessions - 1 - Math.floor((sessions - 1) / LONG_BREAK_EVERY));
    const longBreaks = Math.floor((sessions - 1) / LONG_BREAK_EVERY);
    const breakTime = shortBreaks * SHORT_BREAK_MIN + longBreaks * LONG_BREAK_MIN;
    lines.push(`Break time:      ${breakTime} minutes (${shortBreaks} short, ${longBreaks} long)`);

    return {
      blob: new Blob([lines.join("\n")], { type: "text/plain" }),
      filename: "pomodoro-schedule.txt",
      mimeType: "text/plain",
    };
  },
};

export default pomodoroTimer;
