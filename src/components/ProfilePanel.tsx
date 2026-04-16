import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState } from "react";
//import "../styles/components/profile_panel.scss";
import { DriverTypes, DriverTypesPopulated, UserTypes, VehicleTypeTypes } from "../utils/types";
import Heading from "./Heading";
import ShowHideToggler from "./ShowHideToggler";
import { MdChangeCircle } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { removeDriverProfileImage, removeProfileImage, updateMyDrivingProfile, updateMyProfile, uploadDriverProfileImage, uploadProfileImage } from "../api";
import Button from "./Button";
import ImgWithFallback from "./ImgWithFallback";
import { Link, useNavigate } from "react-router-dom";

interface ProfilePanelPropTypes{
    isMyProfilePanelActive:boolean;
    setIsMyProfilePanelActive:Dispatch<SetStateAction<boolean>>;
    profileFor:"passenger"|"driver";
    profile:UserTypes|DriverTypesPopulated;
    setProfile:Dispatch<SetStateAction<
        {
            isLoading: boolean;
            user?: UserTypes|null;
            driver?: DriverTypesPopulated|null;
        }
    >>;
};

const ProfilePanel = ({isMyProfilePanelActive, setIsMyProfilePanelActive, profileFor, profile, setProfile}:ProfilePanelPropTypes) => {
    const [updateUserProfileForm, setUpdateUserProfileForm] = useState<Partial<Pick<UserTypes, "name"|"email"|"mobile">>&{password?:string; oldPassword:string;}>({oldPassword:""});
    const [updateDriverProfileForm, setUpdateDriverProfileForm] = useState<Partial<Pick<DriverTypes, "licenseNumber"|"availabilityStatus">>&{vehicleColor?:string; vehicleModel?:string; vehicleNumber?:string; vehicleType?:VehicleTypeTypes}>({});
    const [selectedFieldsForUserUpdate, setSelectedFieldsForUserUpdate] = useState<string[]>([]);
    const [selectedFieldsForDriverUpdate, setSelectedFieldsForDriverUpdate] = useState<string[]>([]);
    const navigate = useNavigate();

    const fileChangeHandler = async(e:ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        
        if (files && files[0]) {
            const formData = new FormData();
            formData.append("image", files[0] as File);
            if (profileFor === "passenger") {
                const uploadedImage = await uploadProfileImage(formData);
                if (uploadedImage.success) {
                    setProfile({isLoading:false, user:uploadedImage.jsonData});
                }
            }
            else{
                const uploadedImage = await uploadDriverProfileImage(formData);
                if (uploadedImage.success) {
                    setProfile({isLoading:false, driver:uploadedImage.jsonData});
                }
            }
        }
    };

    const removeProfileImageHandler = async() => {
        if (profileFor === "passenger") {
            const res = await removeProfileImage();
            if (res.success) {
                setProfile({isLoading:false, user:res.jsonData});
            }
        }
        else{
            const res = await removeDriverProfileImage();
            if (res.success) {
                setProfile({isLoading:false, driver:res.jsonData});
            }
        }
    }

    const updateUserFiledOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdateUserProfileForm({...updateUserProfileForm, [e.target.name]:e.target.value});
    };
    const updateDriverFiledOnChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdateDriverProfileForm({...updateDriverProfileForm, [e.target.name]:e.target.value});
    };
    const includeExcludeFieldToUpdateUserHandler = (e:MouseEvent<SVGElement>) => {
        if (selectedFieldsForUserUpdate.includes(e.currentTarget.id)) {
            setSelectedFieldsForUserUpdate(selectedFieldsForUserUpdate.filter((item) => item !== e.currentTarget.id));
        }
        else{
            setSelectedFieldsForUserUpdate([...selectedFieldsForUserUpdate, e.currentTarget.id]);
        }
    };
    const includeExcludeFieldToUpdateDriverHandler = (e:MouseEvent<SVGElement>) => {
        if (selectedFieldsForDriverUpdate.includes(e.currentTarget.id)) {
            setSelectedFieldsForDriverUpdate(selectedFieldsForDriverUpdate.filter((item) => item !== e.currentTarget.id));
        }
        else{
            setSelectedFieldsForDriverUpdate([...selectedFieldsForDriverUpdate, e.currentTarget.id]);
        }
    };

    const updateUserProfile = async() => {
        console.log({updateUserProfileForm});
        
        const res = await updateMyProfile(updateUserProfileForm);

        if (res.success) {
            setProfile({isLoading:false, user:res.jsonData});
            setSelectedFieldsForUserUpdate([]);
        }
    };
    const updateDriverProfile = async() => {
        const res = await updateMyDrivingProfile(updateDriverProfileForm);

        if (res.success) {
            setProfile({isLoading:false, driver:res.jsonData});
            setSelectedFieldsForDriverUpdate([]);
        }
    };

    return(
        <div className="bg-gray-50 absolute transition-all duration-300 ease-in-out z-10 h-full w-full p-2" 
        style={{
            top:isMyProfilePanelActive?"0%":"100%"
        }}
        >
            <ShowHideToggler toggleHandler={() => setIsMyProfilePanelActive(false)} />
            <Heading text="My profile" fontSize="16px" fontWeight={600} />
            <div className="overflow-y-scroll h-[85%] scrollbar-soft">
                <div className="w-40 h-40 relative mx-auto">
                    <ImgWithFallback src={profile?.image as string} fallbackSrc="unknown_user.png" />
                    <div className="w-10 h-10 overflow-hidden absolute right-0 bottom-0">
                        <MdChangeCircle className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-3xl" />
                        <form>
                            <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0" name="image" onChange={(e) => fileChangeHandler(e)} />
                        </form>
                    </div>
                </div>
                {
                    profile.image &&
                        <Button text="Remove my profile image" background="#ffcece" border={true} color="red" margin="0 0 10px 0" onClickHandler={removeProfileImageHandler} />
                }
                {
                    profileFor === "passenger" ?
                    <div className="">
                        <Heading text="My user details" fontSize="16px" padding="10px 0 5px 0" fontWeight={400} />
                        <div className=""> 
                            <ProfleSingleFiled 
                                keyName="Name"
                                valueName={(profile as UserTypes).name}
                                fieldName="name"
                                placeHolderValue="New user name"
                                updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                            />
                            <ProfleSingleFiled 
                                keyName="Email"
                                valueName={(profile as UserTypes).email}
                                fieldName="email"
                                placeHolderValue="New user email"
                                updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                            />
                            <ProfleSingleFiled 
                                keyName="Password"
                                valueName="************"
                                fieldName="password"
                                placeHolderValue="New user password"
                                updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                            />
                            <ProfleSingleFiled 
                                keyName="Mobile"
                                valueName={(profile as UserTypes).mobile}
                                fieldName="mobile"
                                placeHolderValue="New user mobile"
                                updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                            />
                            
                            {
                                selectedFieldsForUserUpdate.length !== 0 &&
                                <>
                                    <div className="flex justify-between items-center text-gray-700 text-sm p-1">
                                        <div className="text-gray-500">Old password</div>
                                        <div className="">
                                            <input className="border px-1" type="text" name="oldPassword" placeholder="Your old password" onChange={(e) => updateUserFiledOnChangeHandler(e)} />
                                        </div>
                                    </div>
                                    <Button text="Update my profile" margin="15px 0 0 0" onClickHandler={updateUserProfile} />
                                </>
                            }
                        </div>
                        <span style={{display:"inline-block", margin:"15px 0"}}>Register as driver</span> &nbsp;
                        <Link to="/driver/register" style={{margin:"15px 0"}}>register</Link>
                        <Button text="Logout" onClickHandler={() => navigate("/logout", {state:{logoutFor:"user"}})} />
                    </div>
                    :
                    <>
                        <Heading text="My user details" fontSize="0.9rem" padding="10px 0 5px 0" />
                        <div className="user_info_cont"> 
                            <ProfleSingleFiled 
                                keyName="Name"
                                valueName={(profile as DriverTypesPopulated).userID.name}
                                fieldName="name"
                                placeHolderValue="New user name"
                                updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                            />
                            <ProfleSingleFiled 
                                keyName="Email"
                                valueName={(profile as DriverTypesPopulated).userID.email}
                                fieldName="email"
                                placeHolderValue="New user email"
                                updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                            />
                            <ProfleSingleFiled 
                                keyName="Password"
                                valueName="************"
                                fieldName="password"
                                placeHolderValue="New user password"
                                updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                            />
                            <ProfleSingleFiled 
                                keyName="Mobile"
                                valueName={(profile as DriverTypesPopulated).userID.mobile}
                                fieldName="mobile"
                                placeHolderValue="New user mobile"
                                updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                            />
                            
                            {
                                selectedFieldsForUserUpdate.length !== 0 &&
                                <>
                                    <div className="flex justify-between items-center text-gray-700 text-sm p-1">
                                        <div className="text-gray-500">Old password</div>
                                        <div className="">
                                            <input className="border px-1" type="text" name="oldPassword" placeholder="Your old password" onChange={(e) => updateUserFiledOnChangeHandler(e)} />
                                        </div>
                                    </div>
                                    <Button text="Update my profile" margin="15px 0 0 0" onClickHandler={updateUserProfile} />
                                </>
                            }
                        </div>
                        <Heading text="My driver details" fontSize="16px" padding="10px 0 5px 0" fontWeight={400} />
                        <div className="driver_info_cont"> 
                            <ProfleSingleFiled 
                                keyName="License Number"
                                valueName={(profile as DriverTypesPopulated).licenseNumber}
                                fieldName="licenseNumber"
                                placeHolderValue="New driving license"
                                updateFiledOnChangeHandler={updateDriverFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForDriverUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateDriverHandler}
                            />
                            <ProfleSingleFiled 
                                keyName="Vehicle Color"
                                valueName={(profile as DriverTypesPopulated).vehicleDetailes.vehicleColor}
                                fieldName="vehicleColor"
                                placeHolderValue="New vehicle color"
                                updateFiledOnChangeHandler={updateDriverFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForDriverUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateDriverHandler}
                            />
                            <ProfleSingleFiled 
                                keyName="Vehicle Model"
                                valueName={(profile as DriverTypesPopulated).vehicleDetailes.vehicleModel}
                                fieldName="vehicleModel"
                                placeHolderValue="New vehicle model"
                                updateFiledOnChangeHandler={updateDriverFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForDriverUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateDriverHandler}
                            />
                            <ProfleSingleFiled 
                                keyName="Vehicle Number"
                                valueName={(profile as DriverTypesPopulated).vehicleDetailes.vehicleNumber}
                                fieldName="vehicleNumber"
                                placeHolderValue="New vehicle number"
                                updateFiledOnChangeHandler={updateDriverFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForDriverUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateDriverHandler}
                            />
                            <ProfleSingleFiled 
                                keyName="Vehicle Type"
                                valueName={(profile as DriverTypesPopulated).vehicleDetailes.vehicleType}
                                fieldName="vehicleType"
                                placeHolderValue="New vehicle type"
                                updateFiledOnChangeHandler={updateDriverFiledOnChangeHandler}
                                selectedFieldsForUpdate={selectedFieldsForDriverUpdate}
                                includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateDriverHandler}
                            />
                            
                            {
                                selectedFieldsForDriverUpdate.length !== 0 &&
                                    <Button text="Update driving profile" margin="15px 0 0 0" onClickHandler={updateDriverProfile} />
                            }
                        </div>
                        <Button text="Driver logout" onClickHandler={() => navigate("/logout", {state:{logoutFor:"driver"}})} />
                    </>
                }
            </div>



        </div>
    )
};

const ProfleSingleFiled = ({keyName, valueName, fieldName, placeHolderValue, updateFiledOnChangeHandler, selectedFieldsForUpdate, includeExcludeFieldToUpdateHandler}:{keyName:string; valueName:string; fieldName:string; placeHolderValue:string; updateFiledOnChangeHandler:(e:ChangeEvent<HTMLInputElement>) => void; selectedFieldsForUpdate:string[]; includeExcludeFieldToUpdateHandler:(e:MouseEvent<SVGElement>) => void;}) => {

    return(
        <div className="flex justify-between items-center text-gray-700 text-sm p-1">
            <div className="text-gray-500">{keyName}</div>
            <div className="flex items-center">
                {
                    selectedFieldsForUpdate.includes(fieldName) ?
                        <>
                            <input className="border px-1" type="text" name={fieldName} placeholder={placeHolderValue} onChange={(e) => updateFiledOnChangeHandler(e)} />
                            <GiCancel id={fieldName} className="GiCancel"
                                onClick={(e) => includeExcludeFieldToUpdateHandler(e)}
                            />
                        </>
                        :
                        <>
                            <div className="">{valueName}</div>
                            <BiEdit id={fieldName} className="BiEdit"
                                onClick={(e) => includeExcludeFieldToUpdateHandler(e)}
                            />
                        </>
                    
                }
            </div>
        </div>
    )
}

export default ProfilePanel;