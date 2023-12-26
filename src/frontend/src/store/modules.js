const requireModules = require.context("@/modules/", true, /store\.js$/);

export default requireModules.keys().reduce((modules, filename) => {
  const moduleName = filename
    .split("/")[1]
    .replace(/^\w/, (c) => c.toUpperCase());
  modules[moduleName] =
    requireModules(filename).default || requireModules(filename);
  return modules;
}, {});
