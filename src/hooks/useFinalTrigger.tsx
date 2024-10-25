import useDeviceType from './useDeviceType';

type AdjustmentFactors = {
  [device: string]: number;
};

const useFinalTrigger = (
  triggerPointEnter: number,
  adjustmentFactors: AdjustmentFactors = {},
  defaultAdjustment = 1
): number => {
  const device = useDeviceType();

  const adjustmentFactor =
    adjustmentFactors[device] !== undefined
      ? adjustmentFactors[device]
      : defaultAdjustment;

  return triggerPointEnter * adjustmentFactor;
};

export default useFinalTrigger;
