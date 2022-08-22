const domToPdf = require('dom-to-pdf')
const toPdf = (ref: any, options: any, cb: any) => domToPdf(ref, options, cb)
export const Pdf = {
  toPdf
}
