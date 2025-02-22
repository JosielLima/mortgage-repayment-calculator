import './App.css'
import Container from './components/Container.jsx'
import Form from './components/Form.jsx'
import Result from './components/Result.jsx'

function App() {

  return (
    <Container>
      <div className='content'>
        <Form></Form>
        <Result></Result>
      </div>
    </Container>
  )
}

export default App
