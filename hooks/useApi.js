import {atomWithStorage} from 'jotai/utils';
import {useAtom} from 'jotai';

const isApiEnabledAtom = atomWithStorage('isApiEnabled', 'false');
const userDataAtom = atomWithStorage('userData', '');
export const useApi = () => {
  const [isApiEnabled, settingIsApiEnabled] = useAtom(isApiEnabledAtom);
  const [data, settingData] = useAtom(userDataAtom);
  const setIsApiEnabled = value => {
    const newValue = value;
    settingIsApiEnabled(newValue);
  };

  const setData = value => {
    const newValue = value;
    settingData(newValue);
  };

  return {
    isApiEnabled,
    setIsApiEnabled,
    data,
    setData,
  };
};
