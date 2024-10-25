import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_LARGEDESKTOP,
  BREAKPOINT_MOBILE,
  BREAKPOINT_TABLET,
  BREAKPOINT_XLDESKTOP,
  breakpoints
} from '@/constants';
import useWindowSize from './useWindowSize';

const useDeviceType = () => {
  const { width } = useWindowSize();

  if (!width) return BREAKPOINT_MOBILE;
  if (width >= breakpoints.xlDesktop) return BREAKPOINT_XLDESKTOP;
  if (width >= breakpoints.largeDesktop) return BREAKPOINT_LARGEDESKTOP;
  if (width >= breakpoints.desktop) return BREAKPOINT_DESKTOP;
  if (width >= breakpoints.tablet) return BREAKPOINT_TABLET;
  return BREAKPOINT_MOBILE;
};

export default useDeviceType;
