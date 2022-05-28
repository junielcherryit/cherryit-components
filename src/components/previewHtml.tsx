import * as React from 'react'

interface IPreviewHtml {
  content: any
}

const PreviewHtml: React.FC<IPreviewHtml> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export { PreviewHtml }
