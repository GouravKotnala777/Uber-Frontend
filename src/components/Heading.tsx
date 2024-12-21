import "../styles/components/heading.scss";

interface HeadingPropTypes{
    text:string;
    fontSize?:string;
    fontWeight?:number;
}

const Heading = ({text, fontSize, fontWeight}:HeadingPropTypes) => {

    return(
        <div className="heading_cont">
            <div className="heading" style={{
                fontSize:fontSize?fontSize:"1.3rem",
                fontWeight:fontWeight?fontWeight:700
            }}>{text}</div>
        </div>
    )
};

export default Heading;