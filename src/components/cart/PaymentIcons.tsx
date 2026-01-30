import { Lock } from "lucide-react";

export const PaymentIcons = () => {
  return (
    <div className="text-center mt-4 space-y-2">
      {/* Payment method icons */}
      <div className="flex items-center justify-center gap-3">
        {/* Visa */}
        <div className="w-10 h-6 bg-white rounded border border-border flex items-center justify-center">
          <svg viewBox="0 0 48 32" className="w-8 h-5">
            <rect fill="#fff" width="48" height="32" rx="4"/>
            <path fill="#1434CB" d="M19.5 21h-3l1.9-11.5h3L19.5 21zm8.3-11.2c-.6-.2-1.5-.5-2.7-.5-3 0-5.1 1.5-5.1 3.7 0 1.6 1.5 2.5 2.6 3 1.1.6 1.5 1 1.5 1.5 0 .8-1 1.2-1.8 1.2-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.5c.7.3 2 .6 3.4.6 3.2 0 5.2-1.5 5.2-3.8 0-1.3-.8-2.2-2.5-3-.8-.5-1.6-1-1.6-1.4 0-.5.5-1 1.6-1 .9 0 1.6.2 2.1.4l.3.1.4-2.5zm7.8-.3h-2.3c-.7 0-1.3.2-1.6 1l-4.5 10.5h3.2l.6-1.7h3.9l.4 1.7h2.8l-2.5-11.5zm-3.7 7.4l1.2-3.2.6 3.2h-1.8zM14 9.5l-3 8-.3-1.5c-.5-1.8-2.2-3.8-4.1-4.8l2.7 10h3.2l4.8-11.5H14z"/>
            <path fill="#F9A533" d="M8.3 9.5H3.1l-.1.3c3.8.9 6.3 3.2 7.4 5.9l-1.1-5.2c-.2-.8-.8-1-1-.1z"/>
          </svg>
        </div>
        {/* Mastercard */}
        <div className="w-10 h-6 bg-white rounded border border-border flex items-center justify-center">
          <svg viewBox="0 0 48 32" className="w-8 h-5">
            <rect fill="#fff" width="48" height="32" rx="4"/>
            <circle fill="#EB001B" cx="18" cy="16" r="9"/>
            <circle fill="#F79E1B" cx="30" cy="16" r="9"/>
            <path fill="#FF5F00" d="M24 9.3a9 9 0 0 0-3.3 6.7 9 9 0 0 0 3.3 6.7 9 9 0 0 0 3.3-6.7 9 9 0 0 0-3.3-6.7z"/>
          </svg>
        </div>
        {/* PayFast */}
        <div className="w-14 h-6 bg-white rounded border border-border flex items-center justify-center px-1">
          <span className="text-[8px] font-bold text-blue-600 tracking-tight">PayFast</span>
        </div>
      </div>
      
      {/* Secure checkout text */}
      <div className="flex items-center justify-center gap-1 text-muted-foreground">
        <Lock className="w-3 h-3" />
        <span className="text-xs font-body">Secure checkout</span>
      </div>
    </div>
  );
};
