//import "../styles/components/toggler.scss";

const Toggler = ({state, onClickHandler, togglerID}:{state:boolean; onClickHandler:() => void; togglerID:string;}) => {

    return(
        <div className="w-14 mt-4 mx-2">
            <div className="flex justify-between items-center border relative rounded-full px-0.5 py-1" style={{
                border:state?"2px solid #1880dc":"2px solid #aaaaaa"
            }}>
                <div className="text-xs" style={{color:state?"black":"#aaaaaa"}}>On</div>
                <div className="text-xs mr-1">Off</div>
                <div className="bg-sky-500 w-5 h-5 absolute rounded-full transition-all ease-in-out duration-300" style={{
                    left:state?"4%":"56%",
                    backgroundColor:state?"#1880dc":"#aaaaaa"
                }}></div>
                <input type="checkbox" id={togglerID} className="w-full h-full absolute left-0 top-0 opacity-0" onChange={onClickHandler} />
            </div>
        </div>
    )
};

export default Toggler;