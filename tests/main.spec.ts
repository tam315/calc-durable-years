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

  await creationDateInput.click()
  await page.keyboard.type('20200101')

  await gotDateInput.click()
  await page.keyboard.type('20230215')

  await calculateButton.click()
  await page.pause()
  await expect(page.getByText(/耐用年数は3年です/)).toBeVisible()
})
