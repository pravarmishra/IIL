import * as Parse from "parse";

// Parse.initialize("9Ov2ElZ2ecmuJF3ptlUdgMLxiiL");
// Parse.serverURL ="https://iil-dev-64e66426455a.herokuapp.com/parse/";
Parse.initialize(process.env.REACT_APP_PARSE_APP_ID);
Parse.serverURL = process.env.REACT_APP_SERVER_URL;

// console.log("reading env",process.env.REACT_APP_SERVER_URL )
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

const getRetailerMappingDetails1=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getRetailerMappingDetails1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getRetailerMappingDetailsFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getRetailerMappingDetailsFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}


const getMappingDetailsCount=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getMappingDetailsCount",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getMappingDetailsCountFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getMappingDetailsCountFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getDistributorMappingDetails=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getDistributorMappingDetails1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getDistributorMappingDetailsFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getDistributorMappingDetailsFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}
const getAgriExpertMappingDetails1=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getAgriExpertMappingDetails1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getAgriExpertMappingDetailsFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getAgriExpertMappingDetailsFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}


const getFarmerVisit1=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getFarmerVisit1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}


const getFarmerVisitFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getFarmerVisitFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}


const getRetailerVisit1=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getRetailerVisit1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getRetailerVisitFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getRetailerVisitFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getDistributorVisit1=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getDistributorVisit1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getDistributorVisitFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getDistributorVisitFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}


const getVanCampaignDetails1=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getVanCampaignDetails1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}
const getVanCampaignDetailsFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getVanCampaignDetailsFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}


const getSpotDemoActivity=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getSpotDemoActivity",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}


const getSpotDemoActivityFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getSpotDemoActivityFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getNormalDemoActivity=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getNormalDemoActivity",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}


const getNormalDemoActivityFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getNormalDemoActivityFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}
const getDemoLpdActivity1=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getDemoLpdActivity1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getDemoLpdActivityFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getDemoLpdActivityFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getFarmerMeetingDetails1=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getFarmerMeetingDetails1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getFarmerMeetingDetailsFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getFarmerMeetingDetailsFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}
const getKvkVisitDetails1=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getKvkVisitDetails1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getKvkVisitDetailsFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getKvkVisitDetailsFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}


const getKrishiMela1=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getKrishiMela1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getKrishiMelaFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getKrishiMelaFilter",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getFeedback=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getFeedback1",data)
        return user;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}

const getFeedbackFilter=async (data)=>{
    try{
        const user= await Parse.Cloud.run("getFeedbackFilter",data)
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
    getFarmerMappingDetailsFilter,
    getRetailerMappingDetails1,
    getRetailerMappingDetailsFilter,
    getMappingDetailsCount,
    getMappingDetailsCountFilter,
    getDistributorMappingDetails,
    getDistributorMappingDetailsFilter,
    getAgriExpertMappingDetails1,
    getAgriExpertMappingDetailsFilter,
    getFarmerVisit1,
    getFarmerVisitFilter,
    getRetailerVisit1,
    getRetailerVisitFilter,
    getDistributorVisit1,
    getDistributorVisitFilter,
    getVanCampaignDetails1,
    getVanCampaignDetailsFilter,
    getSpotDemoActivity,
    getSpotDemoActivityFilter,
    getNormalDemoActivity,
    getNormalDemoActivityFilter,
    getDemoLpdActivity1,
    getDemoLpdActivityFilter,
    getFarmerMeetingDetails1,
    getFarmerMeetingDetailsFilter,
    getKvkVisitDetails1,
    getKvkVisitDetailsFilter,
    getKrishiMela1,
    getKrishiMelaFilter,
    getFeedback,
    getFeedbackFilter
}

export default exportedFunction;