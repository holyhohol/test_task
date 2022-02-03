import React, {useState, useEffect} from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import styles from '../scss/custom-datepicker.scss'

function DateRangePicker({ranges, onChange}) {
  const [period, setPeriod] = useState({ from: undefined, to: undefined });

  useEffect(() => {
    !from && showFromMonth()

    onChange(period)
  }, [period]);
  

  const showFromMonth = () => {
    const { from, to } = period;
    if (!from) {
      return;
    }
    if (
      (to.getFullYear() - from.getFullYear()) * 12 +
        (to.getMonth() + 1) -
        (from.getMonth() + 1) <
      2
    ) {
      to.getDatePicker().showMonth(from);
    }
  };

  const handleFromChange = (from) => {
    setPeriod( {...period, from });
  };

  const handleToChange = (to) => {
    setPeriod({ ...period, to });
  };

  const disabledDates = 
    {
      before: new Date(ranges?.post_created_date),
      after: new Date(ranges?.today_date),
    }

  let { from, to } = period;
  const modifiers = { start: from, end: to };
  return (
      
    <div >
      <DayPickerInput
        classNames={styles}
        value={from}
        placeholder="From"
        format="LL"
        dayPickerProps={{
          selectedDays: [from, { from, to }],
          disabledDays: [{ after: to }, disabledDates],
          toMonth: to,
          modifiers,
          numberOfMonths: 2,
          onDayClick: () => to.getInput().focus(),
        }}
        onDayChange={handleFromChange}
      />{" "}
      —{" "}
      <span className="InputFromTo-to">
        <DayPickerInput
          classNames={styles}
          ref={(el) => (to = el)}
          value={to}
          placeholder="To"
          format="LL"
          dayPickerProps={{
            selectedDays: [{ from, to }],
            disabledDays: [{ before: from }, disabledDates],
            modifiers,
            month: from,
            fromMonth: from,
            numberOfMonths: 2,
          }}
          onDayChange={handleToChange}
        />
      </span>
    </div>
  );
}

export default DateRangePicker;
