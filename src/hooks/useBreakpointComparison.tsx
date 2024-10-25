import { BREAKPOINTS_ORDER, LARGER, SMALLER } from '@/constants';
import useDeviceType from './useDeviceType';

type Direction = typeof LARGER | typeof SMALLER;

const useBreakpointComparison = (
  targetBreakpoint: string,
  direction: Direction
): boolean => {
  const device = useDeviceType();

  const breakpointIndex = BREAKPOINTS_ORDER.indexOf(targetBreakpoint);
  const deviceIndex = BREAKPOINTS_ORDER.indexOf(device);

  return direction === LARGER
    ? deviceIndex >= breakpointIndex
    : deviceIndex <= breakpointIndex;
};

export default useBreakpointComparison;
