import { IDLE } from '@/constants';
import { ProjectAnimPhase } from '@/types';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  idx: number;
  src: string;
  screenshotsLength: number;
  isInView: boolean;
  animPhase: ProjectAnimPhase;
  objectPosition: string;
  targetPosition: number;
  setTargetPosition: Dispatch<SetStateAction<number>>;
}

const ProjectScreenshot = ({
  idx,
  src,
  screenshotsLength,
  isInView,
  animPhase,
  objectPosition,
  targetPosition,
  setTargetPosition
}: Props) => {
  const getImgTransformValues = (idx: number) => {
    let positionOffset = idx - targetPosition;
    if (positionOffset < 0) positionOffset += screenshotsLength;

    let translateZValue;
    let rotateYValue;

    if (!isInView) {
      if (positionOffset === 0) {
        translateZValue = 100;
        rotateYValue = 0;
      } else {
        translateZValue = positionOffset * -300;
        rotateYValue = positionOffset * 20;
      }
    } else if (animPhase === IDLE) {
      translateZValue = positionOffset * -200;
      rotateYValue = positionOffset * 10;
    } else {
      translateZValue = 0;
      rotateYValue = 0;
    }

    return { translateZValue, rotateYValue };
  };

  const { translateZValue, rotateYValue } = getImgTransformValues(idx);
  let positionOffset = idx - targetPosition;
  if (positionOffset < 0) positionOffset += screenshotsLength;

  const zIndex = screenshotsLength - positionOffset;
  const opacity = Math.max(1 - positionOffset * 0.2, 0.2);

  return (
    <img
      key={idx}
      src={src}
      className={`screenshot ${idx === targetPosition ? 'active' : ''}`}
      style={{
        transform: `translateZ(${translateZValue}px) rotateY(${rotateYValue}deg)`,
        transition: 'transform 1s ease',
        zIndex,
        opacity,
        objectPosition
      }}
      onClick={() => setTargetPosition(idx)}
    />
  );
};

export default ProjectScreenshot;
