import { routeGuard } from '../../router/guard.js';
import { setCompany, setApplication } from '../../helper/utils';

jest.mock('../../helper/utils', () => ({
  setCompany: jest.fn(),
  setApplication: jest.fn(),
}));

describe('routeGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls setCompany with company_id parameter', () => {
    const params = { company_id: '123' };
    routeGuard({ params });
    expect(setCompany).toHaveBeenCalledWith('123');
  });

  test('calls setApplication with application_id parameter', () => {
    const params = { application_id: '456' };
    routeGuard({ params });
    expect(setApplication).toHaveBeenCalledWith('456');
  });

  test('calls both setCompany and setApplication with respective parameters', () => {
    const params = { company_id: '123', application_id: '456' };
    routeGuard({ params });
    expect(setCompany).toHaveBeenCalledWith('123');
    expect(setApplication).toHaveBeenCalledWith('456');
  });

  test('does not call setCompany if company_id is not provided', () => {
    const params = { application_id: '456' };
    routeGuard({ params });
    expect(setCompany).not.toHaveBeenCalled();
  });

  test('does not call setApplication if application_id is not provided', () => {
    const params = { company_id: '123' };
    routeGuard({ params });
    expect(setApplication).not.toHaveBeenCalled();
  });
});
