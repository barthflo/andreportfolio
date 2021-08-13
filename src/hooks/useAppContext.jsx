import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const useAppContext = () => {
	const {
		state: { home, filmographyList, filmographyItem, error, initialized },
		dispatch,
		actions,
	} = useContext(AppContext);
	return {
		home,
		filmographyList,
		filmographyItem,
		error,
		initialized,
		dispatch,
		actions,
	};
};

export default useAppContext;
