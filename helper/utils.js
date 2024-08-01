let company_id = null;
let application_id = null;

export const setCompany = companyId => {
  company_id = companyId;
};

export const getCompany = () => {
  return company_id;
};

export const setApplication = applicationId => {
  application_id = applicationId;
};

export const getApplication = () => {
  return application_id;
};
