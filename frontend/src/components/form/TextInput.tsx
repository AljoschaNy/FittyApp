import React from "react";

type TextInputType = {
    name: string,
    value: string,
    placeholder?: string,
    onChange: (event:React.ChangeEvent<HTMLInputElement>) => void
}
function TextInput(props:TextInputType) {
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