import colors from 'colors/safe';

function error(msg) {
  console.error(colors.red(msg));
}

function info(msg) {
  console.info(colors.green(msg));
}

function help(msg) {
  console.info(colors.cyan(msg));
}

function warn(msg) {
  console.warn(colors.yellow(msg));
}

function debug(msg) {
  console.debug(colors.blue(msg));
}

export {
  error, info, help, warn, debug,
};
