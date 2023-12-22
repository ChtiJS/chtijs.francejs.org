export function slicePage<T>(entries: T[], page: number, postPerPage: number) {
  return entries.slice(
    (page - 1) * postPerPage,
    (page - 1) * postPerPage + postPerPage
  );
}
