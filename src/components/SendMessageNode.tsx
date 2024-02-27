import { Handle, NodeProps, Position, useNodeId } from "reactflow";
import { FaWhatsapp } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import CustomConnectableHandle from "./CustomConnectableHandle";

function SendMessageNode({ data }: NodeProps) {
  const nodeId = useNodeId();
  return (
    <>
      <Handle
        type="target"
        id={nodeId + "a"}
        position={Position.Left}
        isConnectable={true}
      />
      <div className="border border-black rounded">
        <div className="w-52 flex justify-between items-center bg-[#90ee90] pt-[2px] px-[5px] rounded-t">
          <BiMessageRoundedDetail />
          <h5 className="text-sm">Send Message</h5>
          <FaWhatsapp />
        </div>
        <h3 className="p-[5px] text-xs text-center">{data.label}</h3>
      </div>
       <CustomConnectableHandle
       id={nodeId + "b"}
       type="source"
       position={Position.Right}
       isConnectable={1}
      />
    </>
  );
}

export default SendMessageNode;
