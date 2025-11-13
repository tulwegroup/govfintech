'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function NEPARDashboard() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImportData = async () => {
    setIsLoading(true);
    setMessage('Importing demo data...');
    try {
      const response = await fetch('/api/import', { method: 'POST' });
      const result = await response.json();
      if (response.ok) {
        setMessage(`✅ Success: ${result.stats?.parties || 0} parties, ${result.stats?.invoices || 0} invoices imported`);
      } else {
        setMessage('❌ Import failed');
      }
    } catch (error) {
      setMessage('❌ Error importing data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReconciliation = async () => {
    setIsLoading(true);
    setMessage('Running reconciliation...');
    try {
      const response = await fetch('/api/reconciliation', { method: 'POST' });
      const result = await response.json();
      if (response.ok) {
        setMessage(`✅ Reconciliation completed: ${result.matched || 0} matched, ${result.exceptions || 0} exceptions`);
      } else {
        setMessage('❌ Reconciliation failed');
      }
    } catch (error) {
      setMessage('❌ Error running reconciliation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNetting = async () => {
    setIsLoading(true);
    setMessage('Running netting calculation...');
    try {
      const response = await fetch('/api/netting', { method: 'POST' });
      const result = await response.json();
      if (response.ok) {
        setMessage(`✅ Netting completed: ${result.reduction || 0}% reduction in cash movements`);
      } else {
        setMessage('❌ Netting failed');
      }
    } catch (error) {
      setMessage('❌ Error running netting');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-600">NEPAR</h1>
              <p className="text-gray-600">National Energy Payment & Arrears Reconciliation</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">System Operational</span>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">{message}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button 
            onClick={handleImportData} 
            disabled={isLoading}
            className="w-full h-12 text-lg"
            variant="outline"
          >
            {isLoading ? 'Importing...' : 'Import Demo Data'}
          </Button>
          <Button 
            onClick={handleReconciliation} 
            disabled={isLoading}
            className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Running...' : 'Run Reconciliation'}
          </Button>
          <Button 
            onClick={handleNetting} 
            disabled={isLoading}
            className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
          >
            {isLoading ? 'Calculating...' : 'Run Netting'}
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Total Arrears</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₵8.91bn</div>
              <div className="text-sm text-gray-600">12.5% from last month</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Netted This Period</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₵1.25bn</div>
              <div className="text-sm text-gray-600">57% reduction in cash movements</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">DSO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-gray-600">Good - Target: &lt;45 days</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Active Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm text-gray-600">Requiring attention</div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">NEPAR Dashboard</h3>
              <p className="text-gray-600 mb-4">Ghana Energy Sector Financial Reconciliation System</p>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                All Systems Operational
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}