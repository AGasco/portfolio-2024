import { ARROW_END, ARROW_START } from '@/constants';
import './CurvedArrow.scss';

interface Props {
  className?: string;
  pathD?: string;
  arrowPosition?: typeof ARROW_START | typeof ARROW_END;
}

const CurvedArrow = ({
  className,
  pathD = 'M100,300 C185,58 244,330 401,197',
  arrowPosition = ARROW_END
}: Props) => {
  return (
    <svg
      className={`${className} curved-arrow`}
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      height="300"
      viewBox="0 0 500 300"
    >
      <defs>
        <marker
          id="arrowhead-end"
          markerWidth="10"
          markerHeight="10"
          refX="5"
          refY="5"
          orient="auto"
        >
          <polygon points="0 0, 10 5, 0 10" fill="white" />
        </marker>

        <marker
          id="arrowhead-start"
          markerWidth="10"
          markerHeight="10"
          refX="5"
          refY="5"
          orient="auto-start-reverse"
        >
          <polygon points="0 0, 10 5, 0 10" fill="white" />
        </marker>
      </defs>

      <path
        d={pathD}
        stroke="white"
        fill="transparent"
        strokeWidth="2"
        markerEnd={
          arrowPosition === ARROW_END ? 'url(#arrowhead-end)' : undefined
        }
        markerStart={
          arrowPosition === ARROW_START ? 'url(#arrowhead-start)' : undefined
        }
      />
    </svg>
  );
};

export default CurvedArrow;
