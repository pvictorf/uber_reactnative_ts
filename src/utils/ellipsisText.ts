
export function ellipsisText(text: string, limit: number) {
  return text.length > limit ? `${text.substring(0, limit - 3)}...` : text;
}