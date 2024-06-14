import { Clock, User } from 'lucide-react';

type PriceSlotPropsType = {
  cookInfo: {
    /**
     * 요리시간
     */
    cookTime: string;

    /**
     * N인분
     */
    portions: number;
  };
};

const PriceSlot = ({ cookInfo }: PriceSlotPropsType) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-light">{cookInfo?.cookTime}분</span>
      </div>
      <div className="flex items-center gap-1">
        <User className="w-4 h-4" />
        <span className="text-sm font-light">{cookInfo?.portions}인분</span>
      </div>
    </div>
  );
};

export default PriceSlot;
