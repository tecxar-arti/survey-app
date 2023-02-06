import * as loglevel from 'loglevel';

if (process.env.NODE_ENV === 'production') {
  loglevel.setLevel('error');
} else {
  loglevel.setLevel('debug');
}

export default loglevel;

