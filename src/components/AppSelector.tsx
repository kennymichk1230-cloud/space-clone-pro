import { Check } from "lucide-react";
import facebookIcon from "@/assets/facebook-icon.png";
import whatsappIcon from "@/assets/whatsapp-icon.png";
import instagramIcon from "@/assets/instagram-icon.png";
import messengerIcon from "@/assets/messenger-icon.png";
import twitterIcon from "@/assets/twitter-icon.png";
import tiktokIcon from "@/assets/tiktok-icon.png";

interface App {
  id: string;
  name: string;
  icon: string;
  displayName: string;
}

const AVAILABLE_APPS: App[] = [
  { id: "facebook", name: "Facebook Lite", icon: facebookIcon, displayName: "Lite" },
  { id: "whatsapp", name: "WhatsApp", icon: whatsappIcon, displayName: "WhatsApp" },
  { id: "instagram", name: "Instagram", icon: instagramIcon, displayName: "Instagram" },
  { id: "messenger", name: "Messenger", icon: messengerIcon, displayName: "Messenger" },
  { id: "twitter", name: "Twitter", icon: twitterIcon, displayName: "Twitter" },
  { id: "tiktok", name: "TikTok", icon: tiktokIcon, displayName: "TikTok" },
];

interface AppSelectorProps {
  selectedAppId: string | null;
  onSelectApp: (app: App) => void;
}

export const AppSelector = ({ selectedAppId, onSelectApp }: AppSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Select App to Clone</h3>
      <div className="grid grid-cols-3 gap-3">
        {AVAILABLE_APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => onSelectApp(app)}
            className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
              selectedAppId === app.id
                ? "bg-primary/20 ring-2 ring-primary"
                : "bg-secondary hover:bg-muted"
            }`}
          >
            {selectedAppId === app.id && (
              <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white">
              <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs text-foreground text-center">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export { AVAILABLE_APPS };
export type { App };
