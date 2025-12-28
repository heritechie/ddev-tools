// apps/cli/src/openBrowser.ts
import { spawn } from "node:child_process";
import { platform } from "node:os";

export function openBrowser(url: string) {
  let command: string;
  let args: string[] = [];

  switch (platform()) {
    case "darwin":
      command = "open";
      args = [url];
      break;
    case "win32":
      command = "cmd";
      args = ["/c", "start", "", url];
      break;
    default:
      command = "xdg-open";
      args = [url];
  }

  try {
    const child = spawn(command, args, {
      stdio: "ignore",
      detached: true,
    });

    // 🔒 IMPORTANT: swallow errors
    child.on("error", () => {
      // silently ignore — best effort only
    });

    child.unref();
  } catch {
    // swallow sync errors too
  }
}
