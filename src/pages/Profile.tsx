import { useState, useEffect, useRef } from "react";
import { Camera, Edit3, Users, MessageCircle, LogOut, ArrowLeft, Upload, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ProfileSkeleton } from "@/components/ProfileSkeleton";
import { FriendModal } from "@/components/FriendModal";
import { LogoutModal } from "@/components/LogoutModal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ProgressBar } from "@/components/ProgressBar";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { profile, friends, updateProfile, uploadAvatar, loading } = useProfile();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState<'username' | 'bio' | null>(null);
  const [editValues, setEditValues] = useState({ username: '', bio: '' });
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saveAnimation, setSaveAnimation] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setEditValues({
        username: profile.username || '',
        bio: profile.bio || ''
      });
    }
  }, [profile]);

  const handleSave = async (field: 'username' | 'bio') => {
    try {
      await updateProfile({ [field]: editValues[field] });
      setIsEditing(null);
      setSaveAnimation(true);
      setTimeout(() => setSaveAnimation(false), 600);
      toast({
        title: "Profile updated!",
        description: `Your ${field} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update ${field}`,
        variant: "destructive",
      });
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadAvatar(file);
      toast({
        title: "Avatar updated!",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <ProfileSkeleton />
        <BottomNavigation />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Please log in</h2>
          <p className="text-muted-foreground">You need to be logged in to view your profile.</p>
        </Card>
      </div>
    );
  }

  const levelProgress = ((profile.charms % 1000) / 1000) * 100;
  const nextLevelCharms = Math.ceil(profile.charms / 1000) * 1000;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 to-profile-glow/5 p-6">
        <Button
          variant="ghost"
          size="icon"
          className="mb-4 hover:bg-white/10 transition-all duration-300"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <Avatar 
              className={`h-24 w-24 border-4 border-profile-glow/20 transition-all duration-300 cursor-pointer profile-glow ${isUploading ? 'animate-pulse' : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-primary to-profile-glow text-primary-foreground">
                {profile.username?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {isUploading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
              ) : (
                <Camera className="h-6 w-6 text-white" />
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>

          {/* Username */}
          <div className="text-center space-y-2">
            {isEditing === 'username' ? (
              <div className="slide-up space-y-2">
                <Input
                  value={editValues.username}
                  onChange={(e) => setEditValues(prev => ({ ...prev, username: e.target.value }))}
                  className="text-center text-xl font-bold bg-white/10 border-profile-glow/30"
                  placeholder="Enter username"
                />
                <div className="flex justify-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleSave('username')}
                    className={`${saveAnimation ? 'pulse-success' : ''} bg-success hover:bg-success/90`}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 group">
                <h1 className="text-2xl font-bold gradient-text">
                  {profile.username || 'Anonymous User'}
                </h1>
                <Button
                  size="icon"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                  onClick={() => setIsEditing('username')}
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              </div>
            )}

            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center bg-gradient-to-br from-profile-sparkle/5 to-transparent">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="h-5 w-5 text-profile-sparkle mr-2 sparkle-animation" />
              <span className="text-sm font-medium">Charms</span>
            </div>
            <AnimatedCounter value={profile.charms_total || 0} className="text-2xl font-bold gradient-text" />
          </Card>

          <Card className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium">Friends</span>
            </div>
            <AnimatedCounter value={friends.length} className="text-2xl font-bold text-primary" />
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Level {profile.level}</span>
            <span className="text-xs text-muted-foreground">
              {profile.charms % 1000} / 1000 XP
            </span>
          </div>
          <ProgressBar 
            value={levelProgress}
            className="h-2"
            showSparkles={true}
          />
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {1000 - (profile.charms % 1000)} charms to level {profile.level + 1}
          </p>
        </Card>

        {/* Bio Section */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Bio</h3>
            {isEditing !== 'bio' && (
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={() => setIsEditing('bio')}
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            )}
          </div>

          {isEditing === 'bio' ? (
            <div className="slide-up space-y-3">
              <Textarea
                value={editValues.bio}
                onChange={(e) => setEditValues(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself..."
                className="bg-white/5 border-profile-glow/30"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleSave('bio')}
                  className={`${saveAnimation ? 'pulse-success' : ''} bg-success hover:bg-success/90`}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground fade-in">
              {profile.bio || "No bio added yet. Click the edit button to add one!"}
            </p>
          )}
        </Card>

        {/* Friends Section */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Friends ({friends.length})</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {friends.length > 0 ? (
              friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                  onClick={() => setSelectedFriend(friend)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={friend.avatar_url} />
                    <AvatarFallback>{friend.username?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{friend.username}</p>
                    <p className="text-xs text-muted-foreground">Level {friend.level}</p>
                  </div>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No friends yet. Start connecting with others!
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Logout Button */}
      <div className="fixed bottom-20 left-0 right-0 p-6 fade-in">
        <Button
          variant="destructive"
          className="w-full hover:scale-105 transition-transform duration-200"
          onClick={() => setShowLogoutModal(true)}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Modals */}
      {selectedFriend && (
        <FriendModal
          friend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
      )}

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={signOut}
      />

      <BottomNavigation />
    </div>
  );
};

export default Profile;