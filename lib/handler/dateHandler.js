import moment from 'moment';
import ValueHandler from './valueHandler';

function handle(elementConfig, page) {
  const value = ValueHandler.handle(elementConfig, page);

  if (value === undefined) {
    return undefined;
  }

  const { format } = elementConfig;

  const momentDate = moment(value, format);

  if (!momentDate.isValid()) {
    return undefined;
  }
  return new Date(momentDate.format());
}

export default { handle };
