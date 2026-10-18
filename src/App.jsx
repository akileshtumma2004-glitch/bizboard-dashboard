import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  Menu,
  Plus,
  Settings,
  ShoppingBag,
  Target,
  Users,
  Wallet,
  X,
} from 'lucide-react';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import './App.css';

const NAVIGATION = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard },
      { label: 'Lead Analytics', icon: Users },
    ],
  },
  {
    title: 'SALES',
    items: [
      { label: 'Quotations', icon: FileText },
      { label: 'Deals & Revenue', icon: CircleDollarSign },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Orders', icon: ShoppingBag },
      { label: 'Payments', icon: CreditCard },
    ],
  },
  {
    title: 'REPORTS',
    items: [
      { label: 'Team Activity', icon: BriefcaseBusiness },
      { label: 'CRM Activity', icon: Activity },
    ],
  },
];

const COLORS = ['#2563eb', '#64748b', '#cbd5e1', '#1e293b'];

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function makeDailyData() {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(today);

    date.setDate(today.getDate() - (29 - index));

    const leads = 28 + ((index * 17 + 9) % 39);
    const converted = Math.round(
      leads * (0.18 + (index % 5) * 0.025)
    );

    return {
      date: dateKey(date),
      name: date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
      }),
      leads,
      converted,
      revenue: 9000 + ((index * 7351 + 3211) % 27000),
      quotations: 8 + ((index * 3) % 14),
      deals: 2 + ((index * 5) % 8),
      collected: 6000 + ((index * 4219) % 18000),
      outstanding: 2500 + ((index * 1973) % 12000),
      orders: 5 + ((index * 7) % 18),
    };
  });
}

const DAILY_DATA = makeDailyData();

const INITIAL_ACTIVITIES = [
  {
    id: 1,
    name: 'Rahul Sharma',
    type: 'New Lead',
    amount: 25000,
    status: 'Qualified',
    date: dateKey(new Date()),
  },
  {
    id: 2,
    name: 'Priya Patil',
    type: 'Quotation Sent',
    amount: 45000,
    status: 'Pending',
    date: dateKey(new Date()),
  },
  {
    id: 3,
    name: 'Amit Kumar',
    type: 'Deal Closed',
    amount: 80000,
    status: 'Completed',
    date: dateKey(new Date()),
  },
  {
    id: 4,
    name: 'Sneha Joshi',
    type: 'Payment Received',
    amount: 15000,
    status: 'Completed',
    date: dateKey(new Date()),
  },
  {
    id: 5,
    name: 'Vikas More',
    type: 'New Lead',
    amount: 32000,
    status: 'Lost',
    date: dateKey(new Date()),
  },
];

const TEAM_DATA = [
  {
    name: 'Rahul Sharma',
    role: 'Sales Executive',
    leads: 42,
    deals: 12,
    revenue: 185000,
  },
  {
    name: 'Priya Patil',
    role: 'Account Manager',
    leads: 36,
    deals: 10,
    revenue: 162000,
  },
  {
    name: 'Amit Kumar',
    role: 'Sales Executive',
    leads: 31,
    deals: 9,
    revenue: 139000,
  },
  {
    name: 'Sneha Joshi',
    role: 'Operations',
    leads: 24,
    deals: 7,
    revenue: 98000,
  },
];

const ORDERS_DATA = [
  {
    id: 'ORD-1042',
    customer: 'Rahul Sharma',
    service: 'Website Design',
    amount: 45000,
    status: 'Completed',
  },
  {
    id: 'ORD-1043',
    customer: 'Priya Patil',
    service: 'Mobile App',
    amount: 85000,
    status: 'Processing',
  },
  {
    id: 'ORD-1044',
    customer: 'Amit Kumar',
    service: 'UI/UX Design',
    amount: 28000,
    status: 'Pending',
  },
  {
    id: 'ORD-1045',
    customer: 'Sneha Joshi',
    service: 'Website Design',
    amount: 52000,
    status: 'Completed',
  },
  {
    id: 'ORD-1046',
    customer: 'Vikas More',
    service: 'Maintenance',
    amount: 12000,
    status: 'Overdue',
  },
];

const PAYMENTS_DATA = [
  {
    id: 'PAY-2081',
    customer: 'Rahul Sharma',
    method: 'UPI',
    amount: 25000,
    status: 'Completed',
  },
  {
    id: 'PAY-2082',
    customer: 'Priya Patil',
    method: 'Bank Transfer',
    amount: 40000,
    status: 'Pending',
  },
  {
    id: 'PAY-2083',
    customer: 'Amit Kumar',
    method: 'Credit Card',
    amount: 28000,
    status: 'Completed',
  },
  {
    id: 'PAY-2084',
    customer: 'Sneha Joshi',
    method: 'UPI',
    amount: 15000,
    status: 'Completed',
  },
  {
    id: 'PAY-2085',
    customer: 'Vikas More',
    method: 'Bank Transfer',
    amount: 12000,
    status: 'Overdue',
  },
];

const QUOTATION_DATA = [
  { name: 'Website', value: 35 },
  { name: 'Mobile App', value: 25 },
  { name: 'UI/UX', value: 20 },
  { name: 'Other', value: 20 },
];

const currency = (value) =>
  `₹${Number(value || 0).toLocaleString('en-IN')}`;

const compactCurrency = (value) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  }

  return currency(value);
};

function StatusBadge({ status }) {
  const extra = ['Pending'].includes(status)
    ? 'pending'
    : ['Lost', 'Overdue'].includes(status)
      ? status === 'Overdue'
        ? 'overdue'
        : 'lost'
      : status === 'Processing'
        ? 'processing'
        : '';

  return (
    <span className={`status ${extra}`}>
      {status}
    </span>
  );
}

function SectionHeader({ title, note }) {
  return (
    <div className="section-header">
      <h2 className="section-heading">{title}</h2>
      {note && <span className="section-note">{note}</span>}
    </div>
  );
}

function PanelHeader({ title, subtitle, action }) {
  return (
    <div className="panel-header">
      <div>
        <h3 className="panel-title">{title}</h3>
        {subtitle && (
          <p className="panel-subtitle">{subtitle}</p>
        )}
      </div>

      {action}
    </div>
  );
}

function KpiCard({
  title,
  value,
  trend,
  icon: Icon,
  tint,
  iconColor,
  subtitle,
}) {
  return (
    <article className="kpi-card">
      <div className="kpi-top">
        <p className="kpi-label">{title}</p>

        <span
          className="kpi-icon"
          style={{ background: tint, color: iconColor }}
        >
          <Icon size={18} />
        </span>
      </div>

      <div className="kpi-value">{value}</div>

      <div className="kpi-footer">
        {trend !== undefined && (
          <span className={`trend-up ${trend < 0 ? 'trend-down' : ''}`}>
            {trend < 0 ? (
              <ArrowDownRight size={13} />
            ) : (
              <ArrowUpRight size={13} />
            )}

            {Math.abs(trend)}%
          </span>
        )}

        <span>{subtitle || 'vs. previous period'}</span>
      </div>
    </article>
  );
}

function Table({ columns, rows, emptyMessage = 'No records found.' }) {
  if (!rows.length) {
    return <div className="empty-state">{emptyMessage}</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id ?? row.name}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Dashboard() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [period, setPeriod] = useState('Last 7 Days');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [toast, setToast] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filteredData = useMemo(() => {
    const today = dateKey(new Date());

    if (period === 'Today') {
      return DAILY_DATA.filter((item) => item.date === today);
    }

    if (period === 'Last 7 Days') {
      return DAILY_DATA.slice(-7);
    }

    if (period === 'Last 30 Days') {
      return DAILY_DATA;
    }

    if (period === 'Custom Range') {
      if (!startDate || !endDate || startDate > endDate) {
        return [];
      }

      return DAILY_DATA.filter(
        (item) => item.date >= startDate && item.date <= endDate
      );
    }

    return DAILY_DATA.slice(-7);
  }, [period, startDate, endDate]);

  const totals = useMemo(
    () =>
      filteredData.reduce(
        (sum, day) => ({
          leads: sum.leads + day.leads,
          converted: sum.converted + day.converted,
          revenue: sum.revenue + day.revenue,
          quotations: sum.quotations + day.quotations,
          deals: sum.deals + day.deals,
          collected: sum.collected + day.collected,
          outstanding: sum.outstanding + day.outstanding,
          orders: sum.orders + day.orders,
        }),
        {
          leads: 0,
          converted: 0,
          revenue: 0,
          quotations: 0,
          deals: 0,
          collected: 0,
          outstanding: 0,
          orders: 0,
        }
      ),
    [filteredData]
  );

  const qualifiedLeads = Math.round(totals.leads * 0.69);

  const conversionRate = totals.leads
    ? (totals.converted / totals.leads) * 100
    : 0;

  const periodLabel =
    period === 'Custom Range' && startDate && endDate
      ? `${startDate} to ${endDate}`
      : period;

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  }

  function addLead() {
    const name = window.prompt('Enter customer name:');

    if (!name?.trim()) return;

    const amountText = window.prompt(
      'Enter estimated value in rupees:',
      '0'
    );

    const amount = Number(amountText || 0);

    const newActivity = {
      id: Date.now(),
      name: name.trim(),
      type: 'New Lead',
      amount:
        Number.isFinite(amount) && amount >= 0
          ? amount
          : 0,
      status: 'Qualified',
      date: dateKey(new Date()),
    };

    setActivities((current) => [newActivity, ...current]);

    showToast('New lead added to CRM activity.');
  }

  function exportActivities() {
    const headers = [
      'Customer',
      'Activity',
      'Amount',
      'Status',
      'Date',
    ];

    const rows = activities.map((item) => [
      item.name,
      item.type,
      item.amount,
      item.status,
      item.date,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(',')
      )
      .join('\n');

    const url = URL.createObjectURL(
      new Blob([csv], {
        type: 'text/csv;charset=utf-8;',
      })
    );

    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = 'crm-activity-demo.csv';
    anchor.click();

    URL.revokeObjectURL(url);

    showToast('CRM activity CSV exported.');
  }

  const chartTooltipStyle = {
    border: '1px solid #e6ddd0',
    borderRadius: 8,
    fontSize: 11,
    boxShadow: '0 5px 20px rgba(47, 63, 55, 0.12)',
  };

  const leadRows = activities
    .filter((item) => item.type === 'New Lead')
    .map((item) => ({
      ...item,
      amount: currency(item.amount),
    }));

  const recentRows = activities.map((item) => ({
    ...item,
    amount: currency(item.amount),
    date: item.date,
  }));

    function renderDashboard() {
    return (
      <>
        <SectionHeader title="Business Overview" note={periodLabel} />

        <section className="kpi-grid">
          <KpiCard title="Total Leads" value={totals.leads.toLocaleString('en-IN')} trend={12.5} icon={Users} tint="#dbeafe" iconColor="#2563eb" subtitle="Demo data for selected period" />
          <KpiCard title="Qualified Leads" value={qualifiedLeads.toLocaleString('en-IN')} trend={8.2} icon={Target} tint="#e2e8f0" iconColor="#475569" subtitle="Estimated from total leads" />
          <KpiCard title="Total Revenue" value={compactCurrency(totals.revenue)} trend={18.4} icon={Wallet} tint="#e0f2fe" iconColor="#1d4ed8" subtitle="Demo revenue for selected period" />
          <KpiCard title="Conversion Rate" value={`${conversionRate.toFixed(1)}%`} trend={3.1} icon={Activity} tint="#f1f5f9" iconColor="#1e293b" subtitle="Converted leads / total leads" />
        </section>

        <SectionHeader title="Analytics Overview" note="Interactive demo charts" />

        <section className="analytics-grid">
          <article className="panel">
            <PanelHeader title="Lead Generation & Conversion" subtitle="Daily lead volume compared with conversions" />

            <div className="legend-list" style={{ marginBottom: 12 }}>
              <span><i className="legend-dot" style={{ background: '#2563eb' }} />Total leads</span>
              <span><i className="legend-dot" style={{ background: '#64748b' }} />Converted</span>
            </div>

            <div className="chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData} margin={{ top: 5, right: 8, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="leadFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                    </linearGradient>
                    <linearGradient id="convertedFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#64748b" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} minTickGap={18} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Area type="monotone" dataKey="leads" name="Leads" stroke="#2563eb" strokeWidth={2.3} fill="url(#leadFill)" />
                  <Area type="monotone" dataKey="converted" name="Converted" stroke="#64748b" strokeWidth={2.3} fill="url(#convertedFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="panel">
            <PanelHeader title="Daily Revenue" subtitle="Revenue generated by day" />

            <div className="chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData} margin={{ top: 5, right: 8, left: -8, bottom: 0 }}>
                  <CartesianGrid stroke="#edf0ea" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#7b8f85' }} axisLine={false} tickLine={false} minTickGap={18} />
                  <YAxis tick={{ fontSize: 10, fill: '#7b8f85' }} axisLine={false} tickLine={false} tickFormatter={compactCurrency} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [currency(value), 'Revenue']} />
                  <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[5, 5, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="panel">
            <PanelHeader title="Quotation Distribution" subtitle="Illustrative share by service" />

            <div className="chart-area short">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={QUOTATION_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={52} outerRadius={82} paddingAngle={3}>
                    {QUOTATION_DATA.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [`${value}%`, 'Share']} />
                  <Legend verticalAlign="bottom" iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="panel">
            <PanelHeader title="Revenue Collection" subtitle="Collected and outstanding amounts" />

            <div className="chart-area short">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData} margin={{ top: 5, right: 8, left: -8, bottom: 0 }}>
                  <CartesianGrid stroke="#edf0ea" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#7b8f85' }} axisLine={false} tickLine={false} minTickGap={18} />
                  <YAxis tick={{ fontSize: 10, fill: '#7b8f85' }} axisLine={false} tickLine={false} tickFormatter={compactCurrency} />
                  <Tooltip contentStyle={chartTooltipStyle} formatter={(value) => [currency(value)]} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="collected" name="Collected" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="outstanding" name="Outstanding" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        <SectionHeader title="Performance Breakdown" note="Based on selected demo period" />

        <section className="lower-grid">
          <article className="panel">
            <PanelHeader title="Sales Funnel" subtitle="Illustrative lead progress" />

            <div className="metric-list">
              {[
                { label: 'Total leads', value: totals.leads, color: '#2563eb', width: 100 },
                { label: 'Qualified leads', value: qualifiedLeads, color: '#64748b', width: totals.leads ? qualifiedLeads / totals.leads * 100 : 0 },
                { label: 'Converted leads', value: totals.converted, color: '#1e293b', width: totals.leads ? totals.converted / totals.leads * 100 : 0 },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="metric-head">
                    <span>{metric.label}</span>
                    <strong>{metric.value.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(100, metric.width)}%`,
                        background: metric.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <PanelHeader title="Pipeline Health" subtitle="Performance by channel" />

            <div className="scoreboard">
              {[
                { label: 'Sales velocity', value: '3.8x', detail: 'Above target' },
                { label: 'Lead quality', value: '86%', detail: 'High intent' },
                { label: 'Retention', value: '92%', detail: 'Healthy' },
              ].map((item) => (
                <div className="mini-stat" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <small>{item.detail}</small>
                </div>
              ))}
            </div>
          </article>
        </section>

        <SectionHeader title="Recent Activity" note="Latest sales and CRM events" />

        <article className="panel table-panel">
          <Table
            columns={[
              { key: 'name', label: 'Customer' },
              { key: 'type', label: 'Activity' },
              { key: 'amount', label: 'Amount', render: (_, row) => currency(row.amount) },
              { key: 'date', label: 'Date' },
              { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
            ]}
            rows={recentRows.slice(0, 6)}
          />
        </article>
      </>
    );
  }

  function renderLeadAnalytics() {
    return (
      <>
        <SectionHeader title="Lead Analytics" note={periodLabel} />

        <section className="kpi-grid">
          <KpiCard title="Total Leads" value={totals.leads} trend={12.5} icon={Users} tint="#dbeafe" iconColor="#2563eb" />
          <KpiCard title="Qualified Leads" value={qualifiedLeads} trend={8.2} icon={Target} tint="#e2e8f0" iconColor="#475569" />
          <KpiCard title="Converted Leads" value={totals.converted} trend={6.8} icon={CheckCircle2} tint="#eff6ff" iconColor="#1d4ed8" />
          <KpiCard title="Conversion Rate" value={`${conversionRate.toFixed(1)}%`} trend={3.1} icon={Activity} tint="#f8fafc" iconColor="#1e293b" />
        </section>

        <SectionHeader title="Lead Trends" />

        <article className="panel">
          <PanelHeader title="Lead Generation Over Time" subtitle="Daily lead volume and conversions" />

          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData}>
                <CartesianGrid stroke="#edf0ea" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#7b8f85' }} />
                <YAxis tick={{ fontSize: 10, fill: '#7b8f85' }} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
                <Area dataKey="leads" name="Leads" stroke="#2563eb" fill="#dbeafe" />
                <Area dataKey="converted" name="Converted" stroke="#64748b" fill="#e2e8f0" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <SectionHeader title="Lead Records" />

        <article className="panel table-panel">
          <Table
            columns={[
              { key: 'name', label: 'Customer' },
              { key: 'type', label: 'Activity' },
              { key: 'amount', label: 'Estimated Value', render: (_, row) => currency(row.amount) },
              { key: 'date', label: 'Date' },
              { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
            ]}
            rows={leadRows}
          />
        </article>
      </>
    );
  }

  function renderQuotations() {
    const rows = activities
      .filter((item) => item.type === 'Quotation Sent')
      .map((item) => ({
        ...item,
        quotation: `QT-${String(item.id).slice(-4)}`,
      }));

    return (
      <>
        <SectionHeader title="Quotations" note="Sample quotation records" />

        <section className="kpi-grid">
          <KpiCard title="Total Quotations" value={totals.quotations} trend={9.2} icon={FileText} tint="#dbeafe" iconColor="#2563eb" />
          <KpiCard title="Deals Closed" value={totals.deals} trend={7.5} icon={CheckCircle2} tint="#eff6ff" iconColor="#1d4ed8" />
          <KpiCard title="Estimated Revenue" value={compactCurrency(totals.revenue)} trend={18.4} icon={Wallet} tint="#e2e8f0" iconColor="#475569" />
          <KpiCard title="Pending Quotes" value={rows.filter((item) => item.status === 'Pending').length} icon={ClipboardList} tint="#f8fafc" iconColor="#1e293b" />
        </section>

        <SectionHeader title="Quotation Records" />

        <article className="panel table-panel">
          <Table
            columns={[
              { key: 'quotation', label: 'Quotation ID' },
              { key: 'name', label: 'Customer' },
              { key: 'amount', label: 'Amount', render: (_, row) => currency(row.amount) },
              { key: 'date', label: 'Date' },
              { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
            ]}
            rows={rows}
          />
        </article>
      </>
    );
  }

  function renderDeals() {
    const totalDeals = totals.deals;
    const avgDealValue = totalDeals ? totals.revenue / totalDeals : 0;
    const collectionRate = totals.collected + totals.outstanding
      ? (totals.collected / (totals.collected + totals.outstanding)) * 100
      : 0;

    return (
      <>
        <SectionHeader title="Deals & Revenue" note={periodLabel} />

        <section className="kpi-grid">
          <KpiCard title="Deals Closed" value={totalDeals} trend={7.5} icon={CheckCircle2} tint="#dbeafe" iconColor="#2563eb" />
          <KpiCard title="Closed Revenue" value={compactCurrency(totals.revenue)} trend={18.4} icon={Wallet} tint="#e2e8f0" iconColor="#475569" />
          <KpiCard title="Average Deal" value={currency(avgDealValue)} trend={5.3} icon={CircleDollarSign} tint="#e0f2fe" iconColor="#1d4ed8" />
          <KpiCard title="Collection Rate" value={`${collectionRate.toFixed(1)}%`} trend={4.1} icon={Target} tint="#f1f5f9" iconColor="#1e293b" />
        </section>

        <SectionHeader title="Deal Pipeline" />

        <article className="panel table-panel">
          <Table
            columns={[
              { key: 'customer', label: 'Customer' },
              { key: 'service', label: 'Deal' },
              { key: 'amount', label: 'Amount', render: (_, row) => currency(row.amount) },
              { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
            ]}
            rows={ORDERS_DATA.map((row) => ({ ...row, customer: row.customer, amount: row.amount }))}
          />
        </article>
      </>
    );
  }

  function renderOrders() {
    const totalOrders = ORDERS_DATA.length;
    const processingOrders = ORDERS_DATA.filter((item) => item.status === 'Processing').length;
    const pendingOrders = ORDERS_DATA.filter((item) => item.status === 'Pending').length;
    const overdueOrders = ORDERS_DATA.filter((item) => item.status === 'Overdue').length;

    return (
      <>
        <SectionHeader title="Orders" note={periodLabel} />

        <section className="kpi-grid">
          <KpiCard title="Total Orders" value={totalOrders} trend={6.1} icon={ShoppingBag} tint="#dbeafe" iconColor="#2563eb" />
          <KpiCard title="Processing" value={processingOrders} trend={3.2} icon={ClipboardList} tint="#e2e8f0" iconColor="#475569" />
          <KpiCard title="Pending" value={pendingOrders} trend={-1.4} icon={FileText} tint="#f1f5f9" iconColor="#1e293b" />
          <KpiCard title="Overdue" value={overdueOrders} trend={-2.7} icon={Bell} tint="#e2e8f0" iconColor="#475569" />
        </section>

        <SectionHeader title="Order Records" />

        <article className="panel table-panel">
          <Table
            columns={[
              { key: 'id', label: 'Order ID' },
              { key: 'customer', label: 'Customer' },
              { key: 'service', label: 'Service' },
              { key: 'amount', label: 'Amount', render: (_, row) => currency(row.amount) },
              { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
            ]}
            rows={ORDERS_DATA}
          />
        </article>
      </>
    );
  }

  function renderPayments() {
    const paidAmount = PAYMENTS_DATA.filter((item) => item.status === 'Completed').reduce((sum, item) => sum + item.amount, 0);
    const pendingAmount = PAYMENTS_DATA.filter((item) => item.status === 'Pending').reduce((sum, item) => sum + item.amount, 0);
    const overdueAmount = PAYMENTS_DATA.filter((item) => item.status === 'Overdue').reduce((sum, item) => sum + item.amount, 0);

    return (
      <>
        <SectionHeader title="Payments" note={periodLabel} />

        <section className="kpi-grid">
          <KpiCard title="Paid" value={currency(paidAmount)} trend={12.3} icon={CircleDollarSign} tint="#dbeafe" iconColor="#2563eb" />
          <KpiCard title="Pending" value={currency(pendingAmount)} trend={2.7} icon={CreditCard} tint="#e2e8f0" iconColor="#475569" />
          <KpiCard title="Overdue" value={currency(overdueAmount)} trend={-1.8} icon={Bell} tint="#f1f5f9" iconColor="#1e293b" />
          <KpiCard title="Transactions" value={PAYMENTS_DATA.length} trend={5.6} icon={ClipboardList} tint="#e0f2fe" iconColor="#1d4ed8" />
        </section>

        <SectionHeader title="Payment Records" />

        <article className="panel table-panel">
          <Table
            columns={[
              { key: 'id', label: 'Payment ID' },
              { key: 'customer', label: 'Customer' },
              { key: 'method', label: 'Method' },
              { key: 'amount', label: 'Amount', render: (_, row) => currency(row.amount) },
              { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
            ]}
            rows={PAYMENTS_DATA}
          />
        </article>
      </>
    );
  }

  function renderTeamActivity() {
    const totalTeamLeads = TEAM_DATA.reduce((sum, member) => sum + member.leads, 0);
    const totalTeamDeals = TEAM_DATA.reduce((sum, member) => sum + member.deals, 0);
    const totalTeamRevenue = TEAM_DATA.reduce((sum, member) => sum + member.revenue, 0);

    return (
      <>
        <SectionHeader title="Team Activity" note={periodLabel} />

        <section className="kpi-grid">
          <KpiCard title="Team Members" value={TEAM_DATA.length} trend={4.2} icon={Users} tint="#dbeafe" iconColor="#2563eb" />
          <KpiCard title="Total Leads" value={totalTeamLeads} trend={9.5} icon={Target} tint="#e2e8f0" iconColor="#475569" />
          <KpiCard title="Deals Closed" value={totalTeamDeals} trend={7.8} icon={CheckCircle2} tint="#eff6ff" iconColor="#1d4ed8" />
          <KpiCard title="Team Revenue" value={compactCurrency(totalTeamRevenue)} trend={12.1} icon={Wallet} tint="#f1f5f9" iconColor="#1e293b" />
        </section>

        <SectionHeader title="Team Performance" />

        <article className="panel table-panel">
          <Table
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'leads', label: 'Leads' },
              { key: 'deals', label: 'Deals' },
              { key: 'revenue', label: 'Revenue', render: (_, row) => currency(row.revenue) },
            ]}
            rows={TEAM_DATA}
          />
        </article>
      </>
    );
  }

  function renderCrmActivity() {
    return (
      <>
        <SectionHeader title="CRM Activity" note="Latest customer and sales events" />

        <section className="kpi-grid">
          <KpiCard title="Total Activities" value={activities.length} trend={5.4} icon={Activity} tint="#dbeafe" iconColor="#2563eb" />
          <KpiCard title="New Leads" value={activities.filter((item) => item.type === 'New Lead').length} trend={8.1} icon={Users} tint="#e2e8f0" iconColor="#475569" />
          <KpiCard title="Qualified" value={activities.filter((item) => item.status === 'Qualified').length} trend={4.6} icon={Target} tint="#eff6ff" iconColor="#1d4ed8" />
          <KpiCard title="Completed" value={activities.filter((item) => item.status === 'Completed').length} trend={7.2} icon={CheckCircle2} tint="#f1f5f9" iconColor="#1e293b" />
        </section>

        <article className="panel table-panel">
          <Table
            columns={[
              { key: 'name', label: 'Customer' },
              { key: 'type', label: 'Activity' },
              { key: 'amount', label: 'Amount', render: (_, row) => currency(row.amount) },
              { key: 'date', label: 'Date' },
              { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
            ]}
            rows={recentRows}
          />
        </article>
      </>
    );
  }

  function renderCurrentPage() {
    switch (activePage) {
      case 'Dashboard':
        return renderDashboard();

      case 'Lead Analytics':
        return renderLeadAnalytics();

      case 'Quotations':
        return renderQuotations();

      case 'Deals & Revenue':
        return renderDeals();

      case 'Orders':
        return renderOrders();

      case 'Payments':
        return renderPayments();

      case 'Team Activity':
        return renderTeamActivity();

      case 'CRM Activity':
        return renderCrmActivity();

      default:
        return renderDashboard();
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Activity size={21} />
          </div>

          <div className="brand-name">
            Biz<span>Metrics</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAVIGATION.map((group) => (
            <div className="nav-group" key={group.title}>
              <p className="nav-title">{group.title}</p>

              {group.items.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className={`nav-item ${activePage === label ? 'active' : ''}`}
                  onClick={() => {
                    setActivePage(label);
                    setMobileNavOpen(false);
                  }}
                >
                  <Icon size={17} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">AD</div>

            <div>
              <div className="profile-name">Admin Dashboard</div>
              <div className="profile-role">Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="eyebrow">BUSINESS INTELLIGENCE</div>

            <h1>
              {activePage === 'Dashboard'
                ? 'Dashboard Overview'
                : activePage}
            </h1>

            <p className="subtitle">
              Monitor business performance and track your key metrics.
            </p>
          </div>

          <div className="topbar-actions">
            <select
              className="filter-control"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              aria-label="Select reporting period"
            >
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Custom Range</option>
            </select>

            {period === 'Custom Range' && (
              <div className="date-range">
                <input
                  className="date-filter"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  aria-label="Start date"
                />

                <input
                  className="date-filter"
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => setEndDate(event.target.value)}
                  aria-label="End date"
                />
              </div>
            )}

            <button
              className="icon-button"
              title="Export CRM activities"
              aria-label="Export CRM activities"
              onClick={exportActivities}
            >
              <FileText size={17} />
            </button>

            <button
              className="icon-button"
              title="Notifications"
              aria-label="Notifications"
              onClick={() => showToast('You are all caught up!')}
            >
              <Bell size={17} />
            </button>
          </div>
        </header>

        {renderCurrentPage()}

        <footer className="footer">
          BizMetrics Dashboard · React demo project · Sample data for demonstration
        </footer>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default Dashboard;
