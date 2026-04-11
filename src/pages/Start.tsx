import bg from "/bg-3.jpg";
import { useNavigate } from "react-router-dom";


const Start = () => {
    const navigate = useNavigate();


    return(
        <div className="max-w-xs min-h-screen mx-auto flex flex-col justify-around">
            <div className="relative">
                <div className="absolute top-4 left-4 text-2xl font-semibold text-gray-200">Uber Clone</div>
                <img className="h-90" src={bg} alt={bg} />
            </div>
            <h1 className="text-gray-800 text-xl font-semibold mb-10 mx-2">Get started with Uber</h1>
            <div className="w-full px-2">
                <button className="bg-gray-800 text-gray-50 w-full py-2 text-lg rounded-xl hover:opacity-85 cursor-pointer" onClick={() => navigate("/user/home")}>Continue</button>
            </div>
        </div>
    )
};

export default Start;