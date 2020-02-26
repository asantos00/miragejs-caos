import caosCases from "./caosCases";

const FAILURE_LEVELS = {
  high: 0.9,
  medium: 0.4,
  low: 0.1
};

const randomFailureRate = (_, level) =>
  Math.random() <= FAILURE_LEVELS[level || "medium"];

const randomBreakingCase = () => {
  const possibleCases = Object.keys(caosCases);
  return possibleCases[Math.floor(Math.random() * possibleCases.length)];
};

const withCaos = (
  handler,
  {
    level,
    getBreakingCase = randomBreakingCase,
    shouldFail = randomFailureRate
  } = {}
) => request => {
  if (!shouldFail(request, level)) {
    return handler(request);
  }

  const breakingCase = getBreakingCase(request);
  console.log(
    `${request.method} ${request.url} - Caos Happening 🙉`,
    breakingCase
  );
  console.log(request);
  return caosCases[breakingCase](request, handler);
};

export default withCaos;
