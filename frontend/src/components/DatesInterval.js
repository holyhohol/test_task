export function datesInterval(start, end) {
  for (
    var arr = [], dt = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt).toISOString().split('T')[0]);
  }
  return arr;
}
