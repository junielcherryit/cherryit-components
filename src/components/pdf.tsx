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
      scale = 1,
      options,
      onComplete
    } = this.props
    const source = targetRef || this.targetRef
    const targetComponent = source.current || source
    if (!targetComponent) {
      throw new Error('Target ref must be used or informed.')
    }
    const canvas = await html2canvas(targetComponent, {
      logging: false,
      useCORS: true,
      scale: scale
    })
    const imgData = canvas.toDataURL()
    const doc: any = new JsPdf(options)
    const imgWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      doc.addPage()
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    if (onComplete) onComplete({ pdf: doc, filename })
  }

  render() {
    const { children }: any = this.props
    return children({ toPdf: this.toPdf, targetRef: this.targetRef })
  }
}
