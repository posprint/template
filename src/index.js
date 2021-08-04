const vm = require('vm');
const sucrase = require('sucrase');
const dayjs = require('dayjs');
const numeral = require('numeral');
// TODO: remove react dep.
const { createElement, Fragment } = require('react');
// TODO: custom renderer.
const TestRenderer = require('react-test-renderer');

function precompile(template) {
  const { code } = sucrase.transform(template, { transforms: ['jsx'] });
  return code;
}

function exec(template, style, data, printer) {
  const code = precompile(template);

  const sandbox = Object.create(null);
  sandbox.dayjs = dayjs;
  sandbox.numeral = numeral;
  sandbox.React = { createElement, Fragment };
  sandbox.data = data;
  sandbox.style = style;
  sandbox.printer = printer;

  const root = vm.runInNewContext(code, sandbox);

  return root;
}

function hydrate(template, style, data, printer) {
  const root = exec(template, style, data, printer);
  const json = TestRenderer.create(root).toJSON();
  const dom = cleanNode(json);

  return dom;
}

function cleanNode(node) {
  const { type, props, children } = node;

  const nodeObj = {
    elementName: type,
    attributes: props,
    children: null,
  };

  const childrenObj = [];
  if (children && Array.isArray(children)) {
    children.forEach(child => {
      const type = typeof child;
      if (type === 'object') {
        const childObj = cleanNode(child);
        childrenObj.push(childObj);
      } else if (type === 'string') {
        child.length > 0 && childrenObj.push(child);
      } else {
        throw new Error(`unexpected child type: ${type}`);
      }
    });
  }

  if (childrenObj.length === 0) {
    nodeObj.children = null;
  } else {
    const literal = !childrenObj.find(x => typeof x === 'object');
    if (literal) {
      nodeObj.children = childrenObj.join('');
    } else {
      nodeObj.children = childrenObj;
    }
  }

  return nodeObj;
}

numeral.register('locale', 'de', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal: function (number) {
    return '.';
  },
  currency: {
    symbol: '€',
  },
});

module.exports = {
  precompile,
  hydrate,
};
