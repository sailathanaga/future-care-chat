import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Shield, Zap, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-float">
              Welcome to the Future of Healthcare
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience next-generation AI-powered health assistance with DoctorCare. 
              Get instant symptom analysis, personalized health recommendations, and locate nearby medical facilities.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild className="btn-neon text-lg px-8 py-4">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button variant="outline" asChild className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-glow">About DoctorCare</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              DoctorCare revolutionizes healthcare accessibility by combining artificial intelligence 
              with comprehensive medical knowledge to provide instant, accurate health guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Activity,
                title: "AI Health Analysis",
                description: "Advanced symptom analysis powered by machine learning algorithms"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your health data is encrypted and protected with enterprise-grade security"
              },
              {
                icon: Zap,
                title: "Instant Results",
                description: "Get immediate health insights and recommendations in real-time"
              },
              {
                icon: Users,
                title: "Expert Network",
                description: "Connect with nearby healthcare providers and specialists"
              }
            ].map((feature, index) => (
              <Card key={index} className="card-glow transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-glow">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-card to-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-glow">How DoctorCare Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center text-2xl font-bold animate-glow-pulse">
                  1
                </div>
                <h3 className="text-xl font-semibold">Describe Symptoms</h3>
                <p className="text-muted-foreground">
                  Tell our AI chatbot about your health concerns and symptoms in natural language.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-secondary to-secondary-glow flex items-center justify-center text-2xl font-bold animate-glow-pulse">
                  2
                </div>
                <h3 className="text-xl font-semibold">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our advanced AI analyzes your symptoms and provides potential causes and recommendations.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-accent to-accent-glow flex items-center justify-center text-2xl font-bold animate-glow-pulse">
                  3
                </div>
                <h3 className="text-xl font-semibold">Get Help</h3>
                <p className="text-muted-foreground">
                  Receive treatment suggestions and find nearby hospitals if immediate care is needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 rounded bg-gradient-to-r from-primary to-accent animate-glow-pulse"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DoctorCare
            </span>
          </div>
          <p className="text-muted-foreground mb-4">
            Empowering healthier lives through AI-driven healthcare solutions.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            © 2024 DoctorCare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;