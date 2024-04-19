import { calcCurrentDurableYears } from '@/features/logics/calcCurrentDurableYears.ts'
import { expect, test } from 'vitest'

test('耐用年数10年', () => {
  // 使用期間最短のケース
  expect(
    calcCurrentDurableYears({
      statutoryDurableYears: 10,
      creationDate: '2020-01-01',
      gotDate: '2020-01-02',
    }),
  ).toBe(9)

  // ８年になる境目
  expect(
    calcCurrentDurableYears({
      statutoryDurableYears: 10,
      creationDate: '2020-01-01',
      gotDate: '2021-04-01',
    }),
  ).toBe(9)
  expect(
    calcCurrentDurableYears({
      statutoryDurableYears: 10,
      creationDate: '2020-01-01',
      gotDate: '2021-04-02',
    }),
  ).toBe(8)

  // ２年で下げ止まる境目
  expect(
    calcCurrentDurableYears({
      statutoryDurableYears: 10,
      creationDate: '2020-01-01',
      gotDate: '2028-10-01',
    }),
  ).toBe(3)
  expect(
    calcCurrentDurableYears({
      statutoryDurableYears: 10,
      creationDate: '2020-01-01',
      gotDate: '2028-10-02',
    }),
  ).toBe(2)

  // 完全償却後
  expect(
    calcCurrentDurableYears({
      statutoryDurableYears: 10,
      creationDate: '2020-01-01',
      gotDate: '2040-01-02',
    }),
  ).toBe(2)
})
