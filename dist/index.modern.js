import React__default, { lazy, forwardRef, createElement, Suspense, PureComponent } from 'react';
import JsPdf from 'jspdf';
import html2canvas from 'html2canvas';

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

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var Pdf = /*#__PURE__*/function (_PureComponent) {
  _inheritsLoose(Pdf, _PureComponent);

  function Pdf(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.toPdf = _this.toPdf.bind(_assertThisInitialized(_this));
    _this.targetRef = React__default.createRef();
    return _this;
  }

  var _proto = Pdf.prototype;

  _proto.toPdf = function toPdf() {
    try {
      var _this3 = this;

      var _this3$props = _this3.props,
          targetRef = _this3$props.targetRef,
          _this3$props$filename = _this3$props.filename,
          filename = _this3$props$filename === void 0 ? 'download.pdf' : _this3$props$filename,
          _this3$props$x = _this3$props.x,
          x = _this3$props$x === void 0 ? 0 : _this3$props$x,
          _this3$props$y = _this3$props.y,
          y = _this3$props$y === void 0 ? 0 : _this3$props$y,
          _this3$props$scale = _this3$props.scale,
          scale = _this3$props$scale === void 0 ? 1 : _this3$props$scale,
          options = _this3$props.options,
          onComplete = _this3$props.onComplete;
      var source = targetRef || _this3.targetRef;
      var targetComponent = source.current || source;

      if (!targetComponent) {
        throw new Error('Target ref must be used or informed. See https://github.com/ivmarcos/react-to-pdf#usage.');
      }

      return Promise.resolve(html2canvas(targetComponent, {
        logging: false,
        useCORS: true,
        scale: scale
      })).then(function (canvas) {
        var imgData = canvas.toDataURL();
        var pdf = new JsPdf(options);
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'JPEG', x, y, width, height);
        if (onComplete) onComplete({
          pdf: pdf,
          filename: filename
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.render = function render() {
    var children = this.props.children;
    return children({
      toPdf: this.toPdf,
      targetRef: this.targetRef
    });
  };

  return Pdf;
}(PureComponent);

export { Editor, Pdf, PreviewHtml };
//# sourceMappingURL=index.modern.js.map
