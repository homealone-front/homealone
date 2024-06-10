type DateSlotPropsType = {
  /**
   * 게시글 날짜
   */
  dateTime?: string;
};

const DateSlot = ({ dateTime }: DateSlotPropsType) => {
  return <span className="text-gray500 text-sm font-light">{dateTime}</span>;
};

export default DateSlot;
