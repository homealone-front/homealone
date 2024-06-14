import { useState } from 'react';
import { Card } from '@/components/Card';

import { PriceSlot } from '@/pages/Main/components/PriceSlot';
import { Pagination } from '@/components/Pagination';

import { useNavigate, generatePath } from 'react-router-dom';
import { RECIPE_PATH } from '@/constants/paths';
import { useMyBookmarkedRecipeListQuery } from '@/services/recipe/useMyBookmarkedRecipeListQuery';
import { SkeletonCard } from '@/components/Skeleton';
import { NoBookmark } from '../NoBookmark';
import { NAV_TABS } from '../../constants';

/**
 * 내가 저장한 레시피 글 목록 컴포넌트
 */

const RecipeList = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, isLoading, isFetching } = useMyBookmarkedRecipeListQuery({ page: currentPage, size: 20 });

  const navigate = useNavigate();

  const handlePageMove = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-4 gap-6 pb-12 mt-16 place-items-start">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      {!data?.content.length ? (
        <NoBookmark {...NAV_TABS.recipe} />
      ) : (
        <div className="flex flex-col justify-between mt-10">
          <div className="flex items-center mb-4">
            <span className="mr-1 text-medium text-gray700">전체</span>
            <span className="text-sm font-light text-gray400">{data.totalElements}</span>
          </div>
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-4 gap-6 pb-10 place-items-start">
              {data?.content?.map((card, i) => (
                <Card
                  key={i}
                  title={card?.title}
                  description={card?.description}
                  userName={card?.userName}
                  userImage={card.userImage}
                  imageUrl={card?.imageUrl}
                  lineClamp={1}
                  slot={
                    <PriceSlot
                      cookInfo={{
                        portions: card?.portions.toString(),
                        cookTime: card?.recipeTime,
                      }}
                    />
                  }
                  likes={card.relatedDto.likeCount}
                  onPageMove={() =>
                    navigate(
                      generatePath(RECIPE_PATH.detail, {
                        id: card.id.toString(),
                      }),
                    )
                  }
                />
              ))}
            </div>
            {data?.totalPages > 1 && (
              <Pagination
                totalPage={data?.totalPages as number}
                currentPage={currentPage}
                onPageChange={handlePageMove}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeList;
