
export function ellipsisText(text: string, limit: number) {
  if(!text.length) return '';

  return text.length > limit ? `${text.substring(0, limit - 3)}...` : text;
}