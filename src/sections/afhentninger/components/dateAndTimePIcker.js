import React, { useState } from "react";
import { DateTimePicker} from "@material-ui/pickers";
import { milliseconds } from "date-fns";

function InlineDateTimePicker(props) {


  const [selectedDate, handleDateChange] = useState(new Date(milliseconds));

  return (
    <>
      <DateTimePicker
        variant="inline"
        label="Basic example"
        value={selectedDate}
        onChange={handleDateChange}
        
      />

      
    </>
  );
}

export default InlineDateTimePicker;