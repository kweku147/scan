interface GhostOptions {
    /**
     * need exclude pkg pattern
     */
    exclude?: ExcludePattern | ExcludePattern[];
    /**
     * include node lib {fs, path, etc}
     * @default false
     */
    includeNodeLib?: boolean;
}
declare type ExcludePattern = string | RegExp;

/**
 * 查找幽灵依赖
 * @param paths 目标文件夹或目录
 * @param pkgJsonPath package.json文件路径
 */
declare function findGhost(paths: string | string[], pkgJsonPath: string, options?: GhostOptions): string[];

export { ExcludePattern, GhostOptions, findGhost, findGhost as findPhantom };
