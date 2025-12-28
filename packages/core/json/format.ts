export type FormatResult =
  | { ok: true; formatted: string }
  | { ok: false; error: string };

export function formatJson(input: string, indent = 2): FormatResult {
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, indent);
    return { ok: true, formatted };
  } catch (err) {
    return {
      ok: false,
      error: (err as Error).message,
    };
  }
}
