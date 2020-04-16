const AccountTypes = [{
  id: 1,
  type: 'Frontliner',
  iconClassName: 'ri-service-fill',
  color: '#fd9644'
}, {
  id: 2,
  type: 'Health Worker',
  iconClassName: 'ri-hospital-fill',
  color: '#fc5c65',
}, {
  id: 3,
  type: 'Law Enforcement',
  iconClassName: 'ri-police-car-fill',
  color: '#2d98da',
}, {
  id: 4,
  type: 'Donor',
  iconClassName: 'ri-hand-heart-fill',
  color: '#20bf6b',
}]

export interface AccountType {
  id: number;
  type: string;
  iconClassName: string;
  color: string;
}

export default AccountTypes