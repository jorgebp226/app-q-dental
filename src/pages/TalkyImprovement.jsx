// src/pages/TalkyImprovement.jsx
import React, { useState, useEffect } from 'react';  // Añade useEffect
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import  MeetingButton  from '../components/ui/meeting-button';
import { ScrollArea } from '../components/ui/scroll-area';
import { Textarea } from '../components/ui/textarea'
import VapiMeeting from '../components/VAPI/VapiMeeting';
import Button from '../components/ui/button';
import { 
  Mic, 
  Send, 
  MessageSquare, 
  Settings, 
  Volume2, 
  Bot, 
  Clock,
  Smile,
  UserCircle2,
  Briefcase,
  ClipboardList,
  Coffee,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  FileText,
  ListChecks,
  StickyNote,
  ChevronRight
} from 'lucide-react';

const TalkyImprovement = () => {
  const [activeTab, setActiveTab] = useState("personality");
  const [voiceActive, setVoiceActive] = useState(false);
  const [selectedTone, setSelectedTone] = useState('neutral');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', content: 'Hola, ¿en qué puedo ayudarte hoy?' }
  ]);

  const toneOptions = [
    { 
      id: 'neutral', 
      icon: UserCircle2, 
      label: 'Neutral', 
      description: 'Tono equilibrado y profesional' 
    },
    { 
      id: 'friendly', 
      icon: Smile, 
      label: 'Amigable', 
      description: 'Acercamiento cálido y cercano' 
    },
    { 
      id: 'professional', 
      icon: Briefcase, 
      label: 'Profesional', 
      description: 'Formal y centrado en negocios' 
    },
    { 
      id: 'matter-of-fact', 
      icon: ClipboardList, 
      label: 'Directo', 
      description: 'Comunicación clara y concisa' 
    },
    { 
      id: 'humorous', 
      icon: Coffee, 
      label: 'Casual', 
      description: 'Tono ligero y cercano' 
    }
  ];

  const responseLength = [
    { 
      id: 'concise', 
      icon: AlignLeft, 
      label: 'Conciso', 
      description: 'Respuestas breves y directas' 
    },
    { 
      id: 'standard', 
      icon: AlignCenter, 
      label: 'Estándar', 
      description: 'Respuestas con detalle moderado' 
    },
    { 
      id: 'thorough', 
      icon: AlignJustify, 
      label: 'Detallado', 
      description: 'Respuestas exhaustivas' 
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { type: 'user', content: message }]);
      setMessage('');
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          type: 'bot', 
          content: 'He recibido tu mensaje y lo tendré en cuenta para mejorar mi desempeño.' 
        }]);
      }, 1000);
    }
  };

  const ToneCard = ({ option, selected, onClick }) => (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-lg ${
        selected ? 'border-2 border-blue-500 bg-blue-50' : 'hover:border-blue-200'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-start space-x-3">
        <div className="w-8 h-8 flex items-center justify-center text-blue-500">
          {React.createElement(option.icon, { size: 24 })}
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{option.label}</h3>
          <p className="text-sm text-gray-600">{option.description}</p>
        </div>
      </CardContent>
    </Card>
  );
  
  const Timer = () => {
    const [time, setTime] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formatTime = (timeInSeconds) => {
      const hours = Math.floor(timeInSeconds / 3600);
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const seconds = timeInSeconds % 60;
  
      const pad = (num) => String(num).padStart(2, '0');
  
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };
  
    return (
      <div className="inline-flex items-center px-3 py-1 bg-blue-100 rounded-full text-blue-700">
        <Clock className="w-4 h-4 mr-2" />
        <span className="font-medium">{formatTime(time)}</span>
      </div>
    );
  };
  const AnimatedWaveform = () => (
    <div className="flex items-center justify-center space-x-1">
      {[1,2,3,4,5].map((i) => (
        <div
          key={i}
          className="w-1 bg-blue-500 rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.1}s`,
            height: `${Math.random() * 24 + 8}px`
          }}
        />
      ))}
    </div>
  );
  const MeetingContent = () => {
    const [activeMeetingTab, setActiveMeetingTab] = useState('summary');
    const [userNotes, setUserNotes] = useState('');
    const [transcriptData, setTranscriptData] = useState([]);

    const handleTranscriptUpdate = (text) => {
      setTranscriptData(prev => [...prev, {
        speaker: "Talky",
        text: text
      }]);
    };
  
    // Manejador de errores
    const handleVapiError = (error) => {
      console.error("Error en la reunión virtual:", error);
      // Aquí puedes añadir lógica para mostrar un mensaje de error al usuario
    };
    const handleEndMeeting = () => {
      setVoiceActive(false);
    };
  
    const summaryData = {
      overview: "La reunión se centró en la discusión de mejoras en la interfaz de usuario y la optimización del rendimiento del sistema.",
      keyPoints: [
        "Implementación de nuevas características de accesibilidad",
        "Mejora en los tiempos de respuesta del chatbot",
        "Actualización del diseño visual de los componentes"
      ],
      challengesFaced: [
        "Integración con APIs de terceros",
        "Optimización de la carga inicial de la aplicación"
      ],
      nextSteps: [
        "Programar reunión de seguimiento para la próxima semana",
        "Revisar e implementar los cambios propuestos",
        "Realizar pruebas de usuario con las nuevas funcionalidades"
      ]
    };


    return (
      <div className="space-y-6">
        <div className="text-center pb-6 border-b">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <Volume2 className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <VapiMeeting 
          isActive={voiceActive}
          onEnd={handleEndMeeting}
          onTranscriptUpdate={handleTranscriptUpdate}
          onError={handleVapiError}
        />
          
          <div className="mb-4">
            <AnimatedWaveform />
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Reunión en Curso</h3>
            <p className="text-gray-600">
              Talky está escuchando... Habla con normalidad
            </p>
            <Timer />
          </div>

          <MeetingButton 
            onClick={() => setVoiceActive(false)}
            className="bg-red-600 hover:bg-red-700"
          >
            <Clock className="w-4 h-4 mr-2" />
            Finalizar Reunión
          </MeetingButton>
        </div>

        <Tabs value={activeMeetingTab} onValueChange={setActiveMeetingTab}>
          <TabsList className="w-full grid grid-cols-4 gap-4 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="summary" className="data-[state=active]:bg-white">
              <FileText className="w-4 h-4 mr-2" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="transcript" className="data-[state=active]:bg-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Transcripción
            </TabsTrigger>
            <TabsTrigger value="next-steps" className="data-[state=active]:bg-white">
              <ListChecks className="w-4 h-4 mr-2" />
              Siguientes Pasos
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-white">
              <StickyNote className="w-4 h-4 mr-2" />
              Notas
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="summary" className="m-0">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-3">Resumen General</h4>
                  <p className="text-gray-700">{summaryData.overview}</p>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3">Puntos Clave</h4>
                  <ul className="space-y-2">
                    {summaryData.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3">Desafíos Identificados</h4>
                  <ul className="space-y-2">
                    {summaryData.challengesFaced.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transcript" className="m-0">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {transcriptData.map((entry, index) => (
                    <div key={index} className="space-y-1">
                      <div className="font-medium text-gray-900">{entry.speaker}</div>
                      <p className="text-gray-700">{entry.text}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="next-steps" className="m-0">
              <div className="space-y-4">
                {summaryData.nextSteps.map((step, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="m-0">
              <div className="space-y-4">
                <Textarea
                  placeholder="Añade tus notas sobre la reunión aquí..."
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="min-h-[300px] p-4"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    );
  };
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full p-6">
        <div className="flex items-center space-x-4 mb-8">
          <Bot className="w-10 h-10 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mejora de Talky</h1>
            <p className="text-gray-600">Personaliza y mejora tu asistente virtual</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full grid grid-cols-3 gap-4 bg-transparent">
            <TabsTrigger value="personality" className="data-[state=active]:bg-white shadow-sm">
              <Settings className="w-4 h-4 mr-2" />
              Personalidad
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-white shadow-sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat Directo
            </TabsTrigger>
            <TabsTrigger value="meeting" className="data-[state=active]:bg-white shadow-sm">
              <Volume2 className="w-4 h-4 mr-2" />
              Reunión Virtual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personality" className="space-y-6">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Tono de Voz</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {toneOptions.map(option => (
                  <ToneCard
                    key={option.id}
                    option={option}
                    selected={selectedTone === option.id}
                    onClick={() => setSelectedTone(option.id)}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Longitud de Respuestas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {responseLength.map(option => (
                  <ToneCard
                    key={option.id}
                    option={option}
                    selected={selectedTone === option.id}
                    onClick={() => setSelectedTone(option.id)}
                  />
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="h-[500px] flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.type === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Escribe tu mensaje..."
                    />
                    <Button variant="default" size="icon">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="meeting" className="space-y-4">
            <Card className="bg-white">
              <CardContent className="p-6">
                {!voiceActive ? (
                  <div className="text-center space-y-6 py-12">
                    <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                      <Mic className="w-12 h-12 text-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-800">Iniciar Reunión Virtual</h3>
                      <p className="text-gray-600">
                        Habla directamente con Talky para discutir mejoras y revisar el rendimiento
                      </p>
                    </div>
                    <MeetingButton onClick={() => setVoiceActive(true)}>
                      <Mic className="w-4 h-4 mr-2" />
                      Comenzar Reunión
                    </MeetingButton>
                  </div>
                ) : (
                  <MeetingContent voiceActive={voiceActive} setVoiceActive={setVoiceActive} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TalkyImprovement;