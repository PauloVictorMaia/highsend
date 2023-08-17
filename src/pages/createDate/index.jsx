import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const CreateDate = () => {
    const [value, onChange] = useState(new Date());
    console.log()

    return (
        <div>
            <DateTimePicker open={true} minDate={new Date()} onChange={onChange} value={value} />
        </div>
    );
};

export default CreateDate;