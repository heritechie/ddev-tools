export function formatJson(input) {
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 2);
    return { ok: true, formatted };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
