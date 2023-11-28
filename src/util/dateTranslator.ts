type TimeUnitLabels = '밀리초' | '초' | '분' | '시간' | '일' | '개월' | '년';

export default function getDateTrans(targetTime: Date): string {
  const targetDate = new Date(targetTime);
  const currentDate = new Date();
  const timeDifference: number = currentDate.getTime() - targetDate.getTime();

  const timeUnits: number[] = [1000, 60, 60, 24, 30, 12];
  const timeUnitLabels: TimeUnitLabels[] = ['밀리초', '초', '분', '시간', '일', '개월', '년'];

  let unitIndex = 0;
  let timeValue = timeDifference;

  while (timeValue >= timeUnits[unitIndex] && unitIndex < timeUnits.length - 1) {
    timeValue /= timeUnits[unitIndex];
    unitIndex++;
  }

  timeValue = Math.round(timeValue);

  if (unitIndex === 0) {
    return '방금 전';
  } else {
    return `${timeValue} ${timeUnitLabels[unitIndex]}전`;
  }
}
