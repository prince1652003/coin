import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import CoinDetails from './components/CoinDetails'
import Coins from './components/Coins'
import Home from './components/Home'
import Header from './components/Header'
import Exchanges from './components/Exchanges'





function App() {


  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/coins" element={<Coins/>} />
        <Route path="/exchanges" element={<Exchanges/>} />
        <Route path="/coin/:id" element={<CoinDetails/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
