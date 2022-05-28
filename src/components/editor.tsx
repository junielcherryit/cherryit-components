/* eslint-disable no-unused-vars */
import * as React from 'react'
import JoditEditor, { JoditProps } from 'jodit-react'

const Editor = React.forwardRef((props: JoditProps, ref) => (
  <JoditEditor ref={ref as any} {...props} />
))

export { Editor }
