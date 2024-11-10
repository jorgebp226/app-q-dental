// src/pages/ManagerDashboard.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Users, Bot, Calendar, Star, Bell, ArrowUp, Clock, SmilePlus } from 'lucide-react';

const ManagerDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Resto del código proporcionado...

  const generateTimeData = (days, baseValue) => {
    return Array.from({ length: days }, (_, i) => ({
      name: `Día ${i + 1}`,
      valor: baseValue + Math.floor(Math.random() * 20),
      previo: baseValue - 10 + Math.floor(Math.random() * 20)
    }));
  };

  const reactivationData = generateTimeData(7, 80);
  const botPerformanceData = generateTimeData(7, 90);
  const appointmentData = generateTimeData(7, 85);
  const reviewsData = generateTimeData(7, 75);
  const remindersData = generateTimeData(7, 70);

  const StatCard = ({ title, value, change, icon: Icon, suffix = "" }) => (
    <Card className="relative overflow-hidden bg-white hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold">{value}</span>
          {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
        </div>
        {change && (
          <div className="flex items-center space-x-1 text-sm mt-1">
            <ArrowUp className={`h-4 w-4 ${change >= 0 ? 'text-green-500' : 'text-red-500 transform rotate-180'}`} />
            <span className={change >= 0 ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const SectionHeader = ({ title, icon: Icon }) => (
    <div className="flex items-center space-x-2 mb-4 pb-2 border-b">
      <Icon className="h-6 w-6 text-blue-500" />
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
  );

  const ChartCard = ({ title, data, type = "area", height = 300 }) => (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className={`h-[${height}px]`}>
        <ResponsiveContainer width="100%" height={height}>
          {type === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="valor" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
              <Area type="monotone" dataKey="previo" stroke="#94a3b8" fillOpacity={0.3} />
            </AreaChart>
          ) : type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="valor" fill="#3b82f6" />
              <Bar dataKey="previo" fill="#94a3b8" />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="valor" stroke="#3b82f6" />
              <Line type="monotone" dataKey="previo" stroke="#94a3b8" strokeDasharray="3 3" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const Section = ({ title, icon, stats, chart }) => (
    <div className="bg-gray-50 p-6 rounded-xl">
      <SectionHeader title={title} icon={icon} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {stats}
      </div>
      {chart}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100">
    <div className="w-full px-6 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Control - Métricas IA</h1>
        <select 
          className="p-2 border rounded-lg bg-white"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="7d">Últimos 7 días</option>
          <option value="30d">Último mes</option>
          <option value="90d">Último trimestre</option>
        </select>
      </div>

        <div className="space-y-8">
          {/* Sección de Reactivación */}
          <Section
            title="Reactivación de Pacientes"
            icon={Users}
            stats={
              <>
                <StatCard 
                  title="Reactivaciones Comenzadas" 
                  value="124"
                  change={5.2}
                  icon={Users}
                />
                <StatCard 
                  title="Reactivaciones Exitosas" 
                  value="78"
                  change={3.8}
                  icon={SmilePlus}
                />
                <StatCard 
                  title="Tasa de Éxito" 
                  value="62.9"
                  change={1.5}
                  icon={ArrowUp}
                  suffix="%"
                />
              </>
            }
            chart={
              <ChartCard 
                title="Evolución de Reactivaciones"
                data={reactivationData}
                type="area"
              />
            }
          />

          {/* Sección de Bot */}
          <Section
            title="Rendimiento del Bot"
            icon={Bot}
            stats={
              <>
                <StatCard 
                  title="Dudas Resueltas" 
                  value="432"
                  change={8.3}
                  icon={Bot}
                />
                <StatCard 
                  title="Tiempo Medio Respuesta" 
                  value="1.2"
                  icon={Clock}
                  suffix="min"
                />
                <StatCard 
                  title="Satisfacción Cliente" 
                  value="4.8"
                  change={0.3}
                  icon={Star}
                  suffix="/5"
                />
              </>
            }
            chart={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard 
                  title="Resolución de Dudas Diarias"
                  data={botPerformanceData}
                  type="bar"
                />
                <ChartCard 
                  title="Tiempo de Respuesta"
                  data={botPerformanceData}
                  type="line"
                />
              </div>
            }
          />

          {/* Sección de Confirmaciones */}
          <Section
            title="Gestión de Citas"
            icon={Calendar}
            stats={
              <>
                <StatCard 
                  title="Horas Salvadas" 
                  value="45"
                  change={12.5}
                  icon={Clock}
                  suffix="h"
                />
                <StatCard 
                  title="Citas Confirmadas" 
                  value="256"
                  change={4.2}
                  icon={Calendar}
                />
                <StatCard 
                  title="Tasa Confirmación" 
                  value="89"
                  change={2.1}
                  icon={ArrowUp}
                  suffix="%"
                />
              </>
            }
            chart={
              <ChartCard 
                title="Evolución de Confirmaciones"
                data={appointmentData}
                type="area"
              />
            }
          />

          {/* Sección de Google Reviews */}
          <Section
            title="Reseñas Google"
            icon={Star}
            stats={
              <>
                <StatCard 
                  title="Nuevas Reseñas" 
                  value="67"
                  change={15.3}
                  icon={Star}
                />
                <StatCard 
                  title="Nota Media" 
                  value="4.7"
                  change={0.2}
                  icon={Star}
                  suffix="/5"
                />
                <StatCard 
                  title="Reseñas Negativas Evitadas" 
                  value="12"
                  change={-25}
                  icon={Star}
                />
              </>
            }
            chart={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ChartCard 
                  title="Evolución de Reseñas"
                  data={reviewsData}
                  type="line"
                />
                <ChartCard 
                  title="Distribución de Valoraciones"
                  data={reviewsData}
                  type="bar"
                />
              </div>
            }
          />

          {/* Sección de Recordatorios */}
          <Section
            title="Gestión de Recordatorios"
            icon={Bell}
            stats={
              <>
                <StatCard 
                  title="Recordatorios Enviados" 
                  value="345"
                  change={7.8}
                  icon={Bell}
                />
                <StatCard 
                  title="Revisiones Agendadas" 
                  value="89"
                  change={5.6}
                  icon={Calendar}
                />
                <StatCard 
                  title="Tasa de Respuesta" 
                  value="76"
                  change={3.2}
                  icon={ArrowUp}
                  suffix="%"
                />
              </>
            }
            chart={
              <ChartCard 
                title="Efectividad de Recordatorios"
                data={remindersData}
                type="area"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
