export function encodeBase64(input: string): string {
  return Buffer.from(input, "utf-8").toString("base64");
}

export function decodeBase64(input: string): string {
  return Buffer.from(input, "base64").toString("utf-8");
}
