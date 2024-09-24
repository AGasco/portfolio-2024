import './AnimatedLine.scss';

interface Props {
  animate?: boolean;
  width?: string;
  height?: string;
  backgroundColor?: string;
  className?: string;
}

const AnimatedLine = ({
  animate = false,
  width = '50px',
  height = '1px',
  backgroundColor = '#fff',
  className = ''
}: Props) => {
  return (
    <div className={`container ${className}`} style={{ width, height }}>
      <span
        className={`line ${animate ? 'animate' : ''}`}
        style={{ backgroundColor }}
      ></span>
    </div>
  );
};

export default AnimatedLine;
