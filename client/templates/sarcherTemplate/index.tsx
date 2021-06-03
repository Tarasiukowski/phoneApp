import Searcher from '../../components/molecules/searcher/searcher';

import { props } from './types';

const SearcherTemplate: React.FC<props> = ({ children, ...restProps }) => (
  <>
    <Searcher {...restProps} />
    {children}
  </>
);

export { SearcherTemplate };
