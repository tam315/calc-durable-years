import { MainScreen } from '@/features/mainScreen/MainScreen.tsx'
import '@/features/theme/theme'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ja } from 'date-fns/locale/ja'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <MainScreen />
    </LocalizationProvider>
  )
}

export default App
