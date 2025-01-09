import "../styles/components/toggler.scss";

const Toggler = ({state, onClickHandler, togglerID}:{state:boolean; onClickHandler:() => void; togglerID:string;}) => {

    return(
        <div className="toggler_cont">
            <div className="toggler" style={{
                border:state?"2px solid #1880dc":"2px solid #aaaaaa"
            }}>
                <div className="on" style={{color:state?"black":"#aaaaaa"}}>On</div>
                <div className="off">Off</div>
                <div className="toggler_thumb" style={{
                    left:state?"0":"53%",
                    backgroundColor:state?"#1880dc":"#aaaaaa"
                }}></div>
                <input type="checkbox" id={togglerID} className="toggle_checkbox_inp" onChange={onClickHandler} />
            </div>
        </div>
    )
};

export default Toggler;