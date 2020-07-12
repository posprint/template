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
      attributes: Object({ charset: 'utf-8', isa: 'esc' }),
      children: [
        Object({
          elementName: 'text',
          attributes: Object({}),
          children: 'Hello, world!',
        }),
      ],
    });
  });
});
