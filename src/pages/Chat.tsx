import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, MapPin, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high';
  hospitals?: Array<{ name: string; distance: string; contact: string; }>;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI health assistant. Please describe your symptoms, and I'll help analyze them and provide recommendations. How are you feeling today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const mockAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword-based responses (in real app, this would be your AI backend)
    if (lowerMessage.includes('headache') || lowerMessage.includes('head')) {
      return {
        id: Date.now().toString(),
        content: `I understand you're experiencing headaches. Based on your description, this could be due to several factors:

**Possible Causes:**
• Tension or stress
• Dehydration
• Eye strain from screens
• Lack of sleep

**Recommendations:**
• Stay hydrated (drink plenty of water)
• Take regular breaks from screens
• Practice relaxation techniques
• Ensure adequate sleep (7-9 hours)
• Consider over-the-counter pain relief if needed

If headaches persist for more than a few days or are severe, I recommend consulting a healthcare professional.`,
        isBot: true,
        timestamp: new Date(),
        severity: 'low'
      };
    }
    
    if (lowerMessage.includes('chest pain') || lowerMessage.includes('heart')) {
      return {
        id: Date.now().toString(),
        content: `⚠️ **IMPORTANT:** Chest pain can be a serious symptom that requires immediate medical attention.

**Immediate Action Required:**
If you're experiencing severe chest pain, shortness of breath, or other concerning symptoms, please seek emergency medical care immediately.

**Nearby Emergency Facilities:**
I've found hospitals near your registered address for immediate care if needed.`,
        isBot: true,
        timestamp: new Date(),
        severity: 'high',
        hospitals: [
          { name: 'City General Hospital', distance: '2.3 km', contact: '(555) 123-4567' },
          { name: 'Emergency Medical Center', distance: '3.1 km', contact: '(555) 987-6543' },
          { name: 'Regional Health System', distance: '4.5 km', contact: '(555) 456-7890' }
        ]
      };
    }
    
    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      return {
        id: Date.now().toString(),
        content: `I see you're experiencing fever. Let me help you understand this better:

**For Mild Fever (99-101°F):**
• Rest and stay hydrated
• Monitor temperature regularly
• Use acetaminophen or ibuprofen as directed

**Seek Medical Care If:**
• Fever above 103°F (39.4°C)
• Fever lasts more than 3 days
• Accompanied by severe symptoms
• Difficulty breathing or persistent cough

**Self-Care Tips:**
• Drink plenty of fluids
• Get adequate rest
• Use cool compresses if needed
• Monitor for other symptoms`,
        isBot: true,
        timestamp: new Date(),
        severity: 'medium'
      };
    }
    
    // Default response
    return {
      id: Date.now().toString(),
      content: `Thank you for sharing your symptoms. While I can provide general health information, I recommend:

**General Advice:**
• Monitor your symptoms closely
• Stay hydrated and get adequate rest
• Consider consulting a healthcare professional if symptoms persist or worsen

**When to Seek Medical Care:**
• Symptoms worsen or don't improve
• You develop new concerning symptoms
• You have underlying health conditions

Is there anything specific about your symptoms you'd like me to help clarify? Please remember this is general guidance and not a substitute for professional medical advice.`,
      isBot: true,
      timestamp: new Date(),
      severity: 'low'
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = mockAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      
      if (aiResponse.severity === 'high') {
        toast({
          title: "⚠️ High Priority Symptoms",
          description: "Your symptoms may require immediate medical attention. Please consider seeking emergency care.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-yellow-500 text-yellow-50';
      case 'low': return 'bg-green-500 text-green-50';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-6 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="card-glow h-[calc(100vh-200px)] flex flex-col">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary animate-glow-pulse" />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI Health Assistant
                </span>
              </CardTitle>
              <p className="text-muted-foreground">
                Hello {user?.name}! Describe your symptoms for personalized health guidance.
              </p>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-glow-pulse">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    
                    <div className={`max-w-[70%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`p-4 rounded-lg ${
                          message.isBot
                            ? 'bg-muted border border-border'
                            : 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                        
                        {message.severity && (
                          <Badge className={`mt-2 ${getSeverityColor(message.severity)}`}>
                            {message.severity.toUpperCase()} PRIORITY
                          </Badge>
                        )}
                        
                        {message.hospitals && (
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-1 text-sm font-semibold">
                              <MapPin className="w-4 h-4" />
                              Nearby Hospitals:
                            </div>
                            {message.hospitals.map((hospital, index) => (
                              <div key={index} className="p-3 bg-background rounded border border-border">
                                <div className="font-medium">{hospital.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  📍 {hospital.distance} away • 📞 {hospital.contact}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-muted-foreground mt-1 px-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    
                    {!message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-secondary-glow flex items-center justify-center">
                        <User className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-glow-pulse">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted border border-border p-4 rounded-lg">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-border p-6">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your symptoms here..."
                    className="flex-1 bg-input border-border focus:border-primary focus:ring-primary"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="btn-neon px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mt-2 text-xs text-muted-foreground">
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  This AI assistant provides general health information only and is not a substitute for professional medical advice.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;