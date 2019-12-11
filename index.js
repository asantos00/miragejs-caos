import Pretender from "pretender";
import withCaos from './withCaos';
import caosCasesWithHandlers from './caosCases';

export const caosCases = Object.keys(caosCasesWithHandlers);

export const addCaos = (MirageServer, caosOptions) => {
  return function(options = {}) {
    const pretender = options.pretender || new Pretender();

    ["get", "post", "put", "delete", "patch", "head", "options"].forEach(
      verb => {
        const _original = pretender[verb];

        pretender[verb] = (path, handler, ...args) => {
          return _original.call(
            pretender,
            path,
            withCaos(handler, caosOptions),
            ...args
          );
        };
      }
    );

    return new MirageServer({ ...options, pretender });
  };
};
