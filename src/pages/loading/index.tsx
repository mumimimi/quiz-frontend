import 'src/pages/loading/index.css'
import { JSX } from 'react'

const LoadingPage = (): JSX.Element => {
  return (
    <div className="w-screen h-screen flex justify-center items-center align-middle">
      <span className="loader" />
    </div>
  )
}

export default LoadingPage
