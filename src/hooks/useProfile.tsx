import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchFriends();
    } else {
      setProfile(null);
      setFriends([]);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFriends = async () => {
    try {
      const { data, error } = await supabase
        .from('user_connections')
        .select(`
          *,
          friend:profiles!user_connections_friend_id_fkey(*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'accepted');

      if (error) {
        console.error('Error fetching friends:', error);
        return;
      }

      setFriends(data?.map(connection => connection.friend) || []);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      setProfile(prev => ({ ...prev, ...updates }));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      await updateProfile({ avatar_url: publicUrl });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  };

  return {
    profile,
    friends,
    loading,
    updateProfile,
    uploadAvatar,
    refetch: fetchProfile
  };
};