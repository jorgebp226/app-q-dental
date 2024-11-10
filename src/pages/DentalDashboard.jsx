import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import Button from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { 
  MessageSquare, 
  Calendar, 
  HelpCircle, 
  Users, 
  Bell, 
  Bot, 
  Search,
  Send,
  CheckCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DentalDashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  const TaskCard = ({ title, count, icon: Icon, items }) => (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-gray-900">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-blue-500" />
            <span>{title}</span>
            <Badge variant="secondary">{count}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.map((item, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.summary}</p>
              </div>
              <Button variant="outline" size="sm">
                Gestionar
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const ChatInterface = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [showAISummary, setShowAISummary] = useState(false);
    const [activeCategory, setActiveCategory] = useState('whatsapp');

    const chatCategories = [
      {
        title: "WhatsApp",
        value: "whatsapp",
        count: 3,
        chats: [
          {
            id: 1,
            name: "María García",
            lastMessage: "Consulta sobre blanqueamiento dental",
            time: "hace 5 min",
            unread: true,
            status: "Pendiente"
          },
          {
            id: 2,
            name: "Juan Pérez",
            lastMessage: "Gracias por la información",
            time: "hace 1h",
            status: "Resuelto"
          }
        ]
      },
      {
        title: "Instagram",
        value: "instagram",
        count: 2,
        chats: [
          {
            id: 3,
            name: "Ana Martínez",
            lastMessage: "¿Tienen disponibilidad para mañana?",
            time: "hace 30min",
            status: "En proceso"
          }
        ]
      },
      {
        title: "Gmail",
        value: "gmail",
        count: 1,
        chats: [
          {
            id: 4,
            name: "Carlos López",
            lastMessage: "Solicitud de presupuesto",
            time: "hace 2h",
            status: "Pendiente"
          }
        ]
      }
    ];

    const PatientCard = ({ patient }) => (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{patient.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{patient.name}</h3>
              <p className="text-sm text-gray-500">Paciente desde {patient.since}</p>
            </div>
            <Badge
              variant={
                patient.status === "Activo" ? "success" :
                patient.status === "Pendiente" ? "warning" : "default"
              }
            >
              {patient.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Último tratamiento</p>
              <p className="font-medium">{patient.lastTreatment}</p>
            </div>
            <div>
              <p className="text-gray-500">Próxima cita</p>
              <p className="font-medium">{patient.nextAppointment}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );

    return (
      <div className="h-[calc(100vh-16rem)] grid grid-cols-12 gap-4">
        {/* Panel izquierdo - Lista de chats */}
        <div className="col-span-3 bg-white rounded-lg border flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar conversación..."
                className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <Tabs 
              value={activeCategory} 
              onValueChange={setActiveCategory}
              className="h-full flex flex-col"
            >
              <TabsList className="w-full flex p-1 bg-gray-50">
                {chatCategories.map(category => (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    className="flex-1"
                  >
                    <span className="flex items-center gap-2">
                      {category.title}
                      {category.count > 0 && (
                        <Badge variant="secondary" className="ml-1">
                          {category.count}
                        </Badge>
                      )}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex-1 overflow-y-auto">
                {chatCategories.map(category => (
                  <TabsContent
                    key={category.value}
                    value={category.value}
                    className="m-0 p-0 h-full"
                  >
                    <div className="divide-y">
                      {category.chats.map(chat => (
                        <button
                          key={chat.id}
                          onClick={() => setSelectedChat(chat)}
                          className={cn(
                            "w-full p-3 text-left hover:bg-gray-50 transition-colors",
                            selectedChat?.id === chat.id && "bg-blue-50"
                          )}
                        >
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{chat.name}</span>
                            <span className="text-xs text-gray-500">{chat.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {chat.lastMessage}
                          </p>
                          <Badge
                            variant={
                              chat.status === "Pendiente" ? "warning" :
                              chat.status === "En proceso" ? "info" : "success"
                            }
                            className="mt-2"
                          >
                            {chat.status}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>
        </div>

        {/* Panel central - Chat */}
        <div className="col-span-6 bg-white rounded-lg border flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{selectedChat.name}</h3>
                  <p className="text-sm text-gray-600">
                    Última actividad: {selectedChat.time}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAISummary(!showAISummary)}
                >
                  <Bot className="w-4 h-4 mr-2" />
                  {showAISummary ? "Ocultar Resumen" : "Ver Resumen"}
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                      <p>Hola, quisiera información sobre blanqueamiento dental</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-100 rounded-lg p-3 max-w-[70%]">
                      <p>¡Hola! Por supuesto, te cuento sobre nuestro tratamiento...</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe un mensaje..."
                  />
                  <Button>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Selecciona una conversación para comenzar
            </div>
          )}
        </div>

        {/* Panel derecho - Información del paciente */}
        <div className="col-span-3 space-y-4">
          {selectedChat && (
            <>
              <PatientCard
                patient={{
                  name: selectedChat.name,
                  since: "Enero 2023",
                  status: "Activo",
                  lastTreatment: "Limpieza dental",
                  nextAppointment: "25/11/2023"
                }}
              />

              {showAISummary && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <span>Resumen IA</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="bg-white p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Contexto del Paciente</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Tratamientos previos: Limpieza dental</li>
                        <li>• Interés actual: Blanqueamiento dental</li>
                        <li>• Estado de pagos: Al día</li>
                        <li>• Preferencia horaria: Tardes</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Panel de Control Dental</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="tasks" className="data-[state=active]:bg-white text-gray-900 flex-1">
            <Bell className="w-4 h-4 mr-2" />
            Tareas Diarias
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-white text-gray-900 flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Centro de Mensajes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="space-y-4">
          <TaskCard
            title="Citas a Modificar"
            count={3}
            icon={Calendar}
            items={[
              {
                name: "Juan Pérez",
                summary: "Solicita cambio de cita del 15/11 - Motivo: Viaje de trabajo"
              },
              {
                name: "Ana Martínez",
                summary: "Necesita reprogramar limpieza dental del 18/11"
              }
            ]}
          />

          <TaskCard
            title="Pacientes Interesados"
            count={2}
            icon={Users}
            items={[
              {
                name: "Carlos López",
                summary: "Interesado en blanqueamiento dental - Presupuesto solicitado"
              },
              {
                name: "Laura Sánchez",
                summary: "Primera consulta - Evaluación de ortodoncia"
              }
            ]}
          />

          <TaskCard
            title="Preguntas sin Responder"
            count={4}
            icon={HelpCircle}
            items={[
              {
								name: "María García",
                summary: "Consulta sobre duración del tratamiento de brackets"
              },
              {
                name: "Roberto Díaz",
                summary: "Pregunta sobre métodos de pago disponibles"
              }
            ]}
          />
        </TabsContent>

        <TabsContent value="chat">
          <ChatInterface />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DentalDashboard;