#!/usr/bin/env node

import { rapper } from './index';
import { resolve } from 'path';
import chalk from 'chalk';
import * as program from 'commander';
import { IRapper } from './rapper';

// Todo: 增加 checkUpdate

(() => {
  program
    .option('--type <typeName>', '设置类型')
    .option('--apiUrl <apiUrl>', '设置Rap平台后端地址')
    .option('--apiOrigin <apiOrigin>', '设置Rap平台 url origin')
    .option('--rapUrl <rapUrl>', '设置Rap平台前端地址')
    .option('--rapperPath <rapperPath>', '设置生成代码所在目录')
    .option('--resSelector <resSelector>', '响应数据类型转换配置')
    .option('--typeRef <typeRef>', '数据转换依赖的类型导入');

  program.parse(process.argv);

  let rapperConfig: IRapper;
  if (program.type && program.apiUrl && program.rapUrl) {
    /** 通过 scripts 配置 */
    rapperConfig = {
      type: program.type,
      apiOrigin: program.apiOrigin || new URL(program.apiUrl).origin,
      apiUrl: program.apiUrl,
      rapUrl: program.rapUrl,
      typeRef: program.typeRef,
      rapperPath: resolve(process.cwd(), program.rapperPath || './src/models/rapper/'),
    };
    if (program.resSelector) {
      rapperConfig = { ...rapperConfig, resSelector: program.resSelector };
    }
  } else {
    /** 通过 package.json 的 rapper 字段配置 */
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const packageConfig = require(resolve(process.cwd(), './package.json'));

    if (!packageConfig.rapper) {
      console.log(chalk.yellow('尚未在 package.json 中配置 rapper，请参考配置手册'));
      process.exit(1);
    }
    const {
      type,
      rapUrl,
      apiUrl,
      apiOrigin,
      rapperPath,
      resSelector,
      typeRef,
    } = packageConfig.rapper;
    rapperConfig = {
      type: type || 'redux',
      apiOrigin: apiOrigin || new URL(apiUrl).origin,
      apiUrl,
      rapUrl,
      typeRef,
      rapperPath: resolve(process.cwd(), rapperPath || './src/models/rapper/'),
    };
    if (resSelector) {
      rapperConfig = { ...rapperConfig, resSelector: resSelector };
    }
  }

  rapper(rapperConfig);
})();
