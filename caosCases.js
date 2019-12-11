import range from 'lodash.range';

export default {
  bigDelay: (request, handler) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(handler(request));
      }, 5000);
    }),
  random5XX: () => Promise.resolve([range(500, 511)]),
  serviceUnavailable: () => Promise.resolve([503]),
  gatewayTimeout: () => Promise.resolve([504]),
  unauthorized: () => Promise.resolve([403, {}, "{}"]),
}
