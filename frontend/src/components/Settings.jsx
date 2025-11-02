import { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { preferenceService } from '@/api/services';

const Settings = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    id: 'default-user',
    language: 'en',
    notification_time: '08:00',
    voice_enabled: true,
    assistant_name: 'Maya'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const data = await preferenceService.getPreferences('default-user');
      if (data) {
        setPreferences(data);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const savePreferences = async () => {
    setLoading(true);
    try {
      await preferenceService.savePreferences(preferences);
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ddc5a3] via-[#c9b8a0] to-[#b8a892]" data-testid="settings-page">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-[#342721] hover:bg-white/20"
              data-testid="back-to-dashboard-from-settings"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold text-[#342721]">Settings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Card className="glass p-8">
          <div className="space-y-6">
            {/* Language Selection */}
            <div className="space-y-2">
              <Label htmlFor="language" className="text-[#342721] font-semibold">
                Language / மொழி
              </Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => setPreferences({ ...preferences, language: value })}
              >
                <SelectTrigger className="bg-white/80" data-testid="settings-language-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en" data-testid="lang-option-en">English</SelectItem>
                  <SelectItem value="ta" data-testid="lang-option-ta">தமிழ் (Tamil)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Assistant Name */}
            <div className="space-y-2">
              <Label htmlFor="assistant-name" className="text-[#342721] font-semibold">
                Assistant Name
              </Label>
              <Select
                value={preferences.assistant_name}
                onValueChange={(value) => setPreferences({ ...preferences, assistant_name: value })}
              >
                <SelectTrigger className="bg-white/80" data-testid="assistant-name-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maya" data-testid="name-option-maya">Maya</SelectItem>
                  <SelectItem value="Venba" data-testid="name-option-venba">Venba</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notification Time */}
            <div className="space-y-2">
              <Label htmlFor="notification-time" className="text-[#342721] font-semibold">
                Daily Notification Time
              </Label>
              <Input
                id="notification-time"
                type="time"
                value={preferences.notification_time}
                onChange={(e) => setPreferences({ ...preferences, notification_time: e.target.value })}
                className="bg-white/80"
                data-testid="notification-time-input"
              />
            </div>

            {/* Voice Enabled */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="voice-enabled" className="text-[#342721] font-semibold">
                  Voice Assistant
                </Label>
                <p className="text-sm text-[#5a453a]">
                  Enable voice interaction with the assistant
                </p>
              </div>
              <Switch
                id="voice-enabled"
                checked={preferences.voice_enabled}
                onCheckedChange={(checked) => setPreferences({ ...preferences, voice_enabled: checked })}
                data-testid="voice-enabled-switch"
              />
            </div>

            {/* Save Button */}
            <Button
              onClick={savePreferences}
              className="w-full bg-gradient-to-r from-[#342721] to-[#5a453a] hover:from-[#5a453a] hover:to-[#342721] text-white"
              disabled={loading}
              data-testid="save-settings-btn"
            >
              <Save className="w-5 h-5 mr-2" />
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </Card>

        {/* About Section */}
        <Card className="glass p-6 mt-6">
          <h3 className="text-lg font-bold text-[#342721] mb-3">About Maya</h3>
          <p className="text-[#5a453a] mb-2">
            Maya is your intelligent Tamil Nadu weather companion, powered by advanced AI.
          </p>
          <div className="space-y-1 text-sm text-[#5a453a]">
            <p>• Accurate real-time weather data</p>
            <p>• Smart clothing & travel suggestions</p>
            <p>• Bilingual support (Tamil & English)</p>
            <p>• Voice-enabled natural conversation</p>
            <p>• Route weather forecasting</p>
            <p>• Covering all 21 major Tamil Nadu cities</p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Settings;