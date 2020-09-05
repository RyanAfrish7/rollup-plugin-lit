const { rollup } = require("rollup");
const lit = require("..");
const path = require("path");
const typescript = require("@rollup/plugin-typescript");

describe("scss", () => {
  it("should generate lit css template from scss", async () => {
    const bundle = await rollup({
      input: path.resolve(__dirname, './fixtures/scss/index.js'),
      plugins: [
        lit({}),
      ],
    });

    const { output } = await bundle.generate({});
    console.log(output[0].code);
  });
});

describe("scss + ts", () => {
  it("should generate lit css template from scss", async () => {
    const bundle = await rollup({
      input: [
        path.resolve(__dirname, './fixtures/scss+ts/index.ts'),
      ],
      plugins: [
        typescript({ tsconfig: path.resolve(__dirname, './fixtures/scss+ts/tsconfig.json') }),
        lit({}),
      ],
    });

    const { output } = await bundle.generate({});
    console.log(output[0].code);
  });
});
