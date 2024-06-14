import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { getVisiblePages } from './util';

export interface PaginationPropsType {
  /**
   * 총 페이지
   */
  totalPage: number;

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
  const { currentPage, totalPage, onPageChange } = props;

  const visiblePage = getVisiblePages({ totalPage, currentPage });

  const handlePageChange = (nextPage: number) => {
    onPageChange(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <button
              onClick={currentPage === 0 ? undefined : () => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <PaginationPrevious />
            </button>
          </PaginationItem>

          {/* 첫 페이지 표시 */}
          {currentPage > 5 && totalPage > 10 && (
            <>
              <PaginationItem>
                <button onClick={() => handlePageChange(0)}>
                  <PaginationLink isActive={currentPage === 0}>1</PaginationLink>
                </button>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {/* 현재 페이지와 근처의 페이지 표시 */}
          {visiblePage.map((page) => (
            <PaginationItem key={page}>
              <button onClick={() => handlePageChange(page - 1)}>
                <PaginationLink isActive={currentPage === page - 1}>{page}</PaginationLink>
              </button>
            </PaginationItem>
          ))}

          {/* 마지막 페이지 표시 */}
          {currentPage < totalPage - 5 && totalPage > 10 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <button onClick={() => handlePageChange(totalPage - 1)}>
                  <PaginationLink isActive={currentPage === totalPage - 1}>{totalPage}</PaginationLink>
                </button>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <button
              onClick={totalPage === currentPage - 1 ? undefined : () => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage - 1}
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
