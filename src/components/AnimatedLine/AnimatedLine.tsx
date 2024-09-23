import './AnimatedLine.scss';

interface Props {
  animate?: boolean;
  width?: string;
  height?: string;
  className?: string;
}

const AnimatedLine = ({
  animate = false,
  width = '50px',
  height = '1px',
  className = ''
}: Props) => {
  return (
    <div className={`container ${className}`} style={{ width, height }}>
      <span className={`line ${animate ? 'animate' : ''}`}></span>
    </div>
  );
};

export default AnimatedLine;
