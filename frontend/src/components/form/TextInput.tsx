import React from "react";
import {TextInputType} from "../../types/types.ts";

function TextInput(props:Readonly<TextInputType>) {
    return (
        <div className={"workout-form-input"}>
            <label>
                <h3 className={"input-label"}>{props.name}</h3>
                <input
                    type={"text"}
                    name={props.name.toLowerCase()}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => props.onChange(event)}
                />
            </label>
            <br/>
        </div>
    )
}

export default TextInput;