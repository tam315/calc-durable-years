import { calcCurrentDurableYears } from '@/features/logics/calcCurrentDurableYears.ts'
import '@/features/theme/theme'
import { Button, css, Divider, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { useState } from 'react'

export const MainScreen = () => {
  const [durableYears, setDurableYears] = useState<number | null>(null)
  const [creationDate, setCreationDate] = useState<Date | null>(null)
  const [gotDate, setGotDate] = useState<Date | null>(null)
  const [resultText, setResultText] = useState<string | null>(null)

  const calcResult = () => {
    if (durableYears === null || creationDate === null || gotDate === null) {
      setResultText('全ての項目を入力してください。')
      return
    }

    if (durableYears <= 0) {
      setResultText('法定耐用年数は1年以上で入力してください。')
      return
    }

    if (creationDate >= gotDate) {
      setResultText('使用開始日は製造日等よりも後の日付を入力してください。')
      return
    }

    const result = calcCurrentDurableYears({
      statutoryDurableYears: durableYears,
      creationDate: creationDate.toISOString(),
      gotDate: gotDate.toISOString(),
    })
    setResultText(`計算結果: 耐用年数は${result}年です。`)
  }

  return (
    <div css={styles.container}>
      <Typography variant="h6">中古償却資産の耐用年数計算ツール</Typography>

      <div>
        <TextField
          label="法定耐用年数"
          variant="outlined"
          type="number"
          onChange={e => setDurableYears(Number(e.target.value))}
          value={durableYears}
          sx={{ width: '100%', marginTop: 3 }}
        />
      </div>

      <div>
        <DesktopDatePicker
          label="製造日、竣工日など"
          onChange={setCreationDate}
          value={creationDate}
          sx={{ width: '100%', marginTop: 3 }}
        />
        <Typography variant="caption">
          ※中古償却資産が新品として世に出た日など
        </Typography>
      </div>

      <div>
        <DesktopDatePicker
          label="使用開始日"
          onChange={setGotDate}
          value={gotDate}
          sx={{ width: '100%', marginTop: 3 }}
        />
        <Typography variant="caption">
          ※ 中古償却資産を事業の用に供した日
        </Typography>
      </div>

      <Button
        variant="contained"
        onClick={calcResult}
        sx={{ width: '100%', marginTop: 2 }}
      >
        計算
      </Button>

      {resultText && (
        <>
          <Divider sx={{ marginTop: 3 }} />{' '}
          <Typography sx={{ marginTop: 3 }}>{resultText}</Typography>
        </>
      )}
    </div>
  )
}

const styles = {
  container: css`
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
