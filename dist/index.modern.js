import { lazy, forwardRef, createElement, Suspense } from 'react';

var JoditEditor = lazy(function () {
  return import('jodit-react');
});
var Editor = forwardRef(function (props, ref) {
  if (typeof window === 'undefined') {
    return null;
  }

  return createElement(Suspense, {
    fallback: createElement("div", null, "Loading")
  }, createElement(JoditEditor, Object.assign({
    ref: ref
  }, props)));
});

var PreviewHtml = function PreviewHtml(_ref) {
  var content = _ref.content;
  return createElement("div", {
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};

var domToPdf = require('dom-to-pdf');

var toPdf = function toPdf(ref, options, cb) {
  return domToPdf(ref, options, cb);
};

var Pdf = {
  toPdf: toPdf
};

export { Editor, Pdf, PreviewHtml };
//# sourceMappingURL=index.modern.js.map
