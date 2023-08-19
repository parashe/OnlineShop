import React from "react";
import { UseMessage } from "resources/resources";

export const Message = () => {
  const messageData = UseMessage();

  const allmessageData = React.useMemo(
    () => messageData?.data,
    [messageData?.data]
  );

  console.log("allmessageData", allmessageData);

  return <></>;
};

export default Message;
