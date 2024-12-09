export const mainPageSelectors = {
    columnLocator: (column) => `.flex-col:has-text("${column}")`,
}