import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState } from "react";
import "../styles/components/profile_panel.scss";
import { DriverTypes, DriverTypesPopulated, UserTypes, VehicleTypeTypes } from "../utils/types";
import Heading from "./Heading";
import ShowHideToggler from "./ShowHideToggler";
import vite from "/public/vite.svg";
import { MdChangeCircle } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";

interface ProfilePanelPropTypes{
    isMyProfilePanelActive:boolean;
    setIsMyProfilePanelActive:Dispatch<SetStateAction<boolean>>;
    profileFor:"passenger"|"driver";
    profile:UserTypes|DriverTypesPopulated;
};

const ProfilePanel = ({isMyProfilePanelActive, setIsMyProfilePanelActive, profileFor, profile}:ProfilePanelPropTypes) => {
    //const [nameInfo, setNameInfo] = useState<string>("");
    //const [emailInfo, setEmailInfo] = useState<string>("");
    //const [passwordInfo, setPasswordInfo] = useState<string>("");
    //const [mobileInfo, setMobileInfo] = useState<string>("");
    const [updateUserProfileForm, setUpdateUserProfileForm] = useState<Partial<Pick<UserTypes, "name"|"email"|"mobile">>&{password?:string; oldPassword:string;}>({oldPassword:""});
    const [updateDriverProfileForm, setUpdateDriverProfileForm] = useState<Partial<Pick<DriverTypes, "licenseNumber">>&{oldPassword:string; vehicleColor?:string; vehicleModel?:string; vehicleNumber?:string; vehicleType?:VehicleTypeTypes}>({oldPassword:""});
    const [selectedFieldsForUserUpdate, setSelectedFieldsForUserUpdate] = useState<string[]>([]);
    const [selectedFieldsForDriverUpdate, setSelectedFieldsForDriverUpdate] = useState<string[]>([]);

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

    return(
        <div className="profile_panel_cont" 
        style={{
            top:isMyProfilePanelActive?"13px":"100%"
        }}
        >
            {/*<pre>{JSON.stringify(updateUserProfileForm, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(updateDriverProfileForm, null, `\t`)}</pre>*/}
            <ShowHideToggler toggleHandler={() => setIsMyProfilePanelActive(false)} />
            <Heading text="My profile" />
            <div className="scrollable_cont">
                <div className="dp_cont">
                    <img src={vite} alt={vite} />
                    <div className="choose_db_cont">
                        <MdChangeCircle className="MdChangeCircle" />
                        <input type="file" className="choose_db_inp" />
                    </div>
                </div>
                <Heading text="My user details" fontSize="0.9rem" />
                <div className="user_info_cont"> 
                    <ProfleSingleFiled 
                        keyName="Name"
                        valueName="User1"
                        fieldName="name"
                        placeHolderValue="New user name"
                        updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                        selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                        includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                    />
                    <ProfleSingleFiled 
                        keyName="Email"
                        valueName="user1@gmail.com"
                        fieldName="email"
                        placeHolderValue="New user email"
                        updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                        selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                        includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                    />
                    <ProfleSingleFiled 
                        keyName="Password"
                        valueName="uuuuuu"
                        fieldName="password"
                        placeHolderValue="New user password"
                        updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                        selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                        includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                    />
                    <ProfleSingleFiled 
                        keyName="Mobile"
                        valueName="8882732859"
                        fieldName="mobile"
                        placeHolderValue="New user mobile"
                        updateFiledOnChangeHandler={updateUserFiledOnChangeHandler}
                        selectedFieldsForUpdate={selectedFieldsForUserUpdate}
                        includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateUserHandler}
                    />
                    
                    {
                        selectedFieldsForUserUpdate.length !== 0 &&
                            <div className="key_value_cont">
                                <div className="key">Old password</div>
                                <div className="value_inp_icon_cont">
                                    <input className="update_info_inp" type="text" name="old_password" placeholder="Your old password" onChange={(e) => updateUserFiledOnChangeHandler(e)} />
                                </div>
                            </div>
                    }
                </div>
                {
                    profileFor === "driver" &&
                        <>
                            <Heading text="My driver details" fontSize="0.9rem" />
                            <div className="driver_info_cont"> 
                                <ProfleSingleFiled 
                                    keyName="License Number"
                                    valueName="licence0004"
                                    fieldName="licenseNumber"
                                    placeHolderValue="New driving license"
                                    updateFiledOnChangeHandler={updateDriverFiledOnChangeHandler}
                                    selectedFieldsForUpdate={selectedFieldsForDriverUpdate}
                                    includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateDriverHandler}
                                />
                                <ProfleSingleFiled 
                                    keyName="Vehicle Color"
                                    valueName="red"
                                    fieldName="vehicleColor"
                                    placeHolderValue="New vehicle color"
                                    updateFiledOnChangeHandler={updateDriverFiledOnChangeHandler}
                                    selectedFieldsForUpdate={selectedFieldsForDriverUpdate}
                                    includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateDriverHandler}
                                />
                                <ProfleSingleFiled 
                                    keyName="Vehicle Model"
                                    valueName="model123"
                                    fieldName="vehicleModel"
                                    placeHolderValue="New vehicle model"
                                    updateFiledOnChangeHandler={updateDriverFiledOnChangeHandler}
                                    selectedFieldsForUpdate={selectedFieldsForDriverUpdate}
                                    includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateDriverHandler}
                                />
                                <ProfleSingleFiled 
                                    keyName="Vehicle Number"
                                    valueName="Hr00004"
                                    fieldName="vehicleNumber"
                                    placeHolderValue="New vehicle number"
                                    updateFiledOnChangeHandler={updateDriverFiledOnChangeHandler}
                                    selectedFieldsForUpdate={selectedFieldsForDriverUpdate}
                                    includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateDriverHandler}
                                />
                                <ProfleSingleFiled 
                                    keyName="Vehicle Type"
                                    valueName="uberX"
                                    fieldName="vehicleType"
                                    placeHolderValue="New vehicle type"
                                    updateFiledOnChangeHandler={updateDriverFiledOnChangeHandler}
                                    selectedFieldsForUpdate={selectedFieldsForDriverUpdate}
                                    includeExcludeFieldToUpdateHandler={includeExcludeFieldToUpdateDriverHandler}
                                />
                                
                                {
                                    selectedFieldsForDriverUpdate.length !== 0 &&
                                        <div className="key_value_cont">
                                            <div className="key">Old password</div>
                                            <div className="value_inp_icon_cont">
                                                <input className="update_info_inp" type="text" name="old_password" placeholder="Your old password" onChange={(e) => updateDriverFiledOnChangeHandler(e)} />
                                            </div>
                                        </div>
                                }
                            </div>
                        </>
                }
            </div>



        </div>
    )
};

const ProfleSingleFiled = ({keyName, valueName, fieldName, placeHolderValue, updateFiledOnChangeHandler, selectedFieldsForUpdate, includeExcludeFieldToUpdateHandler}:{keyName:string; valueName:string; fieldName:string; placeHolderValue:string; updateFiledOnChangeHandler:(e:ChangeEvent<HTMLInputElement>) => void; selectedFieldsForUpdate:string[]; includeExcludeFieldToUpdateHandler:(e:MouseEvent<SVGElement>) => void;}) => {

    return(
        <div className="key_value_cont">
            <div className="key">{keyName}</div>
            <div className="value_inp_icon_cont">
                {
                    selectedFieldsForUpdate.includes(fieldName) ?
                        <>
                            <input className="update_info_inp" type="text" name={fieldName} placeholder={placeHolderValue} onChange={(e) => updateFiledOnChangeHandler(e)} />
                            <GiCancel id={fieldName} className="GiCancel"
                                onClick={(e) => includeExcludeFieldToUpdateHandler(e)}
                            />
                        </>
                        :
                        <>
                            <div className="value">{valueName}</div>
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