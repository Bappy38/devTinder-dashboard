import { useEffect, useState } from "react";

const NotificationBar = ({ id, message, type="info", autoDismiss = true, dismissTimeout = 3000 }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {

        if (!message) {
            return;
        }

        setShouldRender(true);

        const appearTimer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        if (!autoDismiss) {
            return;
        }

        if (autoDismiss) {
          const dismissTimer = setTimeout(() => {
              setIsVisible(false);
          }, dismissTimeout);

          return () => {
            clearTimeout(appearTimer);
            clearTimeout(dismissTimer);
          };
        }

        return () => clearTimeout(appearTimer);
    }, [id, message, autoDismiss, dismissTimeout]);

    useEffect(() => {
      if (!isVisible && shouldRender) {
          const timer = setTimeout(() => {
              setShouldRender(false);
          }, 500);

          return () => clearTimeout(timer);
      }
    }, [isVisible, shouldRender]);

    const getColorClass = () => {
        switch (type) {
          case "success":
            return "bg-green-100 text-green-800 border-green-300";
          case "error":
            return "bg-red-100 text-red-800 border-red-300";
          case "warning":
            return "bg-yellow-100 text-yellow-800 border-yellow-300";
          default:
            return "bg-blue-100 text-blue-800 border-blue-300";
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!shouldRender || !message) return null;

    return (
        <div
          className={`
            notification-bar fixed top-4 right-4 shadow-md p-4 rounded-lg flex items-center 
            space-x-4 border
            transition-all duration-500 ease-in-out
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
            ${getColorClass()}`}
        >
          <div className="flex-grow">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            className="text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>
    );
};

export default NotificationBar;