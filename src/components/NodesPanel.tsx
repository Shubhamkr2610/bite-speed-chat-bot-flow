import { useAppContext } from "../context/AppContext";
import MessageNode from "./MessageNode";
import SettingsPanel from "./SettingsPanel";

const NodesPanel = () => {
  const { settingsPanelOpen } = useAppContext();
  return (
    <div className="w-72 h-[calc(100vh-5rem)] flex flex-col justify-start items-center  bg-[#f3f3f3] shadow-[-7px_6px_15px_0px_#00000024]">
      {/*
        Render either the SettingsPanel or MessageNode component based on the value of settingsPanelOpen from the application context.
      */}
      {settingsPanelOpen ? <SettingsPanel /> : <MessageNode />}
    </div>
  );
};

export default NodesPanel;
