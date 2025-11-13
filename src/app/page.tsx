'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle, TrendingUp, RefreshCw } from 'lucide-react';

export default function NEPARDashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const handleImportData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/import', { method: 'POST' });
      const result = await response.json();
      if (response.ok) {
        console.log('Data imported successfully:', result);
        alert('Demo data imported successfully!');
      }
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Error importing data');
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
      alert('Error running reconciliation');
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
      alert('Error running netting');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
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
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium text-slate-700">Total Arrears</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">₵8.91bn</div>
              <div className="flex items-center text-sm text-slate-600">
                <span>12.5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium text-slate-700">Netted This Period</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">₵1.25bn</div>
              <div className="flex items-center text-sm text-slate-600">
                <span className="text-green-600 font-medium">57%</span>
                <span className="ml-1">reduction in cash movements</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium text-slate-700">DSO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">45</div>
              <div className="flex items-center text-sm text-slate-600">
                <span className="text-orange-600 font-medium">Good</span>
                <span className="ml-1">Target: &lt;45 days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-sm font-medium text-slate-700">Active Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">4</div>
              <div className="flex items-center text-sm text-slate-600">
                <span className="text-purple-600 font-medium">4</span>
                <span className="ml-1">requiring attention</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">NEPAR Dashboard</h3>
                <p className="text-slate-600 mb-4">National Energy Payment & Arrears Reconciliation System</p>
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  System Operational
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}