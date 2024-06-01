function DdayCal(targetDateStr) {
  const today = new Date();
  const [year, month, day] = targetDateStr.match(/\d+/g).map(Number);
  const targetDate = new Date(year, month - 1, day);

  // 시간 차이를 밀리초로 계산
  const timeDiff = targetDate.getTime() - today.getTime();

  // 밀리초를 일수로 변환
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (dayDiff === 0) {
    return "오늘";
  } else {
    return `${dayDiff}일 남음`;
  }
}

// 함수와 예제 사용법을 export
export { DdayCal };
