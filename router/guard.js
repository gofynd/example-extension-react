import { setCompany, setApplication } from '../helper/utils';

export const routeGuard = ({params}) => {
  if (params.company_id) {
    setCompany(params.company_id);
  }
  if (params.application_id) {
    setApplication(params.application_id);
  }
  return null;
};
