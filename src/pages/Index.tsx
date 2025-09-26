import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Crown, Users, MessageSquare } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Welcome to Chattat
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect, Chat, and Climb the Rankings!
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="h-6 w-6 text-profile-sparkle" />
                <span>Rankings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Compete with friends and climb the leaderboard by earning charms through engaging conversations.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-primary" />
                <span>Chat Rooms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join public rooms or create private ones with unique codes to chat with friends and meet new people.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-profile-glow" />
                <span>Direct Messages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Send private messages to your friends and build deeper connections through one-on-one conversations.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-6 w-6 text-success" />
                <span>Profile System</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Customize your profile, track your progress, and showcase your achievements with our advanced profile system.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Action */}
        <div className="text-center">
          <Link to="/profile">
            <Button 
              size="lg" 
              className="hover:scale-105 transition-transform duration-300 profile-glow"
            >
              <User className="h-5 w-5 mr-2" />
              View Profile
            </Button>
          </Link>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;