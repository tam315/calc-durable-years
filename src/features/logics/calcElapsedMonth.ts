import { differenceInMonths, parseISO, subDays } from 'date-fns'

// 経過年数は、その減価償却資産の最初の登録日、竣工日等から、
// 事業者が中古資産として購入した日（事業の用に供した日）の前日までの期間を指す。
// 日数を切捨てるか切上るかの規定はないが、切り上げたほうがお得なのでそうする。
export const calcElapsedMonth = (
  // 登録日、竣工日等
  creationDate: string,
  // 中古資産として購入した日
  gotDate: string,
) => {
  const parsedDate1 = parseISO(creationDate)
  const parsedDate2 = subDays(parseISO(gotDate), 1)
  return differenceInMonths(parsedDate2, parsedDate1) + 1
}
