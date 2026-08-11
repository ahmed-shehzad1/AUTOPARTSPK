import LegalPage from './LegalPage'
import { TERMS_OF_SERVICE } from '../../data/legalContent'

function TermsOfService() {
  return <LegalPage title="Terms of Service" content={TERMS_OF_SERVICE} />
}

export default TermsOfService