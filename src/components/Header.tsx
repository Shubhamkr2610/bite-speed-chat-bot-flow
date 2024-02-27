import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { checkNodesConnection } = useAppContext();

  // Function to handle saving the flow after checking node connections
  const nodeSaveHandler = () => {
    let validSave = false;
    // Check if all nodes are connected before allowing to save
    if (checkNodesConnection) {
      validSave = checkNodesConnection(1);
    }
    validSave
      ? toast.success("Flow saved successfully") // Display success message if save is valid
      : toast.error("Cannot save flow"); // Display error message if save is invalid
  };

  return (
    <div className="h-20 flex justify-between items-center px-10 bg-[#efefef] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <h5 className="text-2xl font-semibold">ChatBot Flow Builder</h5>
      <button
        onClick={nodeSaveHandler}
        className="w-48 h-12 p-2 border border-black rounded-lg "
      >
        Save changes
      </button>
    </div>
  );
};

export default Header;
