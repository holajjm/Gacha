export const TimeDiff = (inputTime: string) => {
  const now = new Date().getTime();
  const targetTime = new Date(inputTime).getTime();
  const diffTime = now - targetTime;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffDays > 0) return `${diffDays}일 전`;
  else return `${diffHours}시간 전`;
};
