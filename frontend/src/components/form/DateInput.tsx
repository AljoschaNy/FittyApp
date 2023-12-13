import {DateInputType} from "../../types/types.ts";

function DateInput(props:Readonly<DateInputType>) {

    return (
        <div className={"workout-form-input"}>
            <label>
                <h3 className={"input-label"}>{props.name}</h3>
                <input
                    type={"date"}
                    name={"day"}
                    value={props.value}
                    onChange={props.onChange}
                    required={true}
                />
            </label>
            <br/>
        </div>
    );
}

export default DateInput;
