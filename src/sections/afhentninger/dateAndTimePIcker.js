import React, { useState } from "react";
import { DateTimePicker} from "@material-ui/pickers";

function InlineDateTimePicker(props) {


  const [selectedDate, handleDateChange] = useState(new Date("2021-01-01T00:00:00.000Z"));

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