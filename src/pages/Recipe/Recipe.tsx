import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { Card } from '@/components/Card';

import { Searchbar } from '@/components/Searchbar';
import { Select } from '@/components/Select';

import { ListTitle } from '@/pages/Main/components/ListTitle';
import { PriceSlot } from '@/pages/Main/components/PriceSlot';
import { RECIPE_CATEGORY_OPTIONS } from '../Main/constants';
import { Pagination } from '@/components/Pagination';

import { useNavigate, generatePath } from 'react-router-dom';
import { PATH, RECIPE_PATH } from '@/constants/paths';
import { Button } from '@/components/ui/button';

import { useRecipeListQuery } from '@/services/recipe/useRecipeListQuery';
import { SkeletonCard } from '@/components/Skeleton';
import { useUserStore } from '@/store/useUserStore';
// import { useTrendsRecipeListQuery } from '@/services/recipe/useTrendsRecipeListQuery';
import { NoContents } from '../MyPosts/components/NoContents';
import { NAV_TABS } from '../MyPosts/constants';

/**
 * 레시피 페이지 컴포넌트
 */
const Recipe = () => {
  const navigate = useNavigate();

  const accessToken = useUserStore((state) => state.accessToken);

  const [currentPage, setCurrentPage] = useState<number>(0);

  const method = useForm({
    values: { category: 'all', query: '' },
  });

  const { getValues } = method;

  const { category, query } = getValues();

  const { data, isLoading, refetch } = useRecipeListQuery({ page: currentPage, size: 20, category, query });

  const handlePageMove = (page: number) => {
    setCurrentPage(page);
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <>
      <FormProvider {...method}>
        <div className="flex w-[40rem] gap-4 mx-auto">
          <Select name="category" options={RECIPE_CATEGORY_OPTIONS} />
          <div className="w-[40rem] m-auto relative">
            <Searchbar onSearch={handleRefetch} />
          </div>
        </div>
      </FormProvider>
      {!data?.content.length && !isLoading ? (
        <div className="flex justify-center">
          <NoContents {...NAV_TABS.recipe} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <ListTitle
              imgPath="/icons/receipe_icon.png"
              description="오늘도 맛있는 하루! 어떤 요리를 해볼까요?"
              title="모든 레시피"
            />
            {!accessToken ? null : (
              <Button className="rounded-full" onClick={() => navigate(PATH.recipeWrite)}>
                새 글 작성
              </Button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-12 place-items-start">
            {isLoading
              ? Array.from({ length: 20 }).map((_, index) => <SkeletonCard key={index} />)
              : data?.content?.map((card, i) => (
                  <Card
                    key={i}
                    title={card?.title}
                    description={card?.description}
                    userName={card?.userName}
                    imageUrl={card?.imageUrl}
                    lineClamp={1}
                    slot={
                      <PriceSlot
                        cookInfo={{
                          portions: card?.portions === 9 ? '6' : card?.portions.toString(),
                          cookTime: card?.recipeTime,
                        }}
                      />
                    }
                    likes={card?.relatedDto.likeCount}
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
          <Pagination totalPage={data?.totalPages as number} currentPage={currentPage} onPageChange={handlePageMove} />
        </>
      )}
    </>
  );
};

export default Recipe;
