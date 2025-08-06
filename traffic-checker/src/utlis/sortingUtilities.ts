

export const normalizeSortValue = (item, key) => item[key]?.toString().toLowerCase() || "";

export const compareValues = (a, b, key, order): number => {
    const normalizedValA = normalizeSortValue(a, key);
    const normalizedValB = normalizeSortValue(b, key);

    if (normalizedValA < normalizedValB) return order === "asc" ? -1 : 1;
    if (normalizedValA > normalizedValB) return order === "asc" ? 1 : -1;
    return 0;
};