import { Clock, CreditCard } from 'lucide-react';

type PriceSlotPropsType = {
  cookInfo: {
    /**
     * 요리시간
     */
    cookTime: string;

    /**
     * 재료가격
     */
    cookPrice: string;
  };
};

const PriceSlot = ({ cookInfo }: PriceSlotPropsType) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 items-center">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-light">{cookInfo?.cookTime}</span>
      </div>
      <div className="flex gap-1 items-center">
        <CreditCard className="w-4 h-4" />
        <span className="text-sm font-light">{cookInfo?.cookPrice}</span>
      </div>
    </div>
  );
};

export default PriceSlot;
