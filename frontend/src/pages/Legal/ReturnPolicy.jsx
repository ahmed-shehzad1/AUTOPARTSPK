import LegalPage from './LegalPage'
import { RETURN_POLICY } from '../../data/legalContent'

function ReturnPolicy() {
  return <LegalPage title="Return & Warranty Policy" content={RETURN_POLICY} />
}

export default ReturnPolicy