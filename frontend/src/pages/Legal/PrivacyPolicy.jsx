import LegalPage from './LegalPage'
import { PRIVACY_POLICY } from '../../data/legalContent'

function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" content={PRIVACY_POLICY} />
}

export default PrivacyPolicy