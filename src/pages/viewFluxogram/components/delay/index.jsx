import { useEffect } from "react";

function DelayNode({ data, onSend }) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      onSend()
    }, (data.value * 1000));

    return () => clearTimeout(timeOut);
  },[])

  return <div></div>;
}

export default DelayNode;
