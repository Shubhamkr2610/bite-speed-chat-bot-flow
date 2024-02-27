import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useAppContext } from "../context/AppContext";

// Component for rendering the settings panel for nodes
const SettingsPanel = () => {
  const [message, setMessage] = useState("");
  // Destructure necessary context variables and functions
  const { selectedNode, setSelectedNode, setSettingsPanelOpen } =
    useAppContext();

  // Handler for updating the message content
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (selectedNode) {
      // Update the label of the selected node in the graph
      setSelectedNode({
        ...selectedNode,
        data: { label: e.target.value },
      });
    }
  };

  // Effect to synchronize message content with the selected node
  useEffect(() => {
    setMessage(selectedNode?.data.label);
  }, [selectedNode]);
  return (
    <div className="mt-4">
      <div className="flex gap-2 items-center">
        <div
          className="cursor-pointer"
          onClick={() => setSettingsPanelOpen(false)}
        >
          <IoMdArrowBack size={"2em"} />
        </div>

        <h2 className="text-lg font-semibold">Message</h2>
      </div>

      <textarea
        className="w-52 h-28 m-2 p-2 resize-y rounded-lg"
        value={message}
        onChange={handleChange}
      />
    </div>
  );
};

export default SettingsPanel;
