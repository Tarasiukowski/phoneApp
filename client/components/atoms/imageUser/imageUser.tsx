import styled from 'styled-components';

const Image = styled.div`
  background-color: #9c5ab6;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin-left: 9px;

  p {
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
  }
`;

const ImageUser = () => (
  <Image>
    <p>MT</p>
  </Image>
);

export default ImageUser;
