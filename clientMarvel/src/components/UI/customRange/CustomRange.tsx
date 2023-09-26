import css from './CustomRange.module.sass'

interface CustomRangeProps {
  max: number;
  currentValue: number | null;
  onChange: (value: number) => void;
}

function CustomRange({ max, currentValue, onChange }: CustomRangeProps) {

  const valueToShow = currentValue !== null ? currentValue : max;

  return (
    <div>
      <input
        className={valueToShow > 50 ? css.heigh : css.less}
        type="range"
        min="0"
        max={max}
        value={valueToShow}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      />
      <div className={css.content}>
        <p>Price:</p>
        <p>{currentValue ? currentValue : max}$</p>
      </div>
    </div>
  );
}

export default CustomRange;
