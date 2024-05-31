import ReactDOM from 'react-dom/client'

import { ErrorBoundary } from 'react-error-boundary'

import Error from '@/components/Error'

import App from '@/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary
    FallbackComponent={Error}
    onReset={() => window.location.replace('/')}
  >
    <App />
  </ErrorBoundary>,
)
