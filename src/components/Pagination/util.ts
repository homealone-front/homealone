export const getVisiblePages = ({ totalPage, currentPage }: { totalPage: number; currentPage: number }) => {
  let startPage = Math.max(1, currentPage - Math.floor(10 / 2));
  let endPage = startPage + 10 - 1;

  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = Math.max(1, endPage - 10 + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};
