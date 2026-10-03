// Seeded accounts for the Campus Canteen.
// Login uses a 5-digit ID number (example: 18101) instead of an email.
//   Admin / staff IDs start with 10  (10001 - 10003)
//   Student IDs start with 18        (18101 - 18110)
//
// NOTE: this app has no backend yet, so these credentials live in the browser bundle.
// Before a real public launch, move authentication to a server (see src/services/api.js)
// and change/remove these passwords.

export const ID_NUMBER_PATTERN = /^\d{5}$/

export const seedUsers = [
  // ---- Admin / staff ----
  { idNumber: '10001', name: 'Canteen Admin',   role: 'admin',   password: 'admin10001' },
  { idNumber: '10002', name: 'Canteen Manager', role: 'admin',   password: 'admin10002' },
  { idNumber: '10003', name: 'Cashier Staff',   role: 'admin',   password: 'admin10003' },

  // ---- Students ----
  // { idNumber: '18101', name: 'Juan Dela Cruz',   role: 'student', password: 'student18101' },
  // { idNumber: '18102', name: 'Maria Santos',     role: 'student', password: 'student18102' },
  // { idNumber: '18103', name: 'Pedro Reyes',      role: 'student', password: 'student18103' },
  // { idNumber: '18104', name: 'Anna Garcia',      role: 'student', password: 'student18104' },
  { idNumber: '18105', name: 'Carlo Mendoza',    role: 'student', password: 'student18105' },
  { idNumber: '18106', name: 'Bea Villanueva',   role: 'student', password: 'student18106' },
  { idNumber: '18107', name: 'Miguel Torres',    role: 'student', password: 'student18107' },
  { idNumber: '18108', name: 'Sofia Ramos',      role: 'student', password: 'student18108' },
  { idNumber: '18109', name: 'Luis Navarro',     role: 'student', password: 'student18109' },
  { idNumber: '18110', name: 'Katrina Bautista', role: 'student', password: 'student18110' }
]
