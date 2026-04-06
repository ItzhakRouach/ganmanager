// User & Auth
export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Navigation
export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

// Dashboard stats (mock for Phase 1, real data in Phase 2+)
export interface DashboardStats {
  totalChildren: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netProfit: number;
}

// Chart data for Recharts bar chart
export interface MonthlyChartData {
  month: string;
  income: number;
  expenses: number;
}

// Payment row for dashboard table
export interface PaymentSummaryRow {
  childName: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'LATE' | 'PARTIAL';
  month: string;
}
