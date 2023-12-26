const CARET = "^";
const COLON = ":";
const UNDERSCORE = "_";

const importViews = () => {
  return require
    .context("../views", true, /\.vue$/)
    .keys()
    .map((key) => key.slice(2).replace(".vue", "").split("/"));
};

const importComponent = async (paths) => {
  const component = await import(`../views/${paths.join("/")}.vue`);
  return component.default;
};

const isChildren = (paths) => {
  return paths.some((p) => p.startsWith(CARET));
};

const is404 = (paths) => {
  return paths.includes("NotFound");
};

const generateRoute = async (paths) => {
  const component = await importComponent(paths);
  const { name } = component;

  if (is404(paths)) {
    return {
      path: "*",
      name,
      component,
    };
  }

  const path = generatePath(paths);
  const meta = generateMeta(component);
  const children = await generateChildren(path);

  return {
    path,
    name,
    meta,
    children,
    component,
  };
};

const generatePath = (path) => {
  const routePath = path
    .filter((p) => p.toLowerCase() !== "index")
    .map((p) => p.toLowerCase().replace(UNDERSCORE, COLON))
    .join("/");

  return `/${routePath}`;
};

const generateMeta = (component) => {
  const { layout, middlewares } = component;
  const meta = {
    layout: layout ?? "AppLayoutDefault",
  };
  if (middlewares) {
    meta.middlewares = middlewares;
  }

  return meta;
};

const generateChildren = async (path) => {
  const children = childrenViews[path];

  if (children) {
    return await Promise.all(
      children.map(async (paths) => {
        const component = await importComponent(paths);
        const { name } = component;
        const path = generatePath(removeChildrenChar(paths));
        const meta = generateMeta(component);

        return {
          path,
          name,
          meta,
          component,
        };
      })
    );
  }
};

const removeChildrenChar = (paths) => {
  const copyPaths = [...paths];
  const lastPathIndex = copyPaths.length - 1;
  copyPaths[lastPathIndex] = copyPaths[lastPathIndex].slice(1);

  return copyPaths;
};

const views = importViews();

const childrenViews = views
  .filter((paths) => isChildren(paths))
  .reduce((accumulator, paths) => {
    const routePath = generatePath(paths.slice(0, -1));

    if (accumulator[routePath]) {
      accumulator[routePath].push(paths);
    } else {
      accumulator[routePath] = [paths];
    }
    return accumulator;
  }, {});

const routes = views
  .filter((paths) => !isChildren(paths))
  .map(async (paths) => await generateRoute(paths));

export default routes;
