import { setCompany, getCompany, setApplication, getApplication } from '../../helper/utils';

describe('Utils Functions', () => {
  beforeEach(() => {
    setCompany(null);
    setApplication(null);
  });

  test('Should set and get the company_id correctly', () => {
    expect(getCompany()).toBe(null);
    setCompany('1');
    expect(getCompany()).toBe('1');
  });

  test('Should set and get the application_id correctly', () => {
    expect(getApplication()).toBe(null);
    setApplication('000000000000000000000001');
    expect(getApplication()).toBe('000000000000000000000001');
  });
});
