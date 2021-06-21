import { Content } from './styles';

import { props } from './types'
import SpinnerSvg from '../../../public/svgs/spinner.svg';

const Spinner = ({ mini, extraStyle }: props) => (
  <Content mini={mini} extraStyle={extraStyle}>
    <div className="spinner">
      <SpinnerSvg />
    </div>
  </Content>
);

export { Spinner };
