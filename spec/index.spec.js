describe('hydrate', function () {
  const { hydrate } = require('../src/index');

  it('sanity', function () {
    const template = `
      <root charset="utf-8" isa="esc">
        <text>Hello, world!</text>
      </root>
    `;
    const dom = hydrate(template, {}, {}, {});
    expect(dom).toEqual({
      elementName: 'root',
      attributes: { charset: 'utf-8', isa: 'esc' },
      children: [
        {
          elementName: 'text',
          attributes: {},
          children: 'Hello, world!',
        },
      ],
    });
  });
});
