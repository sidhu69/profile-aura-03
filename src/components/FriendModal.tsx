import { useState } from "react";
import { MessageCircle, UserMinus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface FriendModalProps {
  friend: any;
  onClose: () => void;
}

export const FriendModal = ({ friend, onClose }: FriendModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveFriend = async () => {
    if (!user) return;
    
    setIsRemoving(true);
    try {
      const { error } = await supabase
        .from('user_connections')
        .delete()
        .or(`and(user_id.eq.${user.id},friend_id.eq.${friend.user_id}),and(user_id.eq.${friend.user_id},friend_id.eq.${user.id})`);

      if (error) throw error;

      toast({
        title: "Friend removed",
        description: `${friend.username} has been removed from your friends list.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove friend",
        variant: "destructive",
      });
    } finally {
      setIsRemoving(false);
    }
  };

  const handleSendMessage = () => {
    // Navigate to DM with this friend
    // This would integrate with your message routing
    toast({
      title: "Opening chat...",
      description: `Starting conversation with ${friend.username}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 slide-up">
      <Card className="w-full max-w-md mx-4 mb-4 p-6 slide-up">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">Friend Profile</h3>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col items-center space-y-4 mb-6">
          <Avatar className="h-20 w-20 profile-glow">
            <AvatarImage src={friend.avatar_url} />
            <AvatarFallback className="text-lg font-bold">
              {friend.username?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h4 className="text-xl font-bold gradient-text">{friend.username}</h4>
            <p className="text-sm text-muted-foreground">Level {friend.level}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {friend.charms_total || 0} charms earned
            </p>
          </div>

          {friend.bio && (
            <p className="text-sm text-muted-foreground text-center">
              {friend.bio}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Button
            onClick={handleSendMessage}
            className="w-full hover:scale-105 transition-transform duration-200"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          
          <Button
            variant="destructive"
            onClick={handleRemoveFriend}
            disabled={isRemoving}
            className="w-full hover:scale-105 transition-transform duration-200"
          >
            <UserMinus className="h-4 w-4 mr-2" />
            {isRemoving ? "Removing..." : "Remove Friend"}
          </Button>
        </div>
      </Card>
    </div>
  );
};