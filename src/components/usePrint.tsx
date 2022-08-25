import * as React from 'react'
import { useReactToPrint } from 'react-to-print'

interface IPrint {
  ref: any
  print?: any
  documentTitle: string
}

const usePrint = ({ ref, print, documentTitle }: IPrint) => {
  const reactToPrintContent = React.useCallback(() => {
    return ref.current
  }, [ref.current])
  return useReactToPrint({
    content: reactToPrintContent,
    removeAfterPrint: true,
    documentTitle: documentTitle,
    print: print
  })
}

export { usePrint }
