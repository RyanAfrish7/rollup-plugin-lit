import { Plugin, SourceDescription } from 'rollup';
import { createFilter } from 'rollup-pluginutils';
import path from "path";

const sass = require('sass');

export interface RollupPluginLitOptions {
  includePaths: string[],
  include: string[],
  exclude: string[],
};

export default function lit(options: RollupPluginLitOptions): Plugin {
  const filter = createFilter(options.include || ['**/*.css', '**/*.scss', '**/*.sass'], options.exclude);
  
  return {
    name: 'rollup-plugin-lit',
    transform: (code, id): SourceDescription | null => {
      console.log(id);

      if (filter(id) === false) {
        return null;
      }

      const result = sass.renderSync({
        data: code,
        includePaths: [path.dirname(id), ...(options.includePaths ?? [])]
      });

      const css = result.css.toString('utf-8');

      return {
        code: `import { css } from "lit-element";\n`
          + `export default css\`\n${css}\n\`;`,
      };
    }
  };
}
