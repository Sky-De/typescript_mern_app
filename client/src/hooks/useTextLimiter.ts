type LimiterProp = {
  text: string;
  limit: number;
};
export const useTextLimiter = (props: LimiterProp): string => {
  const { limit, text } = props;
  if (text.length < limit) return text;
  return text.slice(0, limit) + " ...";
};
