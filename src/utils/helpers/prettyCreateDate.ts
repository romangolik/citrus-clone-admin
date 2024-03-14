export function prettyCreateDate(createDateString: string): string {
  const MONTH_NAMES = [
    "Січ.",
    "Лют.",
    "Бер.",
    "Квіт.",
    "Трав.",
    "Черв.",
    "Лип.",
    "Серп.",
    "Вер.",
    "Жовт.",
    "Лист.",
    "Груд.",
  ];

  const currentDate = new Date();
  const currentDateDay = currentDate.getDate();
  const currentDateMonth = currentDate.getMonth();
  const currentDateYear = currentDate.getFullYear();

  const createDate = new Date(createDateString);
  const createDateDay = createDate.getDate();
  const createDateMonth = createDate.getMonth();
  const createDateYear = createDate.getFullYear();

  const isToday =
    currentDateDay === createDateDay &&
    currentDateMonth === createDateMonth &&
    currentDateYear === createDateYear;

  if (isToday) {
    const formatTime = (time: number) => `0${time}`.slice(-2);

    const formatedHours = formatTime(createDate.getHours());
    const formatedMinutes = formatTime(createDate.getMinutes());

    return `Сьогодні о ${formatedHours}:${formatedMinutes}`;
  }

  const isCurrentYear = currentDateYear === createDateYear;

  const monthDay = `${createDate.getDate()} ${
    MONTH_NAMES[createDate.getMonth()]
  }`;

  if (isCurrentYear) {
    return monthDay;
  }

  return `${monthDay}, ${createDate.getFullYear()}`;
}
