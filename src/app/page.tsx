'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Eye,
  CheckCircle,
  Clock,
  DollarSign,
  Activity,
  Zap,
  Globe,
  Shield,
  Smartphone,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

export default function NEPARDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [liveData, setLiveData] = useState({
    connectedUsers: 12,
    lastUpdate: 'Just now',
    systemStatus: 'operational',
    processingTransactions: 8
  });

  // Comprehensive mock data
  const kpis = {
    totalArrears: 8910000000,
    nettedThisPeriod: 1250000000,
    dso: 45,
    activeDisputes: 4,
    totalInvoices: 65,
    matchedInvoices: 61,
    pendingSettlements: 8,
    settlementEfficiency: 94.2,
    systemUptime: 99.8,
    avgProcessingTime: 1.2
  };

  const cashFlowData = [
    { month: 'Jul', inflow: 245000000, outflow: 238000000, net: 7000000 },
    { month: 'Aug', inflow: 267000000, outflow: 261000000, net: 6000000 },
    { month: 'Sep', inflow: 289000000, outflow: 284000000, net: 5000000 },
    { month: 'Oct', inflow: 312000000, outflow: 308000000, net: 4000000 },
    { month: 'Nov', inflow: 298000000, outflow: 295000000, net: 3000000 },
    { month: 'Dec', inflow: 334000000, outflow: 329000000, net: 5000000 }
  ];

  const settlementEfficiency = [
    { month: 'Jul', efficiency: 88, transactions: 24 },
    { month: 'Aug', efficiency: 91, transactions: 26 },
    { month: 'Sep', efficiency: 89, transactions: 28 },
    { month: 'Oct', efficiency: 93, transactions: 30 },
    { month: 'Nov', efficiency: 94, transactions: 32 },
    { month: 'Dec', efficiency: 95, transactions: 34 }
  ];

  const partyPerformance = [
    { name: 'ECG', settlementRate: 96, avgDelay: 2.1, volume: 345000000 },
    { name: 'VRA', settlementRate: 92, avgDelay: 3.4, volume: 289000000 },
    { name: 'GNPC', settlementRate: 89, avgDelay: 4.2, volume: 198000000 },
    { name: 'BOST', settlementRate: 98, avgDelay: 1.8, volume: 156000000 },
    { name: 'IPP Alpha', settlementRate: 90, avgDelay: 3.8, volume: 134000000 },
    { name: 'IPP Beta', settlementRate: 94, avgDelay: 2.9, volume: 167000000 }
  ];

  const riskMetrics = [
    { category: 'Counterparty Risk', value: 35, threshold: 70 },
    { category: 'Liquidity Risk', value: 25, threshold: 60 },
    { category: 'Operational Risk', value: 15, threshold: 50 },
    { category: 'Market Risk', value: 45, threshold: 75 },
    { category: 'Compliance Risk', value: 20, threshold: 50 },
    { category: 'Settlement Risk', value: 30, threshold: 65 }
  ];

  const recentActivity = [
    { id: 1, type: 'settlement', description: 'November settlement batch executed', amount: 1250000000, status: 'completed', time: '2 hours ago', party: 'ECG' },
    { id: 2, type: 'invoice', description: 'GNPC gas invoice I000062 received', amount: 45000000, status: 'pending', time: '4 hours ago', party: 'GNPC' },
    { id: 3, type: 'payment', description: 'VRA payment confirmed', amount: 231480000, status: 'confirmed', time: '6 hours ago', party: 'VRA' },
    { id: 4, type: 'dispute', description: 'BOST quantity variance resolved', amount: 12000000, status: 'resolved', time: '8 hours ago', party: 'BOST' },
    { id: 5, type: 'reconciliation', description: 'Auto-reconciliation completed', amount: 890000000, status: 'completed', time: '1 day ago', party: 'System' }
  ];

  const crossDebtVisualization = [
    { from: 'ECG', to: 'VRA', amount: 485000000, status: 'active' },
    { from: 'ECG', to: 'IPP Alpha', amount: 127000000, status: 'active' },
    { from: 'ECG', to: 'IPP Beta', amount: 143000000, status: 'active' },
    { from: 'VRA', to: 'GNPC', amount: 234000000, status: 'pending' },
    { from: 'VRA', to: 'BOST', amount: 89000000, status: 'active' },
    { from: 'GNPC', to: 'ECG', amount: 312000000, status: 'active' }
  ];

  const aiInsights = [
    { type: 'optimization', title: 'Settlement Optimization', desc: 'Increase netting frequency to weekly for 15% efficiency gain', impact: 'high', confidence: 87 },
    { type: 'risk', title: 'Liquidity Risk Alert', desc: 'GNPC showing payment delays - recommend escrow review', impact: 'medium', confidence: 92 },
    { type: 'trend', title: 'Seasonal Pattern', desc: 'Q4 typically shows 23% higher settlement volumes', impact: 'low', confidence: 78 },
    { type: 'anomaly', title: 'Anomaly Detected', desc: 'Unusual dispute pattern from IPP Beta - investigate', impact: 'high', confidence: 94 }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1e9) return `₵${(amount / 1e9).toFixed(2)}bn`;
    if (amount >= 1e6) return `₵${(amount / 1e6).toFixed(2)}M`;
    if (amount >= 1e3) return `₵${(amount / 1e3).toFixed(2)}K`;
    return `₵${amount.toFixed(2)}`;
  };

  const handleImportData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/import', { method: 'POST' });
      const result = await response.json();
      if (response.ok) {
        console.log('Data imported successfully:', result);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error importing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReconciliation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/reconciliation', { method: 'POST' });
      const result = await response.json();
      if (response.ok) {
        console.log('Reconciliation completed:', result);
        alert(`Reconciliation completed: ${result.matched || 61} matched, ${result.exceptions || 4} exceptions`);
      }
    } catch (error) {
      console.error('Error running reconciliation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNetting = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/netting', { method: 'POST' });
      const result = await response.json();
      if (response.ok) {
        console.log('Netting completed:', result);
        alert(`Netting completed: ${result.reduction || 57}% reduction in cash movements`);
      }
    } catch (error) {
      console.error('Error running netting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        connectedUsers: Math.max(8, prev.connectedUsers + Math.floor(Math.random() * 3) - 1),
        lastUpdate: 'Just now',
        processingTransactions: Math.max(5, prev.processingTransactions + Math.floor(Math.random() * 3) - 1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/10 via-indigo-50/10 to-purple-50/10 pointer-events-none"></div>
      
      {/* Header */}
      <header className="relative bg-white/90 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    N
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NEPAR</span>
                  <span className="text-sm text-slate-600 font-medium">National Energy Payment & Arrears Reconciliation</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Live System
                </div>
                <div className="text-slate-400">•</div>
                <div className="font-medium text-slate-700">Ghana Energy Sector</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 text-sm text-slate-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{liveData.connectedUsers}</span>
                <span className="text-slate-400">•</span>
                <span>Active Users</span>
              </div>
              <div className="text-sm text-slate-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <span>Processing:</span>
                <span className="font-medium text-blue-600 ml-1">{liveData.processingTransactions}</span>
              </div>
              <div className="text-sm text-slate-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                Last Update: <span className="font-medium text-blue-600">{liveData.lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="mb-8 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleImportData} 
              disabled={isLoading}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-slate-700 border-white/30 transition-all duration-300"
            >
              {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              {isLoading ? 'Importing...' : 'Import Demo Data'}
            </Button>
            <Button 
              onClick={handleReconciliation} 
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg transition-all duration-300"
            >
              {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
              {isLoading ? 'Running...' : 'Run Reconciliation'}
            </Button>
            <Button 
              onClick={handleNetting} 
              disabled={isLoading}
              className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white border-0 shadow-lg transition-all duration-300"
            >
              {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <TrendingUp className="mr-2 h-4 w-4" />}
              {isLoading ? 'Calculating...' : 'Run Netting'}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
              <Eye className="mr-2 h-4 w-4" />
              Audit View
            </Button>
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
              <FileText className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm rounded-lg p-1">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
            <TabsTrigger value="settlements" className="text-xs">Settlements</TabsTrigger>
            <TabsTrigger value="disputes" className="text-xs">Disputes</TabsTrigger>
            <TabsTrigger value="network" className="text-xs">Network</TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Enhanced KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-600"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-slate-700">Total Arrears</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-red-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="text-3xl font-bold text-red-600">{formatCurrency(kpis.totalArrears)}</div>
                    <div className="flex items-center text-sm text-slate-600">
                      <TrendingUp className="w-4 h-4 mr-1 text-red-400" />
                      <span>12.5% from last month</span>
                    </div>
                  </div>
                  <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-slate-700">Netted This Period</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="text-3xl font-bold text-green-600">{formatCurrency(kpis.nettedThisPeriod)}</div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-green-600 font-medium">57%</span>
                      <span className="ml-1">reduction in cash movements</span>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-white/60 backdrop-blur-sm rounded-lg">
                      <div className="text-lg font-bold text-blue-600">24</div>
                      <div className="text-xs text-slate-600">Original</div>
                    </div>
                    <div className="p-2 bg-white/60 backdrop-blur-sm rounded-lg">
                      <div className="text-lg font-bold text-green-600">10</div>
                      <div className="text-xs text-slate-600">Netted</div>
                    </div>
                    <div className="p-2 bg-white/60 backdrop-blur-sm rounded-lg">
                      <div className="text-lg font-bold text-emerald-600">₵890M</div>
                      <div className="text-xs text-slate-600">Saved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-600"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-slate-700">DSO</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="text-3xl font-bold text-orange-600">{kpis.dso}</div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-orange-600 font-medium">Good</span>
                      <span className="ml-1">Target: &lt;45 days</span>
                    </div>
                  </div>
                  <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 h-2 rounded-full transition-all duration-500" style={{ width: '90%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-600"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-slate-700">Active Disputes</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="text-3xl font-bold text-purple-600">{kpis.activeDisputes}</div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-purple-600 font-medium">4</span>
                      <span className="ml-1">requiring attention</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {['PRICE_VARIANCE: 2', 'QUANTITY_VARIANCE: 2'].map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">{item.split(':')[0].replace('_', ' ')}</span>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-1 ${
                            item.includes('PRICE') ? 'bg-blue-500' : 'bg-orange-500'
                          }`}></div>
                          <span className="font-medium">{item.split(':')[1]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cash Flow Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Cash Flow Analysis
                  </CardTitle>
                  <CardDescription>Monthly inflow, outflow, and net position</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={cashFlowData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} stroke="#6b7280" />
                      <Tooltip 
                        formatter={(value: any) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="inflow" 
                        stackId="1"
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.6}
                        name="Inflow"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="outflow" 
                        stackId="2"
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        fillOpacity={0.6}
                        name="Outflow"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="net" 
                        stackId="3"
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.8}
                        name="Net Position"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Settlement Efficiency
                  </CardTitle>
                  <CardDescription>Monthly settlement performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={settlementEfficiency}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis yAxisId="left" stroke="#6b7280" />
                      <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}
                      />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="efficiency" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        name="Efficiency %"
                        dot={{ fill: '#10b981', r: 6 }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="transactions" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Transaction Count"
                        dot={{ fill: '#3b82f6', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Party Performance
                  </CardTitle>
                  <CardDescription>Settlement rates and processing times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {partyPerformance.map((party, index) => (
                      <div key={index} className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-slate-800">{party.name}</h4>
                          <Badge variant={party.settlementRate >= 95 ? 'secondary' : party.settlementRate >= 90 ? 'outline' : 'destructive'}>
                            {party.settlementRate}% Rate
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Avg Delay:</span>
                            <span className="ml-2 font-medium">{party.avgDelay} days</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Volume:</span>
                            <span className="ml-2 font-medium">{formatCurrency(party.volume)}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Status:</span>
                            <span className="ml-2 font-medium text-green-600">
                              {party.settlementRate >= 95 ? 'Excellent' : party.settlementRate >= 90 ? 'Good' : 'Needs Attention'}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              party.settlementRate >= 95 ? 'bg-green-500' :
                              party.settlementRate >= 90 ? 'bg-blue-500' :
                              party.settlementRate >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${party.settlementRate}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-600" />
                    Risk Assessment
                  </CardTitle>
                  <CardDescription>Multi-dimensional risk analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={riskMetrics}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="category" stroke="#6b7280" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
                      <Radar 
                        name="Current Risk" 
                        dataKey="value" 
                        stroke="#ef4444" 
                        fill="#ef4444" 
                        fillOpacity={0.3}
                      />
                      <Radar 
                        name="Risk Threshold" 
                        dataKey="threshold" 
                        stroke="#f59e0b" 
                        fill="#f59e0b" 
                        fillOpacity={0.1}
                        strokeDasharray="5 5"
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settlements" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Settlement Batches
                </CardTitle>
                <CardDescription>Recent settlement executions and approvals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'BATCH-202511-001', period: 'November 2025', total: 1250000000, status: 'executed', efficiency: 94.2, parties: 8 },
                    { id: 'BATCH-202510-001', period: 'October 2025', total: 980000000, status: 'approved', efficiency: 91.8, parties: 8 },
                    { id: 'BATCH-202509-001', period: 'September 2025', total: 1100000000, status: 'pending', efficiency: 89.5, parties: 7 }
                  ].map((batch) => (
                    <div key={batch.id} className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-slate-800">{batch.id}</h4>
                            <Badge variant={batch.status === 'executed' ? 'secondary' : batch.status === 'approved' ? 'outline' : 'destructive'}>
                              {batch.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">{batch.period}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{formatCurrency(batch.total)}</div>
                          <div className="text-sm text-slate-600">{batch.parties} parties</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Efficiency:</span>
                          <span className="ml-2 font-medium text-green-600">{batch.efficiency}%</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Net Reduction:</span>
                          <span className="ml-2 font-medium text-blue-600">57%</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Processing:</span>
                          <span className="ml-2 font-medium">2.3 days</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-purple-600" />
                  Active Disputes
                </CardTitle>
                <CardDescription>Current dispute cases and resolution status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'DSP0001', invoice: 'I000054', type: 'Price Variance', amount: 12000000, status: 'resolved', days: 3 },
                    { id: 'DSP0002', invoice: 'I000061', type: 'Quantity Variance', amount: 8000000, status: 'pending', days: 7 },
                    { id: 'DSP0003', invoice: 'I000046', type: 'Missing Proof', amount: 15000000, status: 'in_progress', days: 5 },
                    { id: 'DSP0004', invoice: 'I000062', type: 'Late Delivery', amount: 6000000, status: 'pending', days: 2 }
                  ].map((dispute) => (
                    <div key={dispute.id} className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-slate-800">{dispute.id}</h4>
                            <Badge variant={dispute.status === 'resolved' ? 'secondary' : dispute.status === 'in_progress' ? 'outline' : 'destructive'}>
                              {dispute.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600">{dispute.invoice} • {dispute.type}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-orange-600">{formatCurrency(dispute.amount)}</div>
                          <div className="text-sm text-slate-600">{dispute.days} days</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Cross-Debt Network
                </CardTitle>
                <CardDescription>Inter-agency payment obligations and circular debt chains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-4">Active Debt Chains</h4>
                    <div className="space-y-3">
                      {crossDebtVisualization.map((chain, index) => (
                        <div key={index} className="p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${
                                chain.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                              }`}></div>
                              <span className="text-sm font-medium">{chain.from} → {chain.to}</span>
                            </div>
                            <div className="text-sm font-bold text-blue-600">{formatCurrency(chain.amount)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-4">Network Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Total Debt Chains:</span>
                        <span className="font-medium">6 active</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Netting Potential:</span>
                        <span className="font-medium text-green-600">57%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Circular Debt:</span>
                        <span className="font-medium text-orange-600">₵2.34bn</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Optimization Savings:</span>
                        <span className="font-medium text-blue-600">₵1.33bn</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>Machine learning-driven recommendations and predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-slate-800">{insight.title}</h4>
                            <Badge variant={insight.impact === 'high' ? 'destructive' : insight.impact === 'medium' ? 'secondary' : 'outline'}>
                              {insight.impact} impact
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{insight.desc}</p>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-slate-600">Confidence:</span>
                            <span className="font-medium text-purple-600">{insight.confidence}%</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Activity Feed */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Live feed of system transactions and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'confirmed' ? 'bg-blue-500' :
                      activity.status === 'resolved' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{activity.description}</p>
                      <p className="text-xs text-slate-600">{activity.party} • {activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">{formatCurrency(activity.amount)}</div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { title: 'Advanced Analytics', href: '/analytics', icon: BarChart3, desc: 'AI-powered forecasting' },
            { title: 'Compliance Reports', href: '/compliance', icon: FileText, desc: 'Regulatory reporting' },
            { title: 'Field Agents', href: '/field', icon: Smartphone, desc: 'Mobile operations' },
            { title: 'Transparency Portal', href: '/transparency', icon: Globe, desc: 'Donor tracking' }
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => window.location.href = feature.href}
            >
              <CardContent className="p-4 text-center">
                <feature.icon className="h-8 w-8 mx-auto mb-2 text-blue-600 group-hover:scale-110 transition-transform" />
                <h4 className="font-medium text-slate-800 mb-1">{feature.title}</h4>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}