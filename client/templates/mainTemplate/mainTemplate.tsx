import Navigation from "../../components/molecules/navigation/navigation";

const MainTemplate: React.FC = ({ children }) => (
  <>
    <Navigation />
    {children}
  </>
)

export default MainTemplate