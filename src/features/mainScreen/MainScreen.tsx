import { calcCurrentDurableYears } from '@/features/logics/calcCurrentDurableYears.ts'
import '@/features/theme/theme'
import { Button, css, Divider, Link, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { ReactNode, useState } from 'react'

export const MainScreen = () => {
  const [durableYearsString, setDurableYearsString] = useState<string>('')
  const [creationDate, setCreationDate] = useState<Date | null>(null)
  const [gotDate, setGotDate] = useState<Date | null>(null)
  const [resultMessage, setResultMessage] = useState<ReactNode>(null)

  const calcResult = () => {
    if (
      durableYearsString === '' ||
      creationDate === null ||
      gotDate === null
    ) {
      setResultMessage('全ての項目を入力してください。')
      return
    }

    const statutoryDurableYears = Number(durableYearsString)

    if (Number.isNaN(statutoryDurableYears) || statutoryDurableYears < 1) {
      setResultMessage('法定耐用年数は1年以上で入力してください。')
      return
    }

    if (creationDate >= gotDate) {
      setResultMessage('使用開始日は製造日等よりも後の日付を入力してください。')
      return
    }

    const { durableYears, calculationType, elapsedMonths } =
      calcCurrentDurableYears({
        statutoryDurableYears,
        creationDate: creationDate.toISOString(),
        gotDate: gotDate.toISOString(),
      })

    let formula: string
    switch (calculationType) {
      case 'alreadyElapsed': {
        formula = '耐用年数 = 法定耐用年数 * 0.2 (ただし最短でも2年)'
        break
      }
      case 'inElapsing': {
        formula = `耐用年数 = 法定耐用月数 - 経過月数 + 経過月数 * 0.2 (ただし最短でも2年)`
        break
      }
    }

    setResultMessage(
      <>
        <Typography>計算結果: 耐用年数は{durableYears}年です。</Typography>
        <div css={styles.description}>
          <Typography variant="caption">採用計算式: {formula}</Typography>
          <Typography variant="caption"></Typography>
          <br />
          <Typography variant="caption">
            法定耐用年数: {statutoryDurableYears * 12}ヶ月
          </Typography>
          <br />
          <Typography variant="caption">
            経過月数: {elapsedMonths}ヶ月
          </Typography>
          <br />
        </div>
      </>,
    )
  }

  return (
    <div css={styles.container}>
      <Typography variant="h6">中古償却資産の耐用年数計算ツール</Typography>

      <div>
        <TextField
          label="法定耐用年数"
          variant="outlined"
          type="number"
          onChange={e => {
            setDurableYearsString(e.target.value)
          }}
          value={durableYearsString}
          sx={{ width: '100%', marginTop: 3 }}
        />
      </div>

      <div>
        <DesktopDatePicker
          label="新品として販売された日、竣工日など"
          onChange={setCreationDate}
          value={creationDate}
          sx={{ width: '100%', marginTop: 3 }}
        />
      </div>

      <div>
        <DesktopDatePicker
          label="中古品を事業で使い始めた日"
          onChange={setGotDate}
          value={gotDate}
          sx={{ width: '100%', marginTop: 3 }}
        />
      </div>

      <Button
        variant="contained"
        onClick={calcResult}
        sx={{ width: '100%', marginTop: 3 }}
      >
        計算
      </Button>

      {resultMessage && (
        <>
          <Divider sx={{ marginTop: 3 }} />
          <Typography sx={{ marginTop: 3 }}>{resultMessage}</Typography>
        </>
      )}

      <Link
        css={styles.footer}
        href="https://www.yuuniworks.com"
        underline="none"
        variant="body2"
      >
        Made by Yuuniworks
      </Link>
    </div>
  )
}

const styles = {
  container: css`
    max-width: 400px;
    margin: auto;
    padding: 16px 8px;
  `,
  title: css`
    font-size: 20px;
    font-weight: bold;
  `,
  caption: css`
    color: #666;
    font-size: 12px;
  `,
  description: css`
    margin-top: 16px;
  `,
  footer: css`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
  `,
}
