import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[300px] rounded-xl bg-slate-300" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-slate-300" />
        <Skeleton className="h-4 w-[200px] bg-slate-300" />
      </div>
    </div>
  );
};

export default SkeletonCard;
