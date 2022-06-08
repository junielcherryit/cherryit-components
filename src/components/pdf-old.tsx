import React, { PureComponent } from 'react'
import JsPdf from 'jspdf'
import html2canvas from 'html2canvas'

export class Pdf extends PureComponent<any> {
  targetRef: React.RefObject<unknown>
  constructor(props: any) {
    super(props)
    this.toPdf = this.toPdf.bind(this)
    this.targetRef = React.createRef()
  }

  async toPdf() {
    const {
      targetRef,
      filename = 'download.pdf',
      x = 0,
      y = 0,
      scale = 1,
      options,
      onComplete
    } = this.props
    const source = targetRef || this.targetRef
    const targetComponent = source.current || source
    if (!targetComponent) {
      throw new Error(
        'Target ref must be used or informed. See https://github.com/ivmarcos/react-to-pdf#usage.'
      )
    }
    const canvas = await html2canvas(targetComponent, {
      logging: false,
      useCORS: true,
      scale: scale
    })
    const imgData = canvas.toDataURL()
    const pdf: any = new JsPdf(options)
    const width = pdf.internal.pageSize.getWidth()
    const height = pdf.internal.pageSize.getHeight()
    pdf.addImage(imgData, 'JPEG', x, y, width, height)
    if (onComplete) onComplete({ pdf, filename })
  }

  render() {
    const { children }: any = this.props
    return children({ toPdf: this.toPdf, targetRef: this.targetRef })
  }
}
