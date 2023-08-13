import MaintenanceSvg from "../../assets/svg/maintenance.svg";
import "./style.scss";
const Maintenance: React.FC = () => {
  return (
    <main className="maintenance">
      {/* FIX--styles */}
      <img
        className="maintenance__svg"
        src={MaintenanceSvg}
        alt="Maintenance"
        title="SVG belongs to https://storyset.com/"
      />
      <h3>Sorry, our app is under Maintenance</h3>
      <h4>we'll back soon</h4>
    </main>
  );
};

export default Maintenance;
