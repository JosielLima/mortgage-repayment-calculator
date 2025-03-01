import { useState } from 'react'
import './App.css'
import Container from './components/Container.jsx'
import Form from './components/Form.jsx'
import Result from './components/Result.jsx'

function App() {

  const [results, setResults] = useState({
    monthlyPayment: null,
    totalRepayment: null,
  });



  return (
    <Container>
      <div className='content'>
        <Form setResults={setResults} />
        <Result results={results} />
      </div>
    </Container>
  )
}

export default App
