import { breakpoints } from '@/constants';
import useWindowSize from './useWindowSize';

const useDeviceType = () => {
  const { width } = useWindowSize();

  if (!width) return 'mobile';
  if (width >= breakpoints.largeDesktop) return 'largeDesktop';
  if (width >= breakpoints.desktop) return 'desktop';
  if (width >= breakpoints.tablet) return 'tablet';
  return 'mobile';
};

export default useDeviceType;
