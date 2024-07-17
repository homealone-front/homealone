import { useState, useRef, ChangeEvent } from 'react';
import { useForm, FormProvider, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Undo2, CircleXIcon, CircleCheck } from 'lucide-react';
import * as yup from 'yup';

import { Appbar } from '@/components/Appbar';
import { Layout } from '@/layout';
import { ListTitle } from '@/pages/Main/components/ListTitle';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';

import { Button } from '@/components/ui/button';
import { IngredientFields } from './components/IngredientFields';
import { CookingOrderFields } from './components/CookingOrderFields';
import { Spinner } from '@/components/Spinner';

import { useToast } from '@/hooks/useToast';

import { getRecipeCleansingData } from '@/pages/RecipeWrite/util';

import { FOOD_CATEGORIES, COOK_TIME, PORTIONS, RECIPE_TYPE } from '@/pages/RecipeWrite/constants';
import { PATH } from '@/constants/paths';

import { RecipeSchema } from './validator';
import { isAxiosError } from 'axios';
import { TOAST } from '@/constants/toast';

import { recipeEditPatchFetch } from '@/api/recipe/recipeEditPatchFetch';

import { useLocation, useNavigate } from 'react-router-dom';
import { useRecipeEditQuery } from '@/services/recipe/useRecipeEditQuery';
import { getRecipeDetailDataCleansing } from './util';

export type RecipeSchemaType = yup.InferType<typeof RecipeSchema>;

/**
 * 레시피 수정 컴포넌트
 */
const RecipeEditForm = () => {
  const { pathname } = useLocation();

  const id = pathname.split('/')[2];

  const { data, isFetching } = useRecipeEditQuery({ id });

  const navigate = useNavigate();

  const { toast } = useToast();

  const [displaySpinner, setDisplaySpinner] = useState<boolean>(false);

  const method = useForm({
    resolver: yupResolver(RecipeSchema),
    values: data
      ? { ...getRecipeDetailDataCleansing(data) }
      : {
          title: '',
          description: '',
          cuisine: '한식',
          recipeType: '밥/죽/떡',
          recipeTime: '15분',
          portions: '1인분',
          images: [
            {
              image: {} as File,
              imageUrl: '',
            },
          ],
          ingredients: [
            {
              name: '',
              quantity: '',
              unit: '',
            },
          ],
          details: [
            {
              image: {} as File,
              imageUrl: '',
              description: '',
            },
          ],
        },
  });

  const {
    handleSubmit: submit,
    control,
    watch,
    getValues,
    clearErrors,
    setValue,
    formState: { errors },
  } = method;

  const file = watch(`images.${0}`);
  const uploadRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = () => {
    uploadRef.current?.click();

    clearErrors('images');
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = e.target;

    if (files && files.length > 0) {
      const uploadFile = files[0];

      setValue(`images.${0}.image`, uploadFile);

      const imageUrl = URL.createObjectURL(uploadFile);

      setValue(`images.${0}.imageUrl`, imageUrl);
    }
  };

  const handleSubmit = submit(async () => {
    try {
      setDisplaySpinner(true);

      const editParams = await getRecipeCleansingData(getValues());

      const editRes = await recipeEditPatchFetch({ ...editParams, id: parseInt(id, 10) });

      setDisplaySpinner(false);

      toast({
        title: editRes.data.message || '레시피를 수정했어요!',
        icon: <CircleCheck />,
        className: TOAST.success,
      });

      navigate(`${PATH.recipe}/${id}`);
    } catch (error) {
      console.error(error);

      if (isAxiosError(error)) {
        setDisplaySpinner(false);

        toast({
          title: error?.response?.data.message || '레시피 수정에 실패했어요.',
          icon: <CircleXIcon />,
          className: TOAST.error,
        });
      }
    }
  });

  return (
    <>
      {displaySpinner ? <Spinner>레시피를 수정 중 이에요 ... </Spinner> : null}

      {isFetching ? (
        <Spinner>로딩 중이에요 ...</Spinner>
      ) : (
        <>
          <Appbar />
          <Layout>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate(`${PATH.recipe}/${id}`)}
            >
              <Undo2 />
              <span className="text-xl">돌아갈래요</span>
            </Button>
            <div className="-mt-8">
              <ListTitle imgPath="/icons/receipe_icon.png" title="레시피 수정 중이에요 ..." />
            </div>
            <FormProvider {...method}>
              <div className="container flex justify-between w-11/12 mx-auto">
                <div className="basis-1/2">
                  <div className="mt-8">
                    <Input
                      control={control}
                      name="title"
                      type="text"
                      label="레시피 제목"
                      placeholder="레시피 제목을 입력해주세요."
                      error={errors?.title as FieldError}
                      value={watch('title')}
                    />
                  </div>
                  <div className="mt-8">
                    <Input
                      control={control}
                      name="description"
                      type="text"
                      label="간단한 한 줄 소개"
                      placeholder="간단한 한 줄 소개 20자 이내로 입력해주세요"
                      error={errors?.description as FieldError}
                      value={watch('description')}
                    />
                  </div>
                  <div className="mt-8">
                    <Select name="cuisine" id="cuisine" label="카테고리" options={FOOD_CATEGORIES} />
                  </div>
                  <div className="mt-8">
                    <Select name="recipeType" id="recipeType" label="요리 유형" options={RECIPE_TYPE} />
                  </div>
                  <div className="mt-8">
                    <Select name="recipeTime" id="recipeTime" label="조리시간" options={COOK_TIME} />
                  </div>
                  <div className="mt-8">
                    <Select name="portions" id="portions" label="👨🏿‍🦳인분" options={PORTIONS} />
                  </div>
                </div>
                <div className="mt-8 upload basis-5/12">
                  <div
                    style={{
                      backgroundImage: file.imageUrl ? `url(${file.imageUrl})` : 'none',
                      backgroundSize: 'cover',
                    }}
                    className={`group rounded-xl w-full h-full opacity-90 flex items-center justify-center ${
                      file && file instanceof File
                        ? `bg-cover bg-center bg-no-repeat border border-gray300`
                        : 'bg-[#f5f5f5]'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Button
                        className={`flex gap-4 ${
                          file.imageUrl ? 'text-gray700 bg-white hidden group-hover:block' : 'text-gray400'
                        }`}
                        variant="ghost"
                        onClick={handleUploadImage}
                      >
                        대표이미지 수정하기
                      </Button>
                    </div>
                  </div>

                  <input ref={uploadRef} className="hidden" accept="image/*" type="file" onChange={handleFileChange} />
                </div>
              </div>
              <div className="container flex flex-col w-11/12 mx-auto mt-8">
                <ul>
                  <li>재료정보</li>
                  <li className="mt-2 text-sm text-gray400">
                    재료가 남거나 부족하지 않도록 정확한 계량 정보를 적어주세요!
                  </li>
                </ul>
                <div className="flex flex-col justify-center w-full">
                  <IngredientFields />
                </div>
              </div>
              <div className="container flex flex-col w-11/12 mx-auto mt-8 mb-20">
                <ul>
                  <li>조리 순서</li>
                  <li className="mt-2 text-sm text-gray400">이해를 돕기 위해 사진을 업로드해주세요! (선택사항)</li>
                </ul>
                <div className="flex flex-col justify-center w-full">
                  <CookingOrderFields />
                </div>
              </div>
              <div className="py-20 mx-auto w-fit">
                <Button className="w-24 text-lg rounded-lg" onClick={handleSubmit}>
                  수정하기
                </Button>
              </div>
            </FormProvider>
          </Layout>
        </>
      )}
    </>
  );
};

export default RecipeEditForm;
