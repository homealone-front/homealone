type PropType = {
  selected: boolean;
  onClick: () => void;
  image: string | undefined;
};

export const Thumb = (props: PropType) => {
  const { selected, onClick, image } = props;

  return (
    <div className={'embla-thumbs__slide'.concat(selected ? ' embla-thumbs__slide--selected' : '')}>
      <button
        style={{
          backgroundImage: `url(${image})`,
          backgroundColor: '#fff',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number rounded-2xl border shadow-sm"
      ></button>
    </div>
  );
};
