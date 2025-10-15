type LocaleModule = Record<string, string>;
type GlobModule = LocaleModule | { default: LocaleModule };

function combineModules(modules: Record<string, GlobModule>): Record<string, string> {
  const combined: Record<string, string> = {};
  for (const path in modules) {
    const mod = modules[path];
    const data = (mod as { default?: LocaleModule }).default ?? (mod as LocaleModule);
    Object.assign(combined, data);
  }
  return combined;
}

const jsonModules = import.meta.glob<GlobModule>('./**/*.json', { eager: true });

export default combineModules(jsonModules);