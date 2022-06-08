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
      throw new Error(
        'Target ref must be used or informed. See https://github.com/ivmarcos/react-to-pdf#usage.'
      )
    }
    const canvas = await html2canvas(targetComponent, {
      logging: false,
      useCORS: true,
      scale: scale
    })
    const imgData = canvas.toDataURL('image/png')
    const doc: any = new JsPdf(options)
    const imgWidth = 210
    const pageHeight = 295
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
