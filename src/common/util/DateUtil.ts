export class DateUtil {
  static timeDifferenceFromNow = (previous: Date): string => {
    return DateUtil.timeDifference(new Date(Date.now()), previous);
  };
  static timeDifference = (current: Date, previous: Date): string => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current.getTime() - previous.getTime();

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return (
        'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago'
      );
    } else {
      return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  };
}
