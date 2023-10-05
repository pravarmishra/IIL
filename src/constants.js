export const LOCAL_STORAGE_KEYS = {
    STORED_USER_DATA: "storedUserData",
    HAS_UPDATED: "hasUpdated"
  };
  
    // export const ROLES = {
  //   ADMIN: "admin",
  //   SALES_TEAM: "Sales Team",
  //   SCM_Executive_China: "SCM Executive-China",
  //   SCM_Manager: "SCM Manager",
  //   SCM_EX_L1_INDIA_DL: "SCM EX L1 INDIA DL",
  //   SCM_EX_L2: "SCM EX L2",
  //   SCM_Sr_EX_INDIA_MUM: "SCM Sr EX INDIA MUM",
  //   SCM_EX_L3_DL: "SCM EX L3 DL",
  //   SCM_EX_L3_MUM: "SCM EX L3 MUM"
  // };

  
export const COMPONENTS = {
  CATEGORY_MANAGEMENT: 'category',
  
  
}

export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  SALES_SR_MANAGER: 'Sales Sr Manager',
  SALES_MANAGER_MUMBAI: 'Sales Manager Mumbai',
  SALES_MANAGER_DELHI: 'Sales Manager Delhi',
  SCM_SR_MANAGER: 'SCM Sr Manager',
  // SCM_EXECUTIVE_PACKING_LIST_CHINA_AIR_AND_SEA: 'SCM Executive - Packing List China-Air & Sea',
  // SCM_EXECUTIVE_CHINA_WAREHOUSE_AIR: 'SCM Executive - China-Warehouse Air',
  // SCM_EXECUTIVE_CHINA_WAREHOUSE_SEA: 'SCM Executive - China-Warehouse Sea',
  SCM_EXECUTIVE_INDIA_WAREHOUSE: 'SCM Executive - India-Warehouse',
  SCM_EXECUTIVE_CHINA_WAREHOUSE: 'SCM Executive - China-Warehouse',
  SCM_SR_EXECUTIVE_INDIA: 'SCM Sr Executive-India',
  SCM_MANAGER_DELHI: 'SCM-Manager-Delhi',
  SCM_UNLOADING_AT_PORT_MUMBAI: 'SCM-Unloading @ PORT-Mumbai',
  SCM_WAREHOUSE_MUMBAI: 'SCM-Warehouse Mumbai',
  ACCOUNTS_BILLING_IN_TALLY: 'Accounts-Billing in Tally',
  SCM_DECLARATION_AND_FOREIGN_PAYMENT_DOCUMENTATION: 'SCM-Declaration & Foreign Payment Documentation',
}

  
  export const USER_STATUS = {
    PENDING: 1,
    ACTIVE: 2,
    INACTIVE: 3,
    BLOCKED: 4,
  };
  
  // export const PRIMARY_COLOR = "118572";
  export const PRIMARY_COLOR = "#85c225";
  
  // export const PRIMARY_COLOR = "#E1714C";
  export const ERROR_COLOR = "#fab1a0";
  export const LIGHT_COLOR = "rgba(255, 240, 240, 0.5)";
export const LIGHT_COLOR_2 = "rgba(255, 240, 240, 1)";
export const SHADOW = "0 5px 10px rgb(254 216 217 / 61%)";
export const BUTTON_SHADOW = "0 3px 3px rgba(237, 39, 46,.15),0 3px 1px -2px rgba(237, 39, 46,.2),0 1px 5px 0 rgba(237, 39, 46,.15)";
export const BUTTON_SHADOW_HOVER = "0 14px 26px -12px rgb(237 39 46 / 40%), 0 4px 23px 0 rgb(237 39 46 / 15%), 0 8px 10px -5px rgb(237 39 46 / 20%)";
export const SHADOW_HOVER = "0 6px 10px 13px rgb(255 231 232 / 48%)";

  
  export const ERROR_CODES = {
    EMAIL_NOT_VERIFIED: "email not verified",
    EMAIL_IN_USE: "Email already in use",
    EMPLOYEE_CODE_IN_USE: "Employee code already in use",
    MOBILE_NUMBER_IN_USE: 'Mobile number already in use',
    INVALID_ROLE_ACCESS: "Invalid Access",
    INVALID_PIN_CODE: "Invalid Pin Code",
    INVALID_MOBILE: "Invalid Mobile number",
    INVALID_EMAIL: "Invalid Email id",
    REGEX_NAME_ALREADY_IN_USE: 'Regex name already in use',
    REGEX_VALUE_ALREADY_IN_USE: "Regex value already in use",
    NO_MOBILE: "Enter mobile no."
  };
  
  export const TABS = {
    REGISTERED: 0,
    PENDING: 1,
    DELETED: 2
  }
  
  export const LEADS_TABS = {
    REVISIT: 0,
    CROSS_SELL: 1,
    SOURCED: 2
  }
  
  export const MERCHANTS_TABS = {
    ACTIVE: 0,
    INACTIVE: 1
  }
  
  export const BULK_UPLOAD_FAILURE_CODES = {
    MISSING_FIRST_NAME: "First Name is missing",
    INVALID_EMAIL: "Missing valid email address",
    MISSING_EMPLOYEE_CODE: "Employee Code is missing",
    INVALID_MOBILE: "Missing valid mobile number",
    INVALID_REPORTING_MANAGER: "Invalid Reporting Manager",
    INVALID_PIN_CODES: "Invalid Pin Codes",
    MISSING_ACCESS_RIGHTS: "Missing Access Rights",
    MISSING_MERCHANT_ID: "Missing Merchant Id"
  }
  
  export const BULK_DELETE_FAILURE_CODES = {
    MISSING_REASON: "Reason is missing"
  }
  
  export const PRIORITY_COLORS ={
    HIGH: "#ff7675",
    MEDIUM: "#ffeaa7",
    LOW: "#55efc4"
  }
  
  export const PRIORITY_TYPES = {
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low"
  }
  
  export const DATE_FORMATS = {
    DEFAULT: 'Do MMMM YYYY',
    DATE_WITH_TIME: 'Do MMMM YYYY LT'
    // DATE: ''
  }
  
  export const LEAD_TYPES = {
    REVISIT: "revisit",
    CROSS_SELL: "cross sell",
    SOURCED: "sourced"
  }
  
  export const LEARNING_TABS = {
    VIDEOS: "Videos",
    DOCUMENTS: "Documents"
  }
  
  export const LEAD_STATUS = {
    OPEN: "open",
    CLOSED: "closed"
  }
  
  export const OPERATORS = {
    CONTAINS: 'conatains',
    EQUAL: 'equal',
  }
  
  export const OPERATORS_OPTIONS = [
    { label: 'Contains', value: 'contains' },
    { label: 'Not Contains', value: 'not_contains' },
    { label: 'Equals to', value: 'equal' },
    { label: 'Not Equals to', value: 'not_equal' },
  ]

  export const QUOTATION_STATUS = {
    PENDING: 'pending',
    ADMIN_APPROVED: 'adminApproved',
    APPROVED: 'customerApproved',
    REJECTED: 'rejected'
  }
  
  export const ACTIVITY_STATUS = {
    fixed: 1,
    new_active: 2,
    paused: 3,
    deleted: 4,
  }
  
  export const FIELD_TYPES = [
    "text",
    "number",
    "password",
    "multiline",
    "radio",
    "select",
    "multiselect",
    "checkbox",
    "switch",
    "frontcamera",
    "backcamera",
    "gallery",
    "date",
    "datetime",
  ]
  
  export const PREDEFINED_FIELDS = {
    STATUS: 'status',
    MID: 'mid',
    PINCODE: 'pincode',
    MOBILE: 'mobile'
  }
  
  export const PREDEFINED_OPTIONS = {
    OPEN: 'open',
    FOLLOWUP: 'followup',
    CLOSED: 'closed'
  }
  
  export const RESERVED_KEYWORDS = [
    'lat', 'long', 'user', 'source', 'form'
  ]
  export const DOCUMENT_KEYS = {
    PAN: 'PAN',
    BANK_PROOF: 'Bank Proof',
    PHOTO: 'Karza Liveness Photograph',
  }
  
  export const SO_STATUS = {
    ON_THE_WAY: 'on the way',
    RECIEVED: 'recieved',
    DISPATHCED: 'dispatched'
  }
  export const SHIPMENT_TYPES = {
    SEA: 'sea',
    AIR: 'air',
  }