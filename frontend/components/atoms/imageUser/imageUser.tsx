import styled from 'styled-components';

interface props {
  mini?: Boolean;
}

const Image = styled.div<props>`
  width: ${({ mini }) => (mini ? '35px' : '70px')};
  height: ${({ mini }) => (mini ? '35px' : '70px')};
  background-color: #21d19f;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ mini }) => mini ? "9px" : null};

  p {
    font-size: ${({ mini }) => (mini ? '1.2rem' : ' 2.4rem')};
    font-weight: 600;
  }
`;

const ImageUser = ({ mini }: props) => (
  <Image mini={mini}>
    <p>MT</p>
  </Image>
);

export default ImageUser;
