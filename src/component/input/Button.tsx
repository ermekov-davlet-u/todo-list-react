import "../../styles/input.css"

interface ByttonPropType{
    title: string;
    clickFunc: () => void
}

function Button({ title, clickFunc }: ByttonPropType) {
    return ( 
        <>
            <div className="button_wrap">
                <button className="button" onClick={clickFunc}>
                    {
                        title
                    }
                </button>
            </div>
        </>
     );
}

export default Button;