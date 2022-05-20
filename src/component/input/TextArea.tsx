

import { ChangeEvent } from "react";
import "../../styles/input.css"

interface TextAreaPropType{
    selectName: string;
    title?: string;
    type?: string;
    hundleChange: (e:ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string
}

function TextArea({title = "", type = "text", hundleChange, selectName, value}: TextAreaPropType) {
    
    return ( 
        <>
            <div className="input">
                <div className="input_title">
                    {
                        title
                    }
                </div>
                <div className="input_wrap">
                    <textarea rows={8}  value={value} name={selectName} className="input_textarea" onChange={hundleChange}></textarea>
                </div>
            </div>
        </>
     );
}

export default TextArea;