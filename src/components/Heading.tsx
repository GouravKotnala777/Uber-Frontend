import "../styles/components/heading.scss";

interface HeadingPropTypes{
    text:string;
    fontSize?:string;
    fontWeight?:number;
    padding?:string;
}

const Heading = ({text, fontSize, fontWeight, padding}:HeadingPropTypes) => {

    return(
        <div className="heading_cont">
            <div className="heading" style={{
                fontSize:fontSize?fontSize:"1.3rem",
                fontWeight:fontWeight?fontWeight:800,
                padding:padding?padding:"0"
            }}>{text}</div>
        </div>
    )
};

export default Heading;