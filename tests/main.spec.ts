import { expect, type Page, test } from '@playwright/test'

const getUtils = (page: Page) => {
  const gotoPage = () => page.goto('http://localhost:5173/')

  const durableYearsInput = page.getByLabel('法定耐用年数')

  const creationDateInput = page.getByRole('group', {
    name: '新品として販売された日、竣工日など',
  })

  const gotDateInput = page.getByRole('group', {
    name: '中古品を事業で使い始めた日',
  })

  const calculateButton = page.getByRole('button', { name: '計算' })

  return {
    gotoPage,
    durableYearsInput,
    creationDateInput,
    gotDateInput,
    calculateButton,
  }
}

const fillDate = async (
  dateInput: ReturnType<Page['getByRole']>,
  date: { year: string; month: string; day: string },
) => {
  await dateInput.getByRole('spinbutton', { name: 'Year' }).fill(date.year)
  await dateInput.getByRole('spinbutton', { name: 'Month' }).fill(date.month)
  await dateInput.getByRole('spinbutton', { name: 'Day' }).fill(date.day)
}

test('has title', async ({ page }) => {
  const {
    gotoPage,
    durableYearsInput,
    creationDateInput,
    gotDateInput,
    calculateButton,
  } = getUtils(page)

  await gotoPage()

  await durableYearsInput.fill('6')

  await fillDate(creationDateInput, { year: '2020', month: '01', day: '01' })
  await fillDate(gotDateInput, { year: '2023', month: '02', day: '15' })

  await calculateButton.click()
  await expect(page.getByText(/耐用年数は3年です/)).toBeVisible()
})
