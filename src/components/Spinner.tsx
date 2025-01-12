import "../styles/components/spinner.scss";

interface SpinnerPropTypes{
    width?:string;
    border?:string;
    borderTop?:string;
};

const Spinner = ({width, border, borderTop}:SpinnerPropTypes) => {
    
    return(
        <div className="spinner_cont" style={{
            width:width?width:"10px",
            height:width?width:"10px",
            border:border?border:"2px solid #eeeeee",
            borderTop:borderTop?borderTop:"2px solid black",
            }}>

        </div>
    )
};

export default Spinner;