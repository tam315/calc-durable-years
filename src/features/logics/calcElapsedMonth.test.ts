import { calcElapsedMonth } from '@/features/logics/calcElapsedMonth.ts'
import { expect, test } from 'vitest'

test('経過月数の計算', () => {
  // 取得日前日までの経過日数は満364日なので、繰り上げて12ヶ月
  expect(calcElapsedMonth('2020-01-15', '2021-01-14')).toBe(12)

  // 取得日前日までの経過日数は満365日なので、ぴったり12ヶ月
  expect(calcElapsedMonth('2020-01-15', '2021-01-15')).toBe(12)

  // 取得日前日までの経過日数は満365日と+1日なので、切り上げて13ヶ月
  expect(calcElapsedMonth('2020-01-15', '2021-01-16')).toBe(13)
})
