import * as Parse from "parse";

Parse.initialize(process.env.REACT_APP_PARSE_APP_ID);
Parse.serverURL = process.env.REACT_APP_SERVER_URL;

const logOut = async () => {
    try {
       const res= await Parse.User.logOut();
        Parse.User.current();
        return res
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const verifyUserSession = async (sessionToken) => {
    try {
        let response = await Parse.User.become(sessionToken);
        console.log("Response",response);
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
}




const login = async (data) => {
    try {
        const user = await Parse.User.logIn(data.username, data.password);
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const sendOTP = async (username) => {
    try {
        const user = await Parse.Cloud.run("userLogin",username);
        console.log("sent data", username, user);
        return user;
    } catch (error) {
        console.error(error);
        throw error;    
    }
}

const getPicklistCategories = async () => {
    try {
        const user = await Parse.Cloud.run("getPicklistCategories")
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getPicklist = async () => {
    try {
        const user = await Parse.Cloud.run("getPicklist")
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


const addPicklistCategories = async (data) => {
    let send_data = { "name": data }
    console.log("send Data", send_data);
    try {
        const user = await Parse.Cloud.run("addPicklistCategories", send_data)
        return user;
    } catch (error) {
        console.error(error);
        throw error;
        
    }
}

// http://localhost:1337/parse/functions/addPicklist
// BODY :{
//     "categoryId":"mbqcD6rQoP",
//     "name":"Testing value"
// }
const addPicklist = async (data) => {
    // let send_data = { "name": data , "CategoryId"}
    // console.log("send Data", send_data);
    try {
        const user = await Parse.Cloud.run("addPicklist", data)
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}










const getUserData = async (forced = false) => {
    try {
        const currentUser = Parse.User.current();
        if (currentUser && !forced) {
            return currentUser
        } else {
            let user = await Parse.Cloud.run("getCurrentuser");
            return user;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const signup = async (data) => {
    console.log("data in signup", data);
    try {
        const user = await Parse.Cloud.run("signUp", data)
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const updatePassword = async (data) => {
    console.log("data in updatePassword", data);
    try {
        const user = await Parse.Cloud.run("updatePassword", data)
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const bulkUpload=async(data)=>{
    try{
        const user=await Parse.Cloud.run("addTargetList",data);
        return user;
    }
    catch (error) {
        console.error(error);
        throw error;
}
}


const getProductsForTargetList=async()=>{
    try{
        const user = await Parse.Cloud.run("getProductsForTargetList")
        return user
    }
    catch (error) {
        console.error(error);
        throw error;
}
}

const getTargetList=async ()=>{
    try{
        const user= await Parse.Cloud.run("getTargetList")
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}
const getFarmerMappingDetails=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getFarmerMappingDetails1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getFarmerMappingDetailsFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getFarmerMappingDetailsFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}



const exportedFunction = {
    sendOTP,
    login,
    signup,
    logOut,
    getPicklistCategories,
    addPicklistCategories,
    getPicklist,
    addPicklist,
    verifyUserSession,
    bulkUpload,
    getProductsForTargetList,
    getTargetList,
    getUserData,
    getFarmerMappingDetails,
    getFarmerMappingDetailsFilter
}

export default exportedFunction;