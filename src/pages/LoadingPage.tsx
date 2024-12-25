import "../styles/pages/loading_page.scss";

const LoadingPage = () => {

    return(
        <div className="loading_page_bg">
            <div className="loader_cont">
                <div className="spinner"></div>
                {/*<h1>Loading...</h1>*/}
            </div>
        </div>
    )
};

export default LoadingPage;