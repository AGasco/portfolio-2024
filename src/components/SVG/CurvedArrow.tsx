import './CurvedArrow.scss';

interface Props {
  className?: string;
  pathD?: string;
}

const CurvedArrow = ({
  className,
  pathD = 'M100,300 C185,58 244,330 401,197'
}: Props) => {
  return (
    <svg
      className={`${className} curved-arrow`}
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      height="300"
      viewBox="0 0 500 300"
    >
      <path
        d={pathD}
        stroke="white"
        fill="transparent"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="5"
          refY="5"
          orient="auto"
        >
          <polygon points="0 0, 10 5, 0 10" fill="white" />
        </marker>
      </defs>
    </svg>
  );
};

export default CurvedArrow;
