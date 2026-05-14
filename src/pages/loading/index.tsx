import 'src/pages/loading/index.css'
import { JSX } from 'react'

const LoadingPage = (): JSX.Element => {
  return (
    <div className="container">
      <div id="loader">
        <div id="title" className="flex">
          <p className="loading-text">LOADING</p>
          <div>...</div>
          <p className="loading-number">%</p>
        </div>

        <div id="loading-bar-border">
          <div className="loading-bar"></div>
        </div>

        <div id="warning">
          <div className="flex gap-2">
            <div className="exclamation">!</div>
            CAUTION, Do not turn off.
          </div>
          <div id="line-cascates"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
