import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export interface PaginationPropsType {
  /**
   * 총 페이지
   */
  totalPage: number;

  /**
   * 총 데이터 갯수
   */
  totalItem: number;

  /**
   * 현재 페이지
   */
  currentPage: number;

  /**
   * page set handler
   */
  onPageChange: (nextPage: number) => void;
}

/**
 * Pagination 공통 컴포넌트
 */
const CustomPagination = (props: PaginationPropsType) => {
  const { totalItem, currentPage, totalPage, onPageChange } = props;

  return (
    <div className="py-12">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <button
              onClick={currentPage === 1 ? undefined : () => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <PaginationPrevious />
            </button>
          </PaginationItem>
          {Array.from({ length: totalPage }).map((_, i) => (
            <PaginationItem key={i}>
              <button onClick={() => onPageChange(i + 1)}>
                <PaginationLink isActive={currentPage === i + 1 ? true : false}>{i + 1}</PaginationLink>
              </button>
            </PaginationItem>
          ))}
          {totalItem > 60 ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}

          <PaginationItem>
            <button
              onClick={totalPage === currentPage ? undefined : () => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
            >
              <PaginationNext />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
