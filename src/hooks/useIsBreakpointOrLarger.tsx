import { BREAKPOINTS_ORDER } from '@/constants';
import useDeviceType from './useDeviceType';

const useIsBreakpointOrLarger = (targetBreakpoint: string): boolean => {
  const device = useDeviceType();

  const breakpointIndex = BREAKPOINTS_ORDER.indexOf(targetBreakpoint);
  const deviceIndex = BREAKPOINTS_ORDER.indexOf(device);

  return deviceIndex >= breakpointIndex;
};

export default useIsBreakpointOrLarger;
