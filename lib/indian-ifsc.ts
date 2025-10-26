export const indianIfsc: Record<string, { ifsc: string; branch: string }[]> = {
  state_bank_of_india: [
    { ifsc: 'SBIN0000691', branch: 'NEW DELHI MAIN BRANCH' },
    { ifsc: 'SBIN0000539', branch: 'MUMBAI MAIN' },
    { ifsc: 'SBIN0000001', branch: 'KOLKATA MAIN' },
    { ifsc: 'SBIN0000132', branch: 'CHENNAI MAIN' },
  ],
  hdfc_bank: [
    { ifsc: 'HDFC0000060', branch: 'MUMBAI - FORT' },
    { ifsc: 'HDFC0000001', branch: 'NEW DELHI - K G MARG' },
    { ifsc: 'HDFC0000002', branch: 'BANGALORE - KASTURBA ROAD' },
    { ifsc: 'HDFC0000003', branch: 'CHENNAI - ANNA SALAI' },
  ],
  icici_bank: [
    { ifsc: 'ICIC0000002', branch: 'MUMBAI - NARIMAN POINT' },
    { ifsc: 'ICIC0000007', branch: 'NEW DELHI - CONNAUGHT PLACE' },
    { ifsc: 'ICIC0000006', branch: 'BANGALORE - M G ROAD' },
    { ifsc: 'ICIC0000004', branch: 'CHENNAI - NUNGAMBAKKAM' },
  ],
  axis_bank: [
    { ifsc: 'UTIB0000001', branch: 'MUMBAI' },
    { ifsc: 'UTIB0000002', branch: 'NEW DELHI' },
  ],
};