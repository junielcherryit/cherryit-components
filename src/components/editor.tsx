/* eslint-disable no-unused-vars */
import * as React from 'react'

const JoditEditor = React.lazy(() => {
  return import('jodit-react')
})

const Editor = React.forwardRef((props: any, ref) => {
  if (typeof window === 'undefined') {
    return null
  }
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <JoditEditor ref={ref as any} {...props} />
    </React.Suspense>
  )
})

export { Editor }
