

import { ChangeEvent } from "react";
import "../../styles/input.css"

interface InputPropType{
    selectName: string;
    title?: string;
    type?: string;
    hundleChange: (e:ChangeEvent<HTMLInputElement>) => void;
    value?: string
    readonly?: boolean
}

function Input({title = "", type = "text", hundleChange, selectName, value, readonly}: InputPropType) {
    
    return ( 
        <>
            <div className="input">
                <div className="input_title">
                    {
                        title
                    }
                </div>
                <div className="input_wrap">
                    <input disabled={readonly} value={value} name={selectName} type={ type } className="input_elem" onInput={hundleChange}/>
                </div>
            </div>
        </>
     );
}

export default Input;