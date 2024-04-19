import { calcElapsedMonth } from '@/features/logics/calcElapsedMonth.ts'

type Args = {
  // 法定耐用年数
  statutoryDurableYears: number
  // 竣工日など
  creationDate: string
  // 中古資産として購入した日
  gotDate: string
}

type Result = {
  // 耐用年数
  durableYears: number
  // 計算式
  calculationType: 'alreadyElapsed' | 'inElapsing'
  // 経過月数
  elapsedMonths: number
}

export const calcCurrentDurableYears = (args: Args): Result => {
  const { statutoryDurableYears, creationDate, gotDate } = args

  const statutoryDurableMonths = statutoryDurableYears * 12
  const elapsedMonths = calcElapsedMonth(creationDate, gotDate)

  let resultMonths: number

  if (elapsedMonths > statutoryDurableMonths) {
    // 償却済みの場合
    resultMonths = statutoryDurableMonths * 0.2
  } else {
    // 償却途中の場合
    resultMonths = statutoryDurableMonths - elapsedMonths + elapsedMonths * 0.2
  }

  // - 最終計算結果の耐用年数が2年を満たない場合は2年とする。
  // - 最終計算結果につき、1年未満の月数は切り捨てとする。
  return {
    elapsedMonths,
    durableYears: Math.max(2, Math.floor(resultMonths / 12)),
    calculationType:
      elapsedMonths > statutoryDurableMonths ? 'alreadyElapsed' : 'inElapsing',
  }
}
