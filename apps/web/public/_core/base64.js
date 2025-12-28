export function encodeBase64(input) {
  return btoa(unescape(encodeURIComponent(input)));
}

export function decodeBase64(input) {
  try {
    return decodeURIComponent(escape(atob(input)));
  } catch (e) {
    throw new Error("Invalid Base64 input");
  }
}
