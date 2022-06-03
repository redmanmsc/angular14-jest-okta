import { OktaAuth } from '@okta/okta-auth-js';
import { environment } from '../../../../../git/iSuite.Web.EquipmentManagement.Ng/src/environments/environment';
import { OktaService } from './okta.service';

const oktaAuthFactory = () => {
  const { okta } = environment;

  return new OktaService(new OktaAuth(okta));
};

export const oktaServiceProvider = {
  provide: OktaService,
  useFactory: oktaAuthFactory
};
