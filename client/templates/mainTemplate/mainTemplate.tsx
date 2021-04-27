import styled from "styled-components"
import Navigation from "../../components/molecules/navigation/navigation";

const MainTemplate: React.FC = ({ children }) => (
  <Template>
    <Navigation />
    {children}
  </Template>
)

const Template = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

export default MainTemplate