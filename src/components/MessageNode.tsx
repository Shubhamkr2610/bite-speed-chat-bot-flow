import { useDrag } from "react-dnd";
import { BiMessageRoundedDetail } from "react-icons/bi";

// Component for a draggable message node
const MessageNode: React.FC = () => {
  // Define drag properties for the message node
  const [, drag] = useDrag(() => ({
    type: "message", // Define the type of the draggable item
  }));
  return (
    <div
      className="w-52 h-20 p-2 flex flex-col justify-center items-center border border-black rounded-lg mt-4"
      ref={drag}
    >
      <BiMessageRoundedDetail size={"2em"} />
      <h5 className="text-sm">Message</h5>
    </div>
  );
};

export default MessageNode;
