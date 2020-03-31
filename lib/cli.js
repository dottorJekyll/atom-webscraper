import yargs from 'yargs';

const { argv } = yargs
  .option('url', {
    description: 'Url to extract examples',
    alias: 'u',
    type: 'string',
  })
  .option('config', {
    alias: 'c',
    description: 'Config to use to select elements',
    type: 'string',
  })
  .option('output', {
    alias: 'o',
    description: 'The path of the file to write in',
    type: 'string',
  })
  .help()
  .showHelpOnFail(true)
  .demandOption('url')
  .demandOption('config')
  .demandOption('output')
  .alias('help', 'h');

export default argv;
