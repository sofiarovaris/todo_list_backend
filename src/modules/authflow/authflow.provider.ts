import { CognitoAuthService } from './flows/cognitoflow.service';
import { LocalAuthService } from './flows/localflow.service';

function selectFlow(flow: string) {
  switch (flow) {
    case 'development':
      return LocalAuthService;
    case 'production':
      return CognitoAuthService;
    default:
      throw new Error('Invalid flow type');
  }
}

export default function AuthflowProvider(flow: string) {
  return {
    provide: 'AuthFlowService',
    useClass: selectFlow(flow),
  };
}
