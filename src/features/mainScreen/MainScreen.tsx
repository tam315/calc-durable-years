import { calcCurrentDurableYears } from '@/features/logics/calcCurrentDurableYears.ts'
import '@/features/theme/theme'
import { Button, css, TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { useState } from 'react'

export const MainScreen = () => {
  const [durableYears, setDurableYears] = useState<number>(1)
  const [creationDate, setCreationDate] = useState<Date | null>(null)
  const [gotDate, setGotDate] = useState<Date | null>(null)
  const [resultYear, setResultYear] = useState<number | null>(null)

  const calcResult = () => {
    const result = calcCurrentDurableYears({
      statutoryDurableYears: durableYears,
      creationDate: creationDate?.toISOString() ?? '',
      gotDate: gotDate?.toISOString() ?? '',
    })
    setResultYear(result)
  }

  return (
    <div css={styles.container}>
      <div css={styles.title}>中古償却資産の耐用年数計算ツール</div>

      <div css={styles.caption}>
        ※計算結果の保証はしておりませんので、必ず自らの責任で計算を行ってください。
      </div>

      <div>
        <TextField
          label="法定耐用年数"
          variant="standard"
          type="number"
          onChange={e => setDurableYears(Number(e.target.value))}
          value={durableYears}
        />
      </div>

      <div>
        <DesktopDatePicker
          label="新品として製造された日（償却資産の製造日等）"
          onChange={setCreationDate}
          value={creationDate}
        />
      </div>

      <div>
        <DesktopDatePicker
          label="中古品の使用開始日（事業の用に供した日）"
          onChange={setGotDate}
          value={gotDate}
        />
      </div>

      <Button variant="contained" onClick={calcResult}>
        計算
      </Button>

      {resultYear && <div>計算結果: 耐用年数は{resultYear}年です。</div>}
    </div>
  )
}

const styles = {
  container: css`
    display: grid;
    gap: 16px;
    max-width: 400px;
    margin: 24px auto;
  `,
  title: css`
    font-size: 20px;
    font-weight: bold;
  `,
  caption: css`
    color: #666;
    font-size: 12px;
  `,
}
