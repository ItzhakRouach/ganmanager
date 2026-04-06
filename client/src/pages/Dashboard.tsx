import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAuth } from "../context/useAuth";
import type { MonthlyChartData, PaymentSummaryRow, DashboardStats } from "../types";

// Mock data — will be replaced with real API data in Phase 2+
const stats: DashboardStats = {
  totalChildren: 24,
  monthlyIncome: 18500,
  monthlyExpenses: 11200,
  netProfit: 7300,
};

const chartData: MonthlyChartData[] = [
  { month: "נוב׳", income: 17200, expenses: 10800 },
  { month: "דצמ׳", income: 16900, expenses: 11200 },
  { month: "ינו׳", income: 18100, expenses: 10500 },
  { month: "פבר׳", income: 17500, expenses: 11800 },
  { month: "מרץ", income: 18200, expenses: 10900 },
  { month: "אפר׳", income: 18500, expenses: 11200 },
];

const paymentStatusData = [
  { name: "שולם", value: 15, color: "#22c55e" },
  { name: "ממתין", value: 6, color: "#f59e0b" },
  { name: "באיחור", value: 3, color: "#ef4444" },
];

const recentPayments: PaymentSummaryRow[] = [
  { childName: "יוסי כהן", amount: 1800, status: "PAID", month: "אפריל" },
  { childName: "מיה לוי", amount: 1600, status: "PENDING", month: "אפריל" },
  { childName: "דני פרץ", amount: 2000, status: "PAID", month: "אפריל" },
  { childName: "נועה ברק", amount: 1750, status: "LATE", month: "אפריל" },
  { childName: "תום גבאי", amount: 1800, status: "PAID", month: "אפריל" },
  { childName: "ליאור שפיר", amount: 1650, status: "PARTIAL", month: "אפריל" },
];

const statusConfig = {
  PAID: { label: "שולם", className: "bg-green-100 text-green-700" },
  PENDING: { label: "ממתין", className: "bg-yellow-100 text-yellow-700" },
  LATE: { label: "באיחור", className: "bg-red-100 text-red-700" },
  PARTIAL: { label: "חלקי", className: "bg-blue-100 text-blue-700" },
};

const hebrewDate = new Intl.DateTimeFormat("he-IL", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(new Date());

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(amount);

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            שלום, {user?.name} 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">{hebrewDate}</p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs text-gray-400 bg-white border border-gray-100 rounded-full px-3 py-1 shadow-sm">
            נתונים לאפריל 2025
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Children */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm text-gray-500 font-medium">סה"כ ילדים</p>
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-lg">
              🧒
            </div>
          </div>
          <p className="text-3xl font-bold text-primary">{stats.totalChildren}</p>
          <p className="text-xs text-gray-400 mt-1">3 ילדים חדשים החודש</p>
        </div>

        {/* Monthly Income */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm text-gray-500 font-medium">הכנסה חודשית</p>
            <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center text-lg font-bold text-gold">
              ₪
            </div>
          </div>
          <p className="text-3xl font-bold text-primary" dir="ltr">
            {formatCurrency(stats.monthlyIncome)}
          </p>
          <p className="text-xs text-gray-400 mt-1">אפריל 2025</p>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm text-gray-500 font-medium">הוצאות חודשיות</p>
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-lg">
              📋
            </div>
          </div>
          <p className="text-3xl font-bold text-primary" dir="ltr">
            {formatCurrency(stats.monthlyExpenses)}
          </p>
          <p className="text-xs text-gray-400 mt-1">אפריל 2025</p>
        </div>

        {/* Net Profit */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm text-gray-500 font-medium">רווח נקי</p>
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-lg">
              ✦
            </div>
          </div>
          <p className="text-3xl font-bold text-green-600" dir="ltr">
            {formatCurrency(stats.netProfit)}
          </p>
          <p className="text-xs text-green-500 mt-1">+8% מהחודש הקודם</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Bar Chart — Income vs Expenses */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-5 text-right">
            הכנסות מול הוצאות — 6 חודשים אחרונים
          </h3>
          <div dir="ltr">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `₪${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, name: any) => [
                    formatCurrency(Number(value ?? 0)),
                    name === "income" ? "הכנסות" : "הוצאות",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #f0f0f0",
                    fontFamily: "Heebo, sans-serif",
                  }}
                />
                <Legend
                  formatter={(value) => (value === "income" ? "הכנסות" : "הוצאות")}
                  wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                />
                <Bar dataKey="income" fill="#1e3a5f" radius={[6, 6, 0, 0]} name="income" />
                <Bar dataKey="expenses" fill="#f59e0b" radius={[6, 6, 0, 0]} name="expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart — Payment Status */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-5 text-right">
            סטטוס תשלומים — אפריל
          </h3>
          <div dir="ltr">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={paymentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, name: any) => [`${value} ילדים`, name]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #f0f0f0",
                    fontFamily: "Heebo, sans-serif",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="space-y-2 mt-3">
            {paymentStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{item.value} ילדים</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-700 font-medium">{item.name}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-700">תשלומים אחרונים</h3>
          <button className="text-xs text-gold font-medium hover:text-gold-dark transition-colors duration-150">
            צפה בכל התשלומים ←
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-3">
                  שם הילד
                </th>
                <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">
                  חודש
                </th>
                <th className="text-right text-xs font-medium text-gray-500 px-4 py-3">
                  סכום
                </th>
                <th className="text-right text-xs font-medium text-gray-500 px-6 py-3">
                  סטטוס
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentPayments.map((payment, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors duration-100"
                >
                  <td className="px-6 py-3.5 text-sm font-medium text-gray-800">
                    {payment.childName}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{payment.month}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 font-medium" dir="ltr">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[payment.status].className}`}
                    >
                      {statusConfig[payment.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
